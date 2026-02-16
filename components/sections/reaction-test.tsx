"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

type TestState = "idle" | "waiting" | "ready" | "result";

export function ReactionTest() {
  const [state, setState] = useState<TestState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [percentile, setPercentile] = useState<number | null>(null);
  const [tier, setTier] = useState<string>("");
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  const calculateStats = (time: number) => {
    let calculatedPercentile = 0;
    let calculatedTierKey = "";

    if (time < 200) {
      calculatedPercentile = 95 + Math.floor(Math.random() * 5);
      calculatedTierKey = "Elite";
    } else if (time < 250) {
      calculatedPercentile = 75 + Math.floor(Math.random() * 15);
      calculatedTierKey = "Elite";
    } else if (time < 300) {
      calculatedPercentile = 50 + Math.floor(Math.random() * 20);
      calculatedTierKey = "Average";
    } else {
      calculatedPercentile = 20 + Math.floor(Math.random() * 25);
      calculatedTierKey = "Delayed";
    }

    setPercentile(calculatedPercentile);
    setTier(calculatedTierKey);
  };

  const startTest = () => {
    setState("waiting");
    const randomDelay = 2000 + Math.random() * 3000;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setState("ready");
    }, randomDelay);
  };

  const handleClick = () => {
    if (state === "idle") {
      startTest();
      return;
    }

    if (state === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("idle");
      return;
    }

    if (state === "ready") {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      calculateStats(time);
      setState("result");
    }
  };

  const reset = () => {
    setState("idle");
    setReactionTime(null);
    setPercentile(null);
    setTier("");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getTierColor = () => {
    if (tier === "Elite") return "text-green-500";
    if (tier === "Average") return "text-yellow-500";
    return "text-red-600";
  };

  const scrollToBeta = () => {
    document.getElementById("beta-access")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="reaction-test" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600">
            {t("reactionTest.badge")}
          </h2>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          {t("reactionTest.title")}
        </h3>

        <p className="text-gray-400 mb-8">
          {t("reactionTest.subtitle")}
        </p>

        <div
          onClick={handleClick}
          className={`
            relative w-full h-64 md:h-80 rounded-lg border-2
            flex items-center justify-center cursor-pointer
            transition-all duration-200 mb-6 overflow-hidden
            ${state === "idle" && "border-gray-800 bg-gray-900 hover:border-red-600/50"}
            ${state === "waiting" && "border-red-600 bg-red-600/10 animate-pulse"}
            ${state === "ready" && "border-green-500 bg-green-500/20 animate-pulse"}
            ${state === "result" && "border-gray-800 bg-gray-900"}
          `}
        >
          {state === "idle" && (
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-lg font-semibold">{t("reactionTest.clickToStart")}</p>
              <p className="text-sm text-gray-500 mt-2">
                {t("reactionTest.clickOnGreen")}
              </p>
            </div>
          )}

          {state === "waiting" && (
            <div className="text-center">
              <p className="text-lg font-semibold text-red-600">{t("reactionTest.wait")}</p>
              <p className="text-sm text-gray-400 mt-2">
                {t("reactionTest.dontClick")}
              </p>
            </div>
          )}

          {state === "ready" && (
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500 animate-pulse">
                {t("reactionTest.clickNow")}
              </p>
            </div>
          )}

          {state === "result" && (
            <div className="text-center px-4">
              <div className={`text-5xl md:text-6xl font-bold mb-2 ${getTierColor()}`}>
                {reactionTime}ms
              </div>
              <div className="text-sm text-gray-400 mb-4">
                {t("reactionTest.fasterThan")} {percentile}% {t("reactionTest.ofPlayers")}
              </div>
              <div className={`text-2xl font-bold mb-6 ${getTierColor()}`}>
                {t(`reactionTest.tier${tier}`)}
              </div>
            </div>
          )}
        </div>

        {state === "result" ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToBeta}>
              {t("reactionTest.btnUnlock")}
            </Button>
            <Button size="lg" variant="outline" onClick={reset}>
              {t("reactionTest.btnTryAgain")}
            </Button>
          </div>
        ) : state === "idle" ? (
          <Button size="lg" onClick={startTest}>
            {t("reactionTest.btnStart")}
          </Button>
        ) : null}

        {state === "result" && (
          <p className="text-xs text-gray-500 mt-6">
            {t("reactionTest.note1")}
            <br />
            <span className="text-white font-semibold">
              {t("reactionTest.note2")}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
