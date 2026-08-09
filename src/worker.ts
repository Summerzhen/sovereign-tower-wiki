interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

const locales = ["en", "de", "ja", "fr"];
const unprefixedContentPaths = [
  "/guide",
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

export default {
  fetch(request: Request, env: Env) {
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

    return env.ASSETS.fetch(request);
  },
};
