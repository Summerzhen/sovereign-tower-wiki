import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { languageAlternates } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

const COPY = {
  en: {
    title: "Copyright",
    metaTitle: "Copyright - Sovereign Tower Wiki",
    description: "Copyright notice for the independent fan-made Sovereign Tower Wiki.",
    body: [
      "Sovereign Tower, WILD WITS GAMES, Curve Games, logos, screenshots, thumbnails, and related media belong to their respective owners.",
      "This site is a non-official fan wiki implementation for educational and guide presentation purposes.",
      "If you own rights to content displayed here and have a concern, please contact the site operator for review.",
    ],
  },
  "zh-cn": {
    title: "版权声明",
    metaTitle: "版权声明 - Sovereign Tower Wiki",
    description: "Sovereign Tower Wiki 版权声明：说明君王之塔相关商标、截图、缩略图与媒体素材归各自权利方所有。",
    body: [
      "Sovereign Tower、WILD WITS GAMES、Curve Games、徽标、截图、缩略图及相关媒体素材均归各自权利方所有。",
      "本站是非官方玩家 Wiki，用于教育性攻略展示和游戏资料整理。",
      "如果你拥有本站展示内容的相关权利并有疑问，请联系网站运营者进行复核。",
    ],
  },
};

function copyFor(locale: string) {
  return COPY[locale as keyof typeof COPY] ?? COPY.en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyFor(locale);
  const path = `/${locale}/copyright`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: { canonical: path, languages: languageAlternates("/copyright") },
    openGraph: { title: copy.metaTitle, description: copy.description, url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default async function CopyrightPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = copyFor(locale);
  return (
    <LegalPage title={copy.title}>
      {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </LegalPage>
  );
}
