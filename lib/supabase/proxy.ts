import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "./env";

const AUTH_PAGES = ["/login", "/signup"];

/** Refreshes the auth session cookie and applies route-level redirects. */
export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (!isSupabaseConfigured) {
    // No backend yet: the dashboard can't work, so send people to the login page that explains why.
    if (isDashboard) return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // Do not run code between createServerClient and getClaims(): it refreshes the session.
  const { data } = await supabase.auth.getClaims();
  const isSignedIn = Boolean(data?.claims);

  if (isDashboard && !isSignedIn) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname + request.nextUrl.search);
    return redirectWithCookies(url, response);
  }

  if (AUTH_PAGES.includes(pathname) && isSignedIn) {
    return redirectWithCookies(new URL("/dashboard", request.url), response);
  }

  return response;
}

function redirectWithCookies(url: URL, from: NextResponse) {
  const redirect = NextResponse.redirect(url);
  from.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}
