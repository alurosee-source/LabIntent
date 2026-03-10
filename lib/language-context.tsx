"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

const translations: Record<Language, any> = {
  en: {
    navbar: {
      forCoaches: "For Coaches",
    },
    heroCoach: {
      badge: "Tool for professional CS teams",
      title: "Know who's ready before the match.",
      subtitle: "A 3-minute check that shows you which players are sharp today, not based on what they say.",
    },
    problemCoach: {
      line1: "Performance drops are noticed after 5 lost matches — not before",
      line2: "No sports psychologist — coaches track player state by intuition",
      line3: "Players are contractually required to play even when not ready",
    },
    howWorksCoach: {
      badge: "How it works",
      title: "How it works",
      step1: "Player takes the test before practice (3 minutes)",
      step2: "The system builds a personal baseline for each player",
      step3: "Coach sees who is ready and who is showing warning signs",
    },
    dashboardMockup: {
      title: "What the coach sees across the whole team",
      windowLabel: "Team monitor — today",
      colPlayer: "Player",
      colStatus: "Status",
      colReaction: "Reaction",
      colFocus: "Focus",
      colSleep: "Sleep",
      colEmotion: "Emotional state",
      colAnswer: "If match cancelled...",
      footer: "Example data. Real results appear after players complete the test.",
      statusSharp: "Sharp",
      statusMonitor: "Monitor",
      statusBench: "Bench",
      labelFast: "Fast",
      labelAverage: "Average",
      labelSlow: "Slow",
      labelHigh: "High",
      labelLow: "Low",
      labelMobilized: "Mobilized",
      labelNeutral: "Neutral",
      labelFatigued: "Fatigued",
      labelAnxious: "Anxious",
      player1Answer: "Gutted — I was looking forward to it",
      player2Answer: "Nothing. Ready to play.",
      player3Answer: "Fine I guess, a bit tired",
      player4Answer: "Relieved honestly, I need rest",
      player5Answer: "Stressed, worried about my performance",
    },
    coachForm: {
      badge: "Pilot",
      title: "Free pilot for your team",
      labelName: "Your name",
      placeholderName: "Coach or team captain",
      labelTeam: "Team name",
      placeholderTeam: "Your team name",
      labelContact: "Telegram or email",
      placeholderContact: "@username or email@example.com",
      labelSize: "Number of players",
      sizeDefault: "Select size",
      sizeMore: "More than 10",
      btnSubmit: "Apply for the pilot",
      btnSending: "Sending...",
      note: "Free. 2 weeks. Includes a full analytics report per player at the end.",
      errorGeneric: "Something went wrong. Please try again.",
      successTitle: "Application received",
      successMessage: "We'll be in touch within 24 hours.",
    },
    reactionTest: {
      badge: "Readiness Test",
      title: "Reaction & Readiness Check",
      subtitle: "Click green circles as fast as you can. Ignore red ones.",
      teamName: "Team name",
      teamNamePlaceholder: "Enter your team name",
      teamNameNote: "Optional — required to appear on the coach dashboard",
      clickToStart: "Click to start",
      clickHint: "Green — click fast  •  Red — don't click",
      step2: "Step 2 of 4 — Attention test",
      schulteDesc: "Click numbers 1 → 25 in order as fast as you can",
      schulteTimerNote: "Timer starts on your first click",
      schulteFindNext: "Find and click:",
      step3: "Step 3 of 4 — Color preference",
      luscherDesc: "Pick colors in order of preference, most appealing first",
      luscherRound: "Round {n} of 2",
      luscherSelected: "{n} of 8 selected",
      step4: "Step 4 of 4 — About you",
      labelNickname: "Nickname",
      placeholderNickname: "Your in-game name",
      labelSleep: "Sleep",
      labelBedTime: "Went to bed",
      labelWakeTime: "Woke up",
      labelCancellation: "If your match was cancelled right now — what would you feel?",
      placeholderCancellation: "Write honestly...",
      btnSave: "Save result",
      btnSaving: "Analyzing & saving...",
      saveError: "Failed to save. Please try again.",
      scoreLabel85: "Peak form",
      scoreLabel65: "Good form",
      scoreLabel45: "Average — warm up before the game",
      scoreLabelLow: "Low readiness — rest recommended",
      avgReaction: "Avg reaction time",
      missedTargets: "Missed targets",
      falseClicks: "False clicks",
      score: "Score",
      btnContinue: "Continue →",
      btnTryAgain: "Try again",
      savedTitle: "Result saved",
      savedMessage: "Your coach will see it on the dashboard.",
      btnStartTest: "Start test",
      fieldRequired: "This field is required",
    },
  },
  ru: {
    navbar: {
      forCoaches: "Для тренеров",
    },
    heroCoach: {
      badge: "Инструмент для профессиональных CS-команд",
      title: "Знай, кто готов до матча.",
      subtitle: "3-минутная проверка, которая показывает, кто в форме сегодня — не по словам, а по данным.",
    },
    problemCoach: {
      line1: "Снижение формы замечают после 5 проигранных матчей — не раньше",
      line2: "Нет спортивного психолога — тренеры следят за состоянием игроков интуитивно",
      line3: "Игроки обязаны играть по контракту, даже когда не готовы",
    },
    howWorksCoach: {
      badge: "Как это работает",
      title: "Как это работает",
      step1: "Игрок проходит тест перед тренировкой (3 минуты)",
      step2: "Система строит персональный базовый профиль для каждого игрока",
      step3: "Тренер видит, кто готов, а кто показывает тревожные признаки",
    },
    dashboardMockup: {
      title: "Что видит тренер по всей команде",
      windowLabel: "Мониторинг команды — сегодня",
      colPlayer: "Игрок",
      colStatus: "Статус",
      colReaction: "Реакция",
      colFocus: "Фокус",
      colSleep: "Сон",
      colEmotion: "Эмоц. состояние",
      colAnswer: "Если матч отменят...",
      footer: "Примерные данные. Реальные результаты появятся после прохождения теста игроками.",
      statusSharp: "В форме",
      statusMonitor: "Наблюдение",
      statusBench: "Скамейка",
      labelFast: "Быстро",
      labelAverage: "Средне",
      labelSlow: "Медленно",
      labelHigh: "Высокий",
      labelLow: "Низкий",
      labelMobilized: "Мобилизован",
      labelNeutral: "Нейтрально",
      labelFatigued: "Утомлён",
      labelAnxious: "Тревожен",
      player1Answer: "Обидно — ждал этого матча",
      player2Answer: "Ничего. Готов играть.",
      player3Answer: "Нормально, немного устал",
      player4Answer: "Честно, облегчение — нужен отдых",
      player5Answer: "Стресс, переживаю за свою игру",
    },
    coachForm: {
      badge: "Пилот",
      title: "Бесплатный пилот для вашей команды",
      labelName: "Ваше имя",
      placeholderName: "Тренер или капитан команды",
      labelTeam: "Название команды",
      placeholderTeam: "Название вашей команды",
      labelContact: "Telegram или email",
      placeholderContact: "@username или email@example.com",
      labelSize: "Количество игроков",
      sizeDefault: "Выберите размер",
      sizeMore: "Более 10",
      btnSubmit: "Записаться на пилот",
      btnSending: "Отправка...",
      note: "Бесплатно. 2 недели. В конце — полный аналитический отчёт на каждого игрока.",
      errorGeneric: "Что-то пошло не так. Попробуйте снова.",
      successTitle: "Заявка получена",
      successMessage: "Свяжемся в течение 24 часов.",
    },
    reactionTest: {
      badge: "Тест готовности",
      title: "Реакция и готовность",
      subtitle: "Кликай по зелёным кругам как можно быстрее. Красные — игнорируй.",
      teamName: "Название команды",
      teamNamePlaceholder: "Введи название команды",
      teamNameNote: "Необязательно — нужно для отображения на дашборде тренера",
      clickToStart: "Нажми для старта",
      clickHint: "Зелёный — жми  •  Красный — не жми",
      step2: "Шаг 2 из 4 — Тест внимания",
      schulteDesc: "Нажимай числа 1 → 25 по порядку как можно быстрее",
      schulteTimerNote: "Таймер запустится при первом клике",
      schulteFindNext: "Найди и нажми:",
      step3: "Шаг 3 из 4 — Цветовые предпочтения",
      luscherDesc: "Выбирай цвета в порядке предпочтения, начиная с самого приятного",
      luscherRound: "Раунд {n} из 2",
      luscherSelected: "{n} из 8 выбрано",
      step4: "Шаг 4 из 4 — О тебе",
      labelNickname: "Никнейм",
      placeholderNickname: "Твой ник в игре",
      labelSleep: "Сон",
      labelBedTime: "Лёг спать",
      labelWakeTime: "Проснулся",
      labelCancellation: "Если матч отменят прямо сейчас — что ты почувствуешь?",
      placeholderCancellation: "Ответь честно...",
      btnSave: "Сохранить результат",
      btnSaving: "Анализ и сохранение...",
      saveError: "Не удалось сохранить. Попробуй снова.",
      scoreLabel85: "Пик формы",
      scoreLabel65: "Хорошая форма",
      scoreLabel45: "Средне — разогрейся перед игрой",
      scoreLabelLow: "Низкая готовность — рекомендуется отдых",
      avgReaction: "Средняя реакция",
      missedTargets: "Пропущено",
      falseClicks: "Ложные клики",
      score: "Счёт",
      btnContinue: "Продолжить →",
      btnTryAgain: "Попробовать снова",
      savedTitle: "Результат сохранён",
      savedMessage: "Тренер увидит его на дашборде.",
      btnStartTest: "Начать тест",
      fieldRequired: "Это поле обязательно",
    },
  },
};
