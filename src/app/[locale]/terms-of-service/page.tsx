import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/terms-of-service`;
  return {
    title: "Terms of Service - Sovereign Tower Wiki",
    description: "Terms of service for the independent fan-made Sovereign Tower Wiki.",
    alternates: { canonical: path },
    openGraph: { title: "Terms of Service - Sovereign Tower Wiki", description: "Terms of service for the independent fan-made Sovereign Tower Wiki.", url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service">
      <p>This site is an independent fan-made guide hub. Content is provided for informational and entertainment purposes only.</p>
      <p>Game systems, quests, character details, endings, prices, and update details may change without notice. Always verify important information in-game or through official channels.</p>
      <p>By using this site, you agree not to misuse it, attempt unauthorized access, or present this fan wiki as an official WILD WITS GAMES or Curve Games property.</p>
    </LegalPage>
  );
}
