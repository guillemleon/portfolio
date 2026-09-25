// Google Search Console verification. Served as a route rather than a file in
// public/ because Cloudflare Workers Assets strips the .html extension and
// redirects, which fails verification.
export const dynamic = 'force-static';

export function GET() {
    return new Response('google-site-verification: googlebdac9e4245678737.html', {
        headers: { 'content-type': 'text/html; charset=utf-8' },
    });
}
