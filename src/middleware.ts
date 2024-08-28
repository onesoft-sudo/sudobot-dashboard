import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { subdomains } from "./config/subdomains";
import env from "./utils/env";

const httpStatusText: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    500: "Internal Server Error",
};

const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN?.replace(
    /:\d+$/,
    "",
);

function error(status: number, message: string) {
    const [hostname, port] =
        process.env.NEXT_PUBLIC_FRONTEND_DOMAIN?.split(":") ?? [];

    const html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
        <html>
            <head>
                <title>${status} ${httpStatusText[status]}</title>
            </head>
            <body>
                <h1>${httpStatusText[status]}</h1>
                <p>${message}</p>
                <hr>
                <address>Next.js/14 Server at ${hostname} Port ${port || (hostname === "localhost" ? 80 : 443)}</address>
            </body>
        </html>
    `;

    return new NextResponse(html, {
        status,
        headers: {
            "content-type": "text/html",
        },
    });
}

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);
    requestHeaders.set(
        "x-internal-ip",
        (env.UNDER_CLOUDFLARE === "1"
            ? requestHeaders.get("cf-connecting-ip")
            : null) ??
            (env.TRUST_PROXY === "1"
                ? requestHeaders.get("x-forwarded-for")
                : null) ??
            request.ip ??
            "",
    );
    requestHeaders.set("x-internal-geo-country", request.geo?.country ?? "");
    requestHeaders.set("x-internal-geo-region", request.geo?.region ?? "");
    requestHeaders.set("x-internal-geo-city", request.geo?.city ?? "");

    const matcher =
        /\/((?!api\/|_next\/|_static\/|_vercel|[\\w-]+\\.\\w+).*)/gi;

    if (!matcher.test(request.url)) {
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    const { nextUrl } = request;
    let hostname = request.headers.get("host");

    if (hostname?.includes(":")) {
        hostname = hostname.slice(0, hostname.indexOf(":"));
    }

    if (
        !hostname ||
        (!hostname.endsWith("." + FRONTEND_DOMAIN) &&
            hostname !== FRONTEND_DOMAIN)
    ) {
        return error(400, "The request hostname is not valid.");
    }

    if (hostname === FRONTEND_DOMAIN) {
        requestHeaders.set("x-domain", FRONTEND_DOMAIN);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    const subdomain = hostname.replace("." + FRONTEND_DOMAIN, "").trim();

    const subdomainConfig = subdomains[subdomain];

    if (!subdomainConfig) {
        return error(400, "The request hostname is not valid.");
    }

    requestHeaders.set("x-domain", hostname);

    if (subdomainConfig.rewrite) {
        return NextResponse.rewrite(
            new URL(
                subdomainConfig.rewrite.replace("%URI%", nextUrl.pathname),
                request.url,
            ),
        );
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
