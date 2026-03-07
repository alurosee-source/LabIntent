"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect, useCallback } from "react";

type GameState =
  | "idle"
  | "countdown"
  | "playing"
  | "results"
  | "schulte"
  | "luscher"
  | "form"
  | "saving"
  | "saved";

const TOTAL_CIRCLES = 30;
const GREEN_CIRCLES = 20;
const CIRCLE_VISIBLE_MS = 1500;

const LUSCHER_COLORS = [
  { id: 0, hex: "#2c52b8", category: "calm" as const },
  { id: 1, hex: "#3d8b4c", category: "calm" as const },
  { id: 2, hex: "#cc2222", category: "stress" as const },
  { id: 3, hex: "#e8c830", category: "stress" as const },
  { id: 4, hex: "#7b3fa0", category: "stress" as const },
  { id: 5, hex: "#8b5a2b", category: "exhausted" as const },
  { id: 6, hex: "#2a2a2a", category: "exhausted" as const },
  { id: 7, hex: "#808080", category: "exhausted" as const },
];

type LuscherCategory = "calm" | "stress" | "exhausted";

function computeLuscherResult(
  seq1: number[],
  seq2: number[]
): LuscherCategory {
  const counts: Record<LuscherCategory, number> = { calm: 0, stress: 0, exhausted: 0 };
  // Top 3 from each round
  for (const seq of [seq1, seq2]) {
    seq.slice(0, 3).forEach((id) => {
      const cat = LUSCHER_COLORS.find((c) => c.id === id)!.category;
      counts[cat]++;
    });
  }
  return (Object.keys(counts) as LuscherCategory[]).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b
  );
}

function calcSleepHours(bedTime: string, wakeTime: string): number {
  if (!bedTime || !wakeTime) return 0;
  const [bh, bm] = bedTime.split(":").map(Number);
  const [wh, wm] = wakeTime.split(":").map(Number);
  let bedMin = bh * 60 + bm;
  let wakeMin = wh * 60 + wm;
  if (wakeMin <= bedMin) wakeMin += 24 * 60;
  return Math.round((wakeMin - bedMin) / 60);
}

