import { ReactionTest } from "@/components/sections/reaction-test";
import Link from "next/link";

export const metadata = {
  title: "Тест реакции | Drop Detector",
  description: "Проверь скорость реакции и контроль импульсов за 60 секунд.",
};

export default function TestPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="py-6 px-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Назад
          </Link>
          <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Drop Detector</span>
        </div>
      </div>
      <ReactionTest />
    </main>
  );
}
