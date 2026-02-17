"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CoachForm() {
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [contact, setContact] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/coach-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, team_name: teamName, contact, team_size: teamSize }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Что-то пошло не так. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="coach-form" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3">Заявка принята</h3>
          <p className="text-gray-400">Свяжемся в течение 24 часов.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="coach-form" className="py-20 px-4 bg-gray-900/50 border-t border-gray-800">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
            Пилот
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Бесплатный пилот для вашей команды
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 rounded-lg bg-red-600/10 border border-red-600/30 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              Ваше имя
            </label>
            <Input
              type="text"
              placeholder="Тренер или капитан"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              Название команды
            </label>
            <Input
              type="text"
              placeholder="Название вашей команды"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              Telegram или email для связи
            </label>
            <Input
              type="text"
              placeholder="@username или email@example.com"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
              Количество игроков в команде
            </label>
            <select
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              required
              disabled={loading}
              className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Выберите количество</option>
              <option value="5">5</option>
              <option value="6-10">6–10</option>
              <option value="10+">Больше 10</option>
            </select>
          </div>

          <Button type="submit" size="lg" className="w-full mt-6" disabled={loading}>
            {loading ? "Отправка..." : "Подключить команду к пилоту"}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Бесплатно. 2 недели. В конце — аналитический отчёт по каждому игроку.
          </p>
        </form>
      </div>
    </section>
  );
}
