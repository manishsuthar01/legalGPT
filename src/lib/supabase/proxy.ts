import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do NOT run code between createServerClient and supabase.auth.getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 1. Protected workspace routes: redirect unauthenticated requests to /login (preserving return path)
  if (!user && pathname.startsWith("/app")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // 2. Protected backend API routes: return 401 Unauthorized for unauthenticated requests
  if (!user && pathname.startsWith("/api/contracts")) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Authentication required to access this resource" },
      { status: 401 }
    );
  }

  // 3. Auth pages: redirect authenticated users to intended destination or default workspace
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const redirectTo = request.nextUrl.searchParams.get("redirectTo");
    const targetPath = redirectTo && redirectTo.startsWith("/") ? redirectTo : "/app/contracts/new";
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    url.searchParams.delete("redirectTo");
    return NextResponse.redirect(url);
  }

  // 4. Attach verified identity headers for downstream routes
  if (user) {
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-email", user.email ?? "");
    requestHeaders.set(
      "x-user-name",
      user.user_metadata?.full_name ?? user.user_metadata?.name ?? ""
    );

    const authenticatedResponse = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Preserve any updated session cookies from Supabase
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      authenticatedResponse.cookies.set(cookie);
    });

    return authenticatedResponse;
  }

  return supabaseResponse;
}
