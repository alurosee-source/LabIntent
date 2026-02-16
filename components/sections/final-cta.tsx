"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function FinalCTA() {
  const { t } = useLanguage();

  const scrollToBeta = () => {
    document.getElementById("beta-access")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 bg-gray-900/50 border-t border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {t("finalCTA.title1")}
          <br />
          <span className="text-red-600">{t("finalCTA.title2")}</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          {t("finalCTA.subtitle1")}
          <br />
          {t("finalCTA.subtitle2")}
        </p>

        <Button size="lg" onClick={scrollToBeta} className="px-12">
          {t("finalCTA.btnSecure")}
        </Button>

        <p className="text-xs text-gray-500 mt-6">
          {t("finalCTA.note")}
        </p>
      </div>
    </section>
  );
}
