const links = process.env.LINKS ? JSON.parse(process.env.LINKS) : {};

export const dynamic = 'force-dynamic';
  
export async function GET(request: Request) {
    const { pathname } = new URL(request.url);
    const code = pathname.replace(/^\//, '');

    if (links[code]) {
        return new Response(null, {
            headers: {
                location: links[code]
            },
            status: 302,
            statusText: 'Found'
        });
    }

    return new Response(JSON.stringify({ error: "404 Not Found" }), {
        status: 404,
        statusText: 'Not Found'
    });
}
