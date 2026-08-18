import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { languageAlternates } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sovereigntower.org";

const COPY = {
  en: {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy - Sovereign Tower Wiki",
    description: "Privacy policy for the independent fan-made Sovereign Tower Wiki.",
    body: [
      "This fan wiki provides informational game guides for Sovereign Tower on Steam. We do not request Steam account credentials, passwords, or private payment information.",
      "Basic analytics, advertising, and hosting providers may process standard technical information such as device type, browser, approximate region, and visited pages.",
      "External links may lead to Steam, Discord, YouTube, X, itch.io, or other community resources. Those services are governed by their own privacy policies.",
    ],
  },
  "zh-cn": {
    title: "隐私政策",
    metaTitle: "隐私政策 - Sovereign Tower Wiki",
    description: "Sovereign Tower Wiki 隐私政策：说明本站作为独立玩家攻略站如何处理基础访问数据、外部链接和第三方服务。",
    body: [
      "本玩家 Wiki 提供 Sovereign Tower 游戏攻略信息。本站不会索取 Steam 账号凭据、密码或私人支付信息。",
      "基础统计、广告和托管服务可能会处理设备类型、浏览器、粗略地区和访问页面等标准技术信息。",
      "外部链接可能指向 Steam、Discord、YouTube、X、itch.io 或其他社区资源。这些服务适用其各自的隐私政策。",
    ],
  },
};

function copyFor(locale: string) {
  return COPY[locale as keyof typeof COPY] ?? COPY.en;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyFor(locale);
  const path = `/${locale}/privacy-policy`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: { canonical: path, languages: languageAlternates("/privacy-policy") },
    openGraph: { title: copy.metaTitle, description: copy.description, url: `${siteUrl}${path}`, images: [`${siteUrl}/images/hero.webp`] },
    twitter: { card: "summary_large_image", images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = copyFor(locale);
  return (
    <LegalPage title={copy.title}>
      {copy.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </LegalPage>
  );
}
