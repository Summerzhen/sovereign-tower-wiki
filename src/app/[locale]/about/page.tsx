import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/about`;
  return {
    title: "About - Sovereign Tower Wiki",
    description: "Learn about the independent fan-made Sovereign Tower Wiki for guides, quests, characters, endings, platforms, and time rewind strategy.",
    alternates: { canonical: path },
    openGraph: { title: "About - Sovereign Tower Wiki", description: "Independent fan-made Sovereign Tower guide hub.", url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default function AboutPage() {
  return (
    <LegalPage title="About">
      <p>Sovereign Tower Wiki is an independent fan-built guide hub covering knight management, quests, kingdom choices, characters, endings, romance routes, platforms, updates, and time rewind strategy.</p>
      <p>The site is designed around Sovereign Tower's story-rich medieval management RPG format, including Round Table decisions, faction balance, knight assignments, tower upgrades, and alternate outcomes.</p>
    </LegalPage>
  );
}
