import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import env from "./utils/env";

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);
    requestHeaders.set(
        "x-internal-ip",
        (env.UNDER_CLOUDFLARE === "1" ? requestHeaders.get("cf-connecting-ip") : null) ??
            (env.TRUST_PROXY === "1" ? requestHeaders.get("x-forwarded-for") : null) ??
            request.ip ??
            "",
    );
    requestHeaders.set("x-internal-geo-country", request.geo?.country ?? "");
    requestHeaders.set("x-internal-geo-region", request.geo?.region ?? "");
    requestHeaders.set("x-internal-geo-city", request.geo?.city ?? "");

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
