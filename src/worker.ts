interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

const locales = ["en", "de", "ja", "fr", "it", "ko"];
const unprefixedContentPaths = [
  "/guide",
  "/quests",
  "/knights",
  "/characters",
  "/romance",
  "/systems",
  "/platforms",
  "/release",
  "/community",
  "/media",
  "/about",
  "/copyright",
  "/privacy-policy",
  "/terms-of-service",
];

function redirect(url: URL, pathname: string) {
  url.pathname = pathname;
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      "Cache-Control": "no-store",
    },
  });
}

const worker = {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    if (pathname === "/") {
      return redirect(url, "/en");
    }

    if (!locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
      const target = unprefixedContentPaths.find((path) => pathname === path || pathname.startsWith(`${path}/`));
      if (target) {
        return redirect(url, `/en${pathname}`);
      }
    }

    const assetRequest = new Request(request, {
      headers: new Headers(request.headers),
    });
    assetRequest.headers.set("Cache-Control", "no-cache");

    const response = await env.ASSETS.fetch(assetRequest);
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("text/html")) {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "no-store");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
};

export default worker;
