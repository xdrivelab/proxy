export default async (request, context) => {
  const url = new URL(request.url);
  const target = "https://pathagar.pages.dev" 
    + url.pathname 
    + url.search;

  const modifiedRequest = new Request(target, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" &&
      request.method !== "HEAD"
        ? await request.arrayBuffer()
        : null,
    redirect: "follow"
  });

  const resp = await fetch(modifiedRequest);

  const headers = new Headers(resp.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "*");

  return new Response(resp.body, {
    status: resp.status,
    headers
  });
};