function classifyAnswer(answer: string): string | null {
  const text = answer.toLowerCase();
  const fatigue = ["relieved", "tired", "sleep", "rest", "exhausted", "finally", "thank god", "need a break"];
  const mobilizing = ["disappointed", "want to play", "ready", "pumped", "focused", "let's go", "fired up", "motivated"];
  const anxiety = ["nervous", "scared", "anxious", "worried", "pressure", "stressed", "can't", "afraid"];

  if (fatigue.some((w) => text.includes(w))) return "Fatigue";
  if (mobilizing.some((w) => text.includes(w))) return "Mobilizing stress";
  if (anxiety.some((w) => text.includes(w))) return "Anxiety";
  return "No clear signal";
}

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

  // Reaction results
  const [score, setScore] = useState(0);
  const [avgMs, setAvgMs] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);

  // Schulte table
  const [schulteGrid, setSchulteGrid] = useState<number[]>([]);
  const [schulteNext, setSchulteNext] = useState(1);
  const [schulteTime, setSchulteTime] = useState(0);
  const schulteStartRef = useRef<number>(0);

  // Luscher color test
  const [luscherRound, setLuscherRound] = useState(1);
  const [luscherRemaining, setLuscherRemaining] = useState<number[]>(LUSCHER_COLORS.map((c) => c.id));
  const [luscherSeq1, setLuscherSeq1] = useState<number[]>([]);
  const [luscherSeq2, setLuscherSeq2] = useState<number[]>([]);
  const [luscherResult, setLuscherResult] = useState<LuscherCategory | null>(null);

  // Form
  const [teamName, setTeamName] = useState("");
  const [nickname, setNickname] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [cancellationAnswer, setCancellationAnswer] = useState("");
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
  const circleTypeRef = useRef<"green" | "red" | null>(null);

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
    circleTypeRef.current = type;
    setCircle({ type, x, y });

    circleTimerRef.current = setTimeout(() => {
      if (!clickedRef.current && type === "green") {
        missedRef.current++;
      }
      circleTypeRef.current = null;
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

  const handleCircleClick = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (clickedRef.current || !circleTypeRef.current) return;
    clickedRef.current = true;
    if (circleTypeRef.current === "green") {
      reactTimesRef.current.push(Date.now() - appearTimeRef.current);
    } else {
      falseRef.current++;
    }
    circleTypeRef.current = null;
    if (circleTimerRef.current) clearTimeout(circleTimerRef.current);
    setCircle(null);
    const delay = 800 + Math.random() * 1700;
    nextTimerRef.current = setTimeout(showNextCircle, delay);
  };

  const startSchulte = () => {
    setSchulteGrid(shuffle(Array.from({ length: 25 }, (_, i) => i + 1)));
    setSchulteNext(1);
    setSchulteTime(0);
    schulteStartRef.current = 0; // will be set on first click
    setState("schulte");
  };

  const handleSchulteClick = (num: number) => {
    if (num !== schulteNext) return;
    if (schulteNext === 1) {
      schulteStartRef.current = Date.now();
    }
    if (schulteNext === 25) {
      const elapsed = Math.round((Date.now() - schulteStartRef.current) / 1000);
      setSchulteTime(elapsed);
      // Start Luscher
      setLuscherRound(1);
      setLuscherRemaining(LUSCHER_COLORS.map((c) => c.id));
      setLuscherSeq1([]);
      setLuscherSeq2([]);
      setLuscherResult(null);
      setState("luscher");
    } else {
      setSchulteNext(schulteNext + 1);
    }
  };

  const handleLuscherPick = (id: number) => {
    const remaining = luscherRemaining.filter((x) => x !== id);
    if (luscherRound === 1) {
      const seq1 = [...luscherSeq1, id];
      setLuscherSeq1(seq1);
      if (remaining.length === 0) {
        // Start round 2
        setLuscherRound(2);
        setLuscherRemaining(LUSCHER_COLORS.map((c) => c.id));
        setLuscherSeq2([]);
      } else {
        setLuscherRemaining(remaining);
      }
    } else {
      const seq2 = [...luscherSeq2, id];
      setLuscherSeq2(seq2);
      if (remaining.length === 0) {
        const result = computeLuscherResult(luscherSeq1, seq2);
        setLuscherResult(result);
        setState("form");
      } else {
        setLuscherRemaining(remaining);
      }
    }
  };

  const handleSave = async () => {
    setState("saving");
    setSaveError("");

    const aiState = cancellationAnswer.trim() ? classifyAnswer(cancellationAnswer) : null;

    try {
      const res = await fetch("/api/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname || "Anonymous",
          team_name: teamName || null,
          avg_reaction_ms: avgMs,
          missed_targets: missedCount,
          false_clicks: falseCount,
          score,
          sleep_hours: calcSleepHours(bedTime, wakeTime),
          bed_time: bedTime || null,
          wake_time: wakeTime || null,
          cancellation_answer: cancellationAnswer || null,
          schulte_time: schulteTime || null,
          luscher_result: luscherResult || null,
          ai_state: aiState,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setState("saved");
    } catch {
      setSaveError("Failed to save. Please try again.");
      setState("form");
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
    setTeamName("");
    setBedTime("");
    setWakeTime("");
    setCancellationAnswer("");
    setSaveError("");
    setProgress(0);
    setSchulteNext(1);
    setSchulteTime(0);
    setLuscherResult(null);
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const getScoreLabel = (s: number) => {
    if (s >= 85) return "Peak form";
    if (s >= 65) return "Good form";
    if (s >= 45) return "Average — warm up before the game";
    return "Low readiness — rest recommended";
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
            Readiness Test
          </h2>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Reaction & Readiness Check
        </h3>
        <p className="text-gray-400 mb-8">
          Click green circles as fast as you can. Ignore red ones.
        </p>

        {/* Reaction test area */}
        {(state === "idle" || state === "countdown" || state === "playing") && (
          <>
            {state === "idle" && (
              <div className="mb-4 text-left">
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wide text-gray-400">
                  Team name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={teamName ? "border-green-500 pr-10" : ""}
                  />
                  {teamName && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Optional — required to appear on the coach dashboard
                </p>
              </div>
            )}
            <div
              onClick={state === "idle" ? startGame : undefined}
              className="relative w-full h-80 rounded-lg border-2 border-gray-800 bg-black overflow-hidden cursor-pointer mb-6 select-none"
            >
              {state === "idle" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <p className="text-lg font-semibold">Click to start</p>
                  <p className="text-sm text-gray-500">Click green — ignore red</p>
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
                      onPointerDown={handleCircleClick}
                      className={`absolute w-[120px] h-[120px] md:w-20 md:h-20 rounded-full transition-transform active:scale-90 touch-none ${
                        circle.type === "green"
                          ? "bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-400"
                          : "bg-red-600 shadow-lg shadow-red-600/50 hover:bg-red-500"
                      }`}
                      style={{
                        left: `${circle.x}%`,
                        top: `${circle.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* Results */}
        {state === "results" && (
          <div className="mb-8">
            <div className={`text-8xl font-bold mb-1 ${getScoreColor(score)}`}>{score}</div>
            <div className={`text-xl font-semibold mb-8 ${getScoreColor(score)}`}>{getScoreLabel(score)}</div>

            <div className="text-left rounded-lg bg-black border border-gray-800 divide-y divide-gray-800 mb-8">
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">Avg reaction time</span>
                <span className="text-sm font-bold font-mono">{avgMs} ms</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">Missed targets</span>
                <span className={`text-sm font-bold font-mono ${missedCount > 0 ? "text-red-500" : "text-gray-300"}`}>{missedCount}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">False clicks</span>
                <span className={`text-sm font-bold font-mono ${falseCount > 0 ? "text-red-500" : "text-gray-300"}`}>{falseCount}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-sm text-gray-400">Score</span>
                <span className={`text-sm font-bold font-mono ${getScoreColor(score)}`}>{score}</span>
              </div>
            </div>

            <Button size="lg" onClick={startSchulte} className="w-full mb-3">
              Continue →
            </Button>
            <button onClick={reset} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Try again
            </button>
          </div>
        )}

        {/* Schulte table */}
        {state === "schulte" && (
          <div className="mb-8">
            <div className="mb-2 text-sm text-gray-400 uppercase tracking-wider font-semibold">
              Step 2 of 4 — Attention test
            </div>
            <p className="text-gray-400 mb-1">
              Click numbers <span className="text-white font-bold">1 → 25</span> in order as fast as you can
            </p>
            <p className="text-xs text-gray-600 mb-6">Timer starts on your first click</p>
            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto mb-6">
              {schulteGrid.map((num) => (
                <button
                  key={num}
                  onClick={() => handleSchulteClick(num)}
                  className={`aspect-square rounded-md text-lg font-bold transition-colors ${
                    num < schulteNext
                      ? "bg-gray-800 text-gray-600 cursor-default"
                      : "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800 active:scale-95"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              Find and click: <span className="text-white font-bold">{schulteNext}</span>
            </div>
          </div>
        )}

        {/* Luscher color test */}
        {state === "luscher" && (
          <div className="mb-8">
            <div className="mb-2 text-sm text-gray-400 uppercase tracking-wider font-semibold">
              Step 3 of 4 — Color preference
            </div>
            <p className="text-gray-400 mb-1">
              Pick colors in order of preference, most appealing first
            </p>
            <p className="text-xs text-gray-600 mb-6">Round {luscherRound} of 2</p>
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {luscherRemaining.map((id) => {
                const color = LUSCHER_COLORS.find((c) => c.id === id)!;
                return (
                  <button
                    key={id}
                    onClick={() => handleLuscherPick(id)}
                    className="w-16 h-16 rounded-lg border-2 border-gray-700 hover:border-white hover:scale-110 transition-all"
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
            <p className="text-xs text-gray-600">{8 - luscherRemaining.length} of 8 selected</p>
          </div>
        )}

        {/* Form */}
        {(state === "form" || state === "saving") && (
          <div className="text-left space-y-6 max-w-md mx-auto">
            <div className="mb-2 text-sm text-gray-400 uppercase tracking-wider font-semibold text-center">
              Step 4 of 4 — About you
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                Nickname
              </label>
              <Input
                type="text"
                placeholder="Your in-game name"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={state === "saving"}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 uppercase tracking-wide">
                Sleep{" "}
                {bedTime && wakeTime && (
                  <span className="text-red-600 normal-case font-normal">
                    — {calcSleepHours(bedTime, wakeTime)}h
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Went to bed</p>
                  <input
                    type="time"
                    value={bedTime}
                    onChange={(e) => setBedTime(e.target.value)}
                    disabled={state === "saving"}
                    className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Woke up</p>
                  <input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    disabled={state === "saving"}
                    className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                If your match was cancelled right now — what would you feel?
              </label>
              <textarea
                placeholder="Write honestly..."
                value={cancellationAnswer}
                onChange={(e) => setCancellationAnswer(e.target.value)}
                rows={3}
                disabled={state === "saving"}
                className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none disabled:opacity-50"
              />
            </div>

            {saveError && <p className="text-sm text-red-500">{saveError}</p>}

            <Button size="lg" className="w-full" onClick={handleSave} disabled={state === "saving"}>
              {state === "saving" ? "Analyzing & saving..." : "Save result"}
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
            <h4 className="text-xl font-bold mb-3">Result saved</h4>
            <p className="text-gray-400 mb-8">Your coach will see it on the dashboard.</p>
            <Button variant="outline" onClick={reset}>
              Try again
            </Button>
          </div>
        )}

        {state === "idle" && (
          <Button size="lg" onClick={startGame}>
            Start test
          </Button>
        )}
      </div>
    </section>
  );
}
