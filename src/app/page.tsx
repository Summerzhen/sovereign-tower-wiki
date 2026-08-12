import { redirect } from "next/navigation";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

export const metadata: Metadata = {
  title: "Sovereign Tower Wiki",
  description: "Sovereign Tower Wiki with quest walkthroughs, knight database pages, recruitment guides, stats, traits, endings, romance, and route planning.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sovereign Tower Wiki",
    description: "Sovereign Tower Wiki with quest walkthroughs, knight database pages, recruitment guides, stats, traits, endings, romance, and route planning.",
    url: siteUrl,
    images: [`${siteUrl}/images/hero.webp`],
  },
  twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
};

export default function RootPage() {
  redirect("/en");
}
