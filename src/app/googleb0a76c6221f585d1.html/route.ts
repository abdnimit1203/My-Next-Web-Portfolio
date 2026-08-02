export function GET() {
  return new Response("google-site-verification: googleb0a76c6221f585d1.html", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
