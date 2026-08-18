import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { languageAlternates } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

const COPY = {
  en: {
    title: "Terms of Service",
    metaTitle: "Terms of Service - Sovereign Tower Wiki",
    description: "Terms of service for the independent fan-made Sovereign Tower Wiki.",
    body: [
      "This site is an independent fan-made guide hub. Content is provided for informational and entertainment purposes only.",
      "Game systems, quests, character details, endings, prices, and update details may change without notice. Always verify important information in-game or through official channels.",
      "By using this site, you agree not to misuse it, attempt unauthorized access, or present this fan wiki as an official WILD WITS GAMES or Curve Games property.",
    ],
  },
  "zh-cn": {
    title: "服务条款",
    metaTitle: "服务条款 - Sovereign Tower Wiki",
    description: "Sovereign Tower Wiki 服务条款：说明本站作为独立玩家攻略站的内容用途、准确性限制和非官方声明。",
    body: [
      "本站是独立玩家自制攻略站，内容仅用于信息参考与娱乐目的。",
      "游戏系统、任务、角色细节、结局、价格和更新信息可能随时变化。重要信息请以游戏内或官方渠道为准。",
      "使用本站即表示你同意不滥用本站、不尝试未授权访问，也不会将本玩家 Wiki 冒充为 WILD WITS GAMES 或 Curve Games 的官方资产。",
    ],
  },
};

function copyFor(locale: string) {
  return COPY[locale as keyof typeof COPY] ?? COPY.en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyFor(locale);
  const path = `/${locale}/terms-of-service`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: { canonical: path, languages: languageAlternates("/terms-of-service") },
    openGraph: { title: copy.metaTitle, description: copy.description, url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = copyFor(locale);
  return (
    <LegalPage title={copy.title}>
      {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </LegalPage>
  );
}
