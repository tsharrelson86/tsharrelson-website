export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/consulting" || pathname.startsWith("/consulting/")) {
      return new Response(request.method === "HEAD" ? null : "Page not found.", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex, nofollow" },
      });
    }
    const response = await env.ASSETS.fetch(request);
    const isAppRoute = !pathname.startsWith("/api/") && !pathname.startsWith("/assets/") && !pathname.split("/").pop()?.includes(".");

    if (response.status !== 404 || !isAppRoute || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const rootUrl = new URL(request.url);
    rootUrl.pathname = "/";
    rootUrl.search = "";
    const rootResponse = await env.ASSETS.fetch(new Request(rootUrl, request));

    if (pathname !== "/work" || request.method !== "GET" || rootResponse.status !== 200) {
      return rootResponse;
    }

    const workTitle = "Selected Work | Timothy Harrelson";
    const workDescription = "Selected enterprise SaaS, operational AI, fintech, and brand-transformation work.";
    const workHtml = (await rootResponse.text())
      .replace("<title>Timothy Harrelson | Senior Product Designer</title>", `<title>${workTitle}</title>`)
      .replace('name="description" content="Senior product designer focused on enterprise SaaS, operational AI, design systems, and complex workflows."', `name="description" content="${workDescription}"`)
      .replace('rel="canonical" href="https://tsharrelson.com/"', 'rel="canonical" href="https://tsharrelson.com/work"')
      .replace('property="og:title" content="Timothy Harrelson | Senior Product Designer"', `property="og:title" content="${workTitle}"`)
      .replace('property="og:description" content="Senior product designer focused on enterprise SaaS, operational AI, design systems, and complex workflows."', `property="og:description" content="${workDescription}"`)
      .replace('property="og:url" content="https://tsharrelson.com/"', 'property="og:url" content="https://tsharrelson.com/work"')
      .replace('name="twitter:title" content="Timothy Harrelson | Senior Product Designer"', `name="twitter:title" content="${workTitle}"`)
      .replace('name="twitter:description" content="Senior product designer focused on enterprise SaaS, operational AI, design systems, and complex workflows."', `name="twitter:description" content="${workDescription}"`);
    const headers = new Headers(rootResponse.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.delete("etag");
    return new Response(workHtml, { status: rootResponse.status, headers });
  },
};
