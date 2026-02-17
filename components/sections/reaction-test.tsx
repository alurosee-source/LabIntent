"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/language-context";

type GameState = "idle" | "countdown" | "playing" | "results" | "form" | "saved";

const TOTAL_CIRCLES = 30;
const GREEN_CIRCLES = 20;
const CIRCLE_VISIBLE_MS = 1000;

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function calcScore(avgMs: number, missed: number, falseCl: number): number {
  let base = 15;
  if (avgMs < 180) base = 100;
  else if (avgMs < 250) base = 85;
  else if (avgMs < 350) base = 70;
  else if (avgMs < 450) base = 50;
  else if (avgMs < 550) base = 30;
  else base = 15;
  return Math.max(0, base - falseCl * 8 - missed * 5);
}

export function ReactionTest() {
  const [state, setState] = useState<GameState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [circle, setCircle] = useState<{ type: "green" | "red"; x: number; y: number } | null>(null);
  const [progress, setProgress] = useState(0);

  // Final results
  const [score, setScore] = useState(0);
  const [avgMs, setAvgMs] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);

  // Form
  const [nickname, setNickname] = useState("");
  const [sleepHours, setSleepHours] = useState(7);
  const [stress, setStress] = useState(5);
  const [motivation, setMotivation] = useState(5);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Game refs (avoid stale closures in timers)
  const orderRef = useRef<Array<"green" | "red">>([]);
  const indexRef = useRef(0);
  const appearTimeRef = useRef(0);
  const clickedRef = useRef(false);
  const reactTimesRef = useRef<number[]>([]);
  const missedRef = useRef(0);
  const falseRef = useRef(0);
  const circleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { t } = useLanguage();

  const clearTimers = () => {
    if (circleTimerRef.current) clearTimeout(circleTimerRef.current);
    if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
  };

  const finishGame = useCallback(() => {
    clearTimers();
    setCircle(null);
    const times = reactTimesRef.current;
    const avg = times.length > 0
      ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
      : 999;
    const missed = missedRef.current;
    const falseCl = falseRef.current;
    setAvgMs(avg);
    setMissedCount(missed);
    setFalseCount(falseCl);
    setScore(calcScore(avg, missed, falseCl));
    setState("results");
  }, []);

  const showNextCircle = useCallback(() => {
    if (indexRef.current >= TOTAL_CIRCLES) {
      finishGame();
      return;
    }
    const type = orderRef.current[indexRef.current];
    indexRef.current++;
    setProgress(indexRef.current);

    const x = 15 + Math.random() * 70;
    const y = 15 + Math.random() * 70;
    clickedRef.current = false;
    appearTimeRef.current = Date.now();
    setCircle({ type, x, y });

    circleTimerRef.current = setTimeout(() => {
      if (!clickedRef.current && type === "green") {
        missedRef.current++;
      }
      setCircle(null);
      const delay = 800 + Math.random() * 1700;
      nextTimerRef.current = setTimeout(showNextCircle, delay);
    }, CIRCLE_VISIBLE_MS);
  }, [finishGame]);

  const startGame = useCallback(() => {
    orderRef.current = shuffle([
      ...Array(GREEN_CIRCLES).fill("green"),
      ...Array(TOTAL_CIRCLES - GREEN_CIRCLES).fill("red"),
    ]);
    indexRef.current = 0;
    reactTimesRef.current = [];
    missedRef.current = 0;
    falseRef.current = 0;
    setProgress(0);
    setCountdown(3);
    setState("countdown");

    let count = 3;
    const tick = () => {
      count--;
      if (count === 0) {
        setState("playing");
        nextTimerRef.current = setTimeout(showNextCircle, 800);
      } else {
        setCountdown(count);
        nextTimerRef.current = setTimeout(tick, 1000);
      }
    };
    nextTimerRef.current = setTimeout(tick, 1000);
  }, [showNextCircle]);

  const handleCircleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!circle) return;
    if (circle.type === "green") {
      reactTimesRef.current.push(Date.now() - appearTimeRef.current);
    } else {
      falseRef.current++;
    }
    clickedRef.current = true;
    if (circleTimerRef.current) clearTimeout(circleTimerRef.current);
    setCircle(null);
    const delay = 800 + Math.random() * 1700;
    nextTimerRef.current = setTimeout(showNextCircle, delay);
  };

  const handleAreaClick = () => {
    // Clicks on empty area don't count — only red circle clicks are false_click
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname || "Anonymous",
          avg_reaction_ms: avgMs,
          missed_targets: missedCount,
          false_clicks: falseCount,
          score,
          sleep_hours: sleepHours,
          stress,
          motivation,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setState("saved");
    } catch {
      setSaveError(t("reactionTest.saveError"));
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    clearTimers();
    setCircle(null);
    setState("idle");
    setScore(0);
    setAvgMs(0);
    setMissedCount(0);
    setFalseCount(0);
    setNickname("");
    setSleepHours(7);
    setStress(5);
    setMotivation(5);
    setSaveError("");
    setProgress(0);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const getScoreLabel = (s: number) => {
    if (s >= 85) return "Топовая форма";
    if (s >= 65) return "Хорошая форма";
    if (s >= 45) return "Средняя форма — разомнись перед игрой";
    return "Низкая готовность — рекомендуем отдых";
  };

  const getScoreColor = (s: number) => {
    if (s >= 85) return "text-green-500";
    if (s >= 65) return "text-green-400";
    if (s >= 45) return "text-yellow-500";
    return "text-red-500";
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

        {/* Game area */}
        {(state === "idle" || state === "countdown" || state === "playing") && (
          <div
            onClick={state === "idle" ? startGame : handleAreaClick}
            className="relative w-full h-80 rounded-lg border-2 border-gray-800 bg-black overflow-hidden cursor-pointer mb-6 select-none"
          >
            {state === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <p className="text-lg font-semibold">{t("reactionTest.clickToStart")}</p>
                <p className="text-sm text-gray-500">{t("reactionTest.instructions")}</p>
              </div>
            )}

            {state === "countdown" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-white">{countdown}</span>
              </div>
            )}

            {state === "playing" && (
              <>
                <div className="absolute top-3 left-4 text-xs text-gray-500">
                  {progress}/{TOTAL_CIRCLES}
                </div>
                {circle && (
                  <button
                    onClick={handleCircleClick}
                    className={`absolute w-14 h-14 rounded-full transition-transform active:scale-90 ${
                      circle.type === "green"
                        ? "bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-400"
                        : "bg-red-600 shadow-lg shadow-red-600/50 hover:bg-red-500"
                    }`}
                    style={{
                      left: `calc(${circle.x}% - 28px)`,
                      top: `calc(${circle.y}% - 28px)`,
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* Results */}
        {state === "results" && (
          <div className="mb-8">
            <div className={`text-8xl font-bold mb-1 ${getScoreColor(score)}`}>{score}</div>
            <div className={`text-xl font-semibold mb-8 ${getScoreColor(score)}`}>{getScoreLabel(score)}</div>

            <div className="text-left rounded-lg bg-black border border-gray-800 divide-y divide-gray-800 mb-8">
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">Среднее время реакции</span>
                <span className="text-sm font-bold font-mono">{avgMs} мс</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">Пропущено целей</span>
                <span className={`text-sm font-bold font-mono ${missedCount > 0 ? "text-red-500" : "text-gray-300"}`}>{missedCount}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">Ложных нажатий</span>
                <span className={`text-sm font-bold font-mono ${falseCount > 0 ? "text-red-500" : "text-gray-300"}`}>{falseCount}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">Итоговый score</span>
                <span className={`text-sm font-bold font-mono ${getScoreColor(score)}`}>{score}</span>
              </div>
            </div>

            <Button size="lg" onClick={() => setState("form")} className="w-full mb-3">
              {t("reactionTest.btnSaveResult")}
            </Button>
            <button onClick={reset} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              {t("reactionTest.btnTryAgain")}
            </button>
          </div>
        )}

        {/* Form */}
        {state === "form" && (
          <div className="text-left space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                {t("reactionTest.formNickname")}
              </label>
              <Input
                type="text"
                placeholder={t("reactionTest.formNicknamePlaceholder")}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 uppercase tracking-wide">
                {t("reactionTest.formSleep")}: <span className="text-red-600">{sleepHours}ч</span>
              </label>
              <input
                type="range" min="1" max="12" value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1ч</span><span>12ч</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 uppercase tracking-wide">
                {t("reactionTest.formStress")}: <span className="text-red-600">{stress}/10</span>
              </label>
              <input
                type="range" min="1" max="10" value={stress}
                onChange={(e) => setStress(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span><span>10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 uppercase tracking-wide">
                {t("reactionTest.formMotivation")}: <span className="text-red-600">{motivation}/10</span>
              </label>
              <input
                type="range" min="1" max="10" value={motivation}
                onChange={(e) => setMotivation(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span><span>10</span>
              </div>
            </div>

            {saveError && <p className="text-sm text-red-500">{saveError}</p>}

            <Button size="lg" className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? t("reactionTest.btnSaving") : t("reactionTest.btnSave")}
            </Button>
          </div>
        )}

        {/* Saved */}
        {state === "saved" && (
          <div className="py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-3">{t("reactionTest.savedTitle")}</h4>
            <p className="text-gray-400 mb-8">{t("reactionTest.savedMessage")}</p>
            <Button variant="outline" onClick={reset}>
              {t("reactionTest.btnTryAgain")}
            </Button>
          </div>
        )}

        {state === "idle" && (
          <Button size="lg" onClick={startGame}>
            {t("reactionTest.btnStart")}
          </Button>
        )}
      </div>
    </section>
  );
}
