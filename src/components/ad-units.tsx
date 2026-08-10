"use client";

import { useEffect, useRef } from "react";

type AdUnit = "native" | "rectangle" | "halfTower" | "tower" | "stickyBanner";

const AD_CONFIG = {
  native: {
    width: 300,
    height: 90,
    containerId: "container-782fbf53c51241939698cff8c774363a",
    src: "https://pl30774938.effectivecpmnetwork.com/782fbf53c51241939698cff8c774363a/invoke.js",
  },
  rectangle: {
    key: "c3b5b160e4bddec2afaec28cb3eeb5d5",
    width: 300,
    height: 250,
  },
  halfTower: {
    key: "c14a794fa50cb728b1a8e705805cdbdb",
    width: 160,
    height: 300,
  },
  tower: {
    key: "5d9f065530ea34c586b84826af4a80ad",
    width: 160,
    height: 600,
  },
  stickyBanner: {
    key: "3bacf549955df957c0b34b5beb472ba3",
    width: 320,
    height: 50,
  },
} as const;

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: "iframe";
      height: number;
      width: number;
      params: Record<string, never>;
    };
  }
}

function AdFrame({ unit }: { unit: Exclude<AdUnit, "native"> }) {
  const ref = useRef<HTMLDivElement>(null);
  const config = AD_CONFIG[unit];

  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded === "true") return;
    ref.current.dataset.loaded = "true";
    window.atOptions = { key: config.key, format: "iframe", height: config.height, width: config.width, params: {} };
    const script = document.createElement("script");
    script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`;
    script.async = true;
    ref.current.appendChild(script);
  }, [config.height, config.key, config.width]);

  return <div ref={ref} className="overflow-hidden" style={{ width: config.width, minHeight: config.height }} />;
}

function NativeAd() {
  const ref = useRef<HTMLDivElement>(null);
  const config = AD_CONFIG.native;

  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded === "true") return;
    ref.current.dataset.loaded = "true";
    const container = document.createElement("div");
    container.id = config.containerId;
    ref.current.appendChild(container);
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = config.src;
    ref.current.appendChild(script);
  }, [config.containerId, config.src]);

  return <div ref={ref} className="overflow-hidden" style={{ width: config.width, minHeight: config.height }} />;
}

export function AdUnitBox({ unit, className = "" }: { unit: AdUnit; className?: string }) {
  return (
    <div className={`flex justify-center ${className}`} aria-label="Advertisement">
      {unit === "native" ? <NativeAd /> : <AdFrame unit={unit} />}
    </div>
  );
}

export function DesktopLeftStickyAd() {
  return (
    <aside className="pointer-events-none fixed left-[max(1rem,calc((100vw-80rem)/2-12rem))] top-28 z-30 hidden 2xl:block">
      <AdUnitBox unit="halfTower" className="pointer-events-auto" />
    </aside>
  );
}

export function ResponsiveStickyBannerAd() {
  return (
    <>
      <aside className="fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-border/60 bg-background/80 py-1.5 backdrop-blur md:hidden">
        <AdUnitBox unit="stickyBanner" />
      </aside>
      <aside className="fixed inset-x-0 top-[65px] z-40 hidden justify-center border-b border-border/60 bg-background/80 py-1.5 backdrop-blur md:flex">
        <AdUnitBox unit="stickyBanner" />
      </aside>
    </>
  );
}
