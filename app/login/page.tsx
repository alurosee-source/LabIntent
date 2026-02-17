"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка входа");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-600/40 text-red-600 text-xs font-semibold uppercase tracking-wider mb-6">
            Drop Detector
          </div>
          <h1 className="text-2xl font-bold">Вход для тренера</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-600/10 border border-red-600/30 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide text-gray-400">
              Email
            </label>
            <Input
              type="email"
              placeholder="coach@team.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wide text-gray-400">
              Пароль
            </label>
            <Input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
            {loading ? "Входим..." : "Войти"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-red-500 hover:text-red-400 transition-colors">
            Зарегистрироваться
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← На главную
          </Link>
        </p>
      </div>
    </main>
  );
}
