type NavigationItem = {
  key: string;
  path: string;
  isContentType: boolean;
};

export const NAVIGATION_CONFIG: NavigationItem[] = [
  { key: "guide", path: "/guide", isContentType: true },
  { key: "characters", path: "/characters", isContentType: true },
  { key: "romance", path: "/romance", isContentType: true },
  { key: "systems", path: "/systems", isContentType: true },
  { key: "platforms", path: "/platforms", isContentType: true },
  { key: "release", path: "/release", isContentType: true },
  { key: "community", path: "/community", isContentType: true },
  { key: "media", path: "/media", isContentType: true },
];

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
