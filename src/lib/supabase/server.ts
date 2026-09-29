import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet: any) {
                    try {
                        cookiesToSet.forEach((cookie: any) => {
                            cookieStore.set(cookie.name, cookie.value, cookie.options);
                        });
                    } catch (error) {
                        console.error("Error setting cookies:", error);
                    }
                },
                remove(name: string, options: any) {
                    try {
                        cookieStore.set(name, "", {
                            ...options,
                            maxAge: 0,
                        });
                    } catch (error) {
                        console.error("Error removing cookie:", error);
                    }
                }
            },
        }
    );
}