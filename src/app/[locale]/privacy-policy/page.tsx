import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/privacy-policy`;
  return {
    title: "Privacy Policy - Sovereign Tower Wiki",
    description: "Privacy policy for the independent fan-made Sovereign Tower Wiki.",
    alternates: { canonical: path },
    openGraph: { title: "Privacy Policy - Sovereign Tower Wiki", description: "Privacy policy for the independent fan-made Sovereign Tower Wiki.", url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This fan wiki provides informational game guides for Sovereign Tower on Steam. We do not request Steam account credentials, passwords, or private payment information.</p>
      <p>Basic analytics, advertising, and hosting providers may process standard technical information such as device type, browser, approximate region, and visited pages.</p>
      <p>External links may lead to Steam, Discord, YouTube, X, itch.io, or other community resources. Those services are governed by their own privacy policies.</p>
    </LegalPage>
  );
}
