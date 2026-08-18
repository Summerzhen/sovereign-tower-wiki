import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { languageAlternates } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

const COPY = {
  en: {
    title: "About",
    metaTitle: "About - Sovereign Tower Wiki",
    description: "Learn about the independent fan-made Sovereign Tower Wiki for guides, quests, characters, endings, platforms, and time rewind strategy.",
    ogDescription: "Independent fan-made Sovereign Tower guide hub.",
    body: [
      "Sovereign Tower Wiki is an independent fan-built guide hub covering knight management, quests, kingdom choices, characters, endings, romance routes, platforms, updates, and time rewind strategy.",
      "The site is designed around Sovereign Tower's story-rich medieval management RPG format, including Round Table decisions, faction balance, knight assignments, tower upgrades, and alternate outcomes.",
    ],
  },
  "zh-cn": {
    title: "关于本站",
    metaTitle: "关于本站 - Sovereign Tower Wiki",
    description: "了解独立玩家自制的 Sovereign Tower Wiki，涵盖君王之塔攻略、任务、角色、结局、平台信息与时间回溯策略。",
    ogDescription: "独立玩家自制的 Sovereign Tower 攻略中心。",
    body: [
      "Sovereign Tower Wiki 是一个独立玩家自制攻略站，整理骑士管理、任务、王国选择、角色信息、结局、恋爱路线、平台更新与时间回溯策略。",
      "本站围绕 Sovereign Tower 剧情驱动的中世纪管理 RPG 体验构建，覆盖圆桌决策、阵营平衡、骑士派遣、塔楼升级和分支结果。",
    ],
  },
};

function copyFor(locale: string) {
  return COPY[locale as keyof typeof COPY] ?? COPY.en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyFor(locale);
  const path = `/${locale}/about`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: { canonical: path, languages: languageAlternates("/about") },
    openGraph: { title: copy.metaTitle, description: copy.ogDescription, url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = copyFor(locale);
  return (
    <LegalPage title={copy.title}>
      {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </LegalPage>
  );
}
