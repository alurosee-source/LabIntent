"use client";

export function HeroCoach() {
  const scrollToForm = () => {
    document.getElementById("coach-form")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToProduct = () => {
    document.getElementById("how-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-600/40 text-red-600 text-xs font-semibold uppercase tracking-wider mb-8">
          Инструмент для профессиональных CS команд
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Вы узнаёте о спаде игрока<br />
          после 5 проигранных матчей.{" "}
          <span className="text-red-600">Мы — до первого.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Инструмент мониторинга готовности игроков для профессиональных CS команд.
          Бесплатный пилот — 2 недели.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors text-base"
          >
            Оставить заявку на пилот
          </button>
          <button
            onClick={scrollToProduct}
            className="px-8 py-4 border border-gray-700 hover:border-gray-500 text-white font-semibold rounded-md transition-colors text-base"
          >
            Посмотреть как работает
          </button>
        </div>
      </div>
    </section>
  );
}
