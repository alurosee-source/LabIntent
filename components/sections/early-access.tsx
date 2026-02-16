"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

export function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [game, setGame] = useState("");
  const [rank, setRank] = useState("");
  const [telegram, setTelegram] = useState("");
  const [spotsRemaining, setSpotsRemaining] = useState(47);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsRemaining((prev) => Math.max(prev - Math.floor(Math.random() * 2), 12));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, game, rank, telegram }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 px-4 bg-black" id="beta-access">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4">{t("earlyAccess.successTitle")}</h3>
          <p className="text-gray-400 mb-6">
            {t("earlyAccess.successMessage")}
            <br />
            {t("earlyAccess.successMessage2")}
          </p>
          <p className="text-sm text-red-600 font-semibold">
            {t("earlyAccess.successEstimate")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-black" id="beta-access">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-4">
            {t("earlyAccess.badge")}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            {t("earlyAccess.title")}
          </h3>
          <p className="text-lg text-gray-400 mb-6">
            {t("earlyAccess.subtitle")}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-600 font-semibold text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span suppressHydrationWarning>{t("earlyAccess.spotsRemaining")} {spotsRemaining} {t("earlyAccess.spots")}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-600/10 border border-red-600/30 text-red-600">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              {t("earlyAccess.emailLabel")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t("earlyAccess.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="game" className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              {t("earlyAccess.gameLabel")}
            </label>
            <select
              id="game"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              required
              disabled={loading}
              className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">{t("earlyAccess.gamePlaceholder")}</option>
              <option value="cs">{t("earlyAccess.gameCS")}</option>
              <option value="valorant">{t("earlyAccess.gameValorant")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="rank" className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              {t("earlyAccess.rankLabel")}
            </label>
            <Input
              id="rank"
              type="text"
              placeholder={t("earlyAccess.rankPlaceholder")}
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="telegram" className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              {t("earlyAccess.telegramLabel")}
            </label>
            <Input
              id="telegram"
              type="text"
              placeholder={t("earlyAccess.telegramPlaceholder")}
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" size="lg" className="w-full mt-6" disabled={loading}>
            {loading ? t("earlyAccess.btnSubmitting") : t("earlyAccess.btnSubmit")}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-4">
            {t("earlyAccess.note1")}
            <br />
            {t("earlyAccess.note2")}
          </p>
        </form>
      </div>
    </section>
  );
}
