import { createBrowserClient } from "@supabase/ssr";

export async function createClient() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    return supabase;
}

//  this client is for signup and login to create a session key in the browser
