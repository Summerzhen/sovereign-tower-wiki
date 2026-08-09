import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/copyright`;
  return {
    title: "Copyright - Sovereign Tower Wiki",
    description: "Copyright notice for the independent fan-made Sovereign Tower Wiki.",
    alternates: { canonical: path },
    openGraph: { title: "Copyright - Sovereign Tower Wiki", description: "Copyright notice for the independent fan-made Sovereign Tower Wiki.", url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default function CopyrightPage() {
  return (
    <LegalPage title="Copyright">
      <p>Sovereign Tower, WILD WITS GAMES, Curve Games, logos, screenshots, thumbnails, and related media belong to their respective owners.</p>
      <p>This site is a non-official fan wiki implementation for educational and guide presentation purposes.</p>
      <p>If you own rights to content displayed here and have a concern, please contact the site operator for review.</p>
    </LegalPage>
  );
}
