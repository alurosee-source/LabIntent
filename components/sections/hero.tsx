"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const [liveCount, setLiveCount] = useState(128);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBeta = () => {
    document.getElementById("beta-access")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReactionTest = () => {
    document.getElementById("reaction-test")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-1 mb-6 border border-red-600/30 rounded-full text-red-600 text-xs font-semibold uppercase tracking-wider">
          {t("hero.badge")}
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {t("hero.title1")}
          <br />
          <span className="text-red-600">{t("hero.title2")}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>

        <div className="inline-flex items-center gap-4 px-6 py-4 rounded-lg bg-gray-900 border border-gray-800 mb-8">
          <div className="flex items-center gap-2">
            <div className="text-left">
              <div className="text-xs text-gray-500">{t("hero.reactionLabel")}</div>
              <div className="text-lg font-bold text-green-500">182ms</div>
            </div>
          </div>
          <div className="text-2xl text-gray-600">→</div>
          <div className="flex items-center gap-2">
            <div className="text-left">
              <div className="text-xs text-gray-500">{t("hero.roundLabel")}</div>
              <div className="text-lg font-bold text-red-600">247ms</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="lg" onClick={scrollToBeta}>
            {t("hero.btnJoinBeta")}
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToReactionTest}>
            {t("hero.btnRunTest")}
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          <span suppressHydrationWarning>{liveCount} {t("hero.liveCount")}</span>
        </div>
      </div>
    </section>
  );
}
