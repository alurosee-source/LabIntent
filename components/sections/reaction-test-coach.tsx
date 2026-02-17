"use client";

import { ReactionTest } from "@/components/sections/reaction-test";

export function ReactionTestCoach() {
  return (
    <div className="bg-gray-900/50">
      <div className="max-w-2xl mx-auto pt-20 px-4 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
          Демо
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Проверьте игрока прямо сейчас
        </h3>
        <p className="text-lg text-gray-400">
          Дайте пройти тест любому игроку вашей команды — увидите результат за 60 секунд
        </p>
      </div>

      {/* ReactionTest renders its own section tag with padding */}
      <ReactionTest />

      <div className="max-w-2xl mx-auto pb-20 px-4 text-center -mt-6">
        <p className="text-sm text-gray-500">
          В пилоте каждый игрок проходит этот тест ежедневно перед тренировкой.
          Тренер видит динамику всей команды в одном дашборде.
        </p>
      </div>
    </div>
  );
}
