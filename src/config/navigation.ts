import { BookOpen, Code2, Gem, Handshake, MessageCircle, Shirt, Swords, Trophy } from "lucide-react";

export const NAVIGATION_CONFIG = [
  { key: "codes", path: "/codes", icon: Code2, isContentType: true },
  { key: "guide", path: "/guide", icon: BookOpen, isContentType: true },
  { key: "values", path: "/values", icon: Gem, isContentType: true },
  { key: "tier", path: "/tier", icon: Trophy, isContentType: true },
  { key: "skins", path: "/skins", icon: Shirt, isContentType: true },
  { key: "weapons", path: "/weapons", icon: Swords, isContentType: true },
  { key: "trading", path: "/trading", icon: Handshake, isContentType: true },
  { key: "community", path: "/community", icon: MessageCircle, isContentType: true },
] as const;

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
