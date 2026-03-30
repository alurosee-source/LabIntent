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
      forCoaches: "For Teams",
    },
    heroCoach: {
      badge: "Competitive selection platform",
      title: "Compete. Get ranked. Get noticed.",
      subtitle: "Take the assessment, climb the leaderboard, and put yourself in front of professional teams looking for their next player.",
    },
    problemCoach: {
      line1: "Talented players grind for years without a way to prove themselves objectively",
      line2: "Pro teams scout based on reputation and connections — not raw performance data",
      line3: "There's no fair, transparent path from amateur to professional",
    },
    howWorksCoach: {
      badge: "How it works",
      title: "Three steps to get scouted",
      step1: "Complete the readiness assessment — reaction, focus, and mental state",
      step2: "Your score is ranked against all other players on the leaderboard",
      step3: "Professional teams browse top performers and reach out directly",
    },
    dashboardMockup: {
      title: "What pro teams see on the leaderboard",
      windowLabel: "Intent Lab — Top performers today",
      colPlayer: "Player",
      colStatus: "Standing",
      colReaction: "Reaction",
      colFocus: "Focus",
      colSleep: "Sleep",
      colEmotion: "Mental state",
      colAnswer: "Motivation",
      footer: "Example data. Your real results appear here after completing the assessment.",
      statusSharp: "Top pick",
      statusMonitor: "Watchlist",
      statusBench: "Off radar",
      labelFast: "Fast",
      labelAverage: "Average",
      labelSlow: "Slow",
      labelHigh: "High",
      labelLow: "Low",
      labelMobilized: "Driven",
      labelNeutral: "Neutral",
      labelFatigued: "Fatigued",
      labelAnxious: "Anxious",
      player1Answer: "Motivated — I train to compete",
      player2Answer: "Focused. Always ready.",
      player3Answer: "Consistent, nothing special today",
      player4Answer: "Relieved honestly, need a break",
      player5Answer: "Nervous, want to prove myself",
    },
    coachForm: {
      badge: "Join the competition",
      title: "Enter the selection pool",
      labelName: "Your nickname",
      placeholderName: "Your in-game name",
      labelTeam: "Current team (if any)",
      placeholderTeam: "Team name or 'Solo'",
      labelContact: "Telegram or email",
      placeholderContact: "@username or email@example.com",
      labelSize: "Your level",
      sizeDefault: "Select level",
      sizeMore: "Semi-pro / Open",
      btnSubmit: "Submit my profile",
      btnSending: "Sending...",
      note: "Free. Your results are visible to verified professional teams only.",
      errorGeneric: "Something went wrong. Please try again.",
      successTitle: "Profile submitted",
      successMessage: "You're in the pool. Pro teams will be able to see your results.",
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
      forCoaches: "Для команд",
    },
    heroCoach: {
      badge: "Платформа соревновательного отбора",
      title: "Соревнуйся. Попади в рейтинг. Стань заметным.",
      subtitle: "Пройди оценку, поднимись в рейтинге и попади в поле зрения профессиональных команд, которые ищут нового игрока.",
    },
    problemCoach: {
      line1: "Талантливые игроки годами тренируются — без возможности объективно доказать свой уровень",
      line2: "Про-команды скаутируют по репутации и связям, а не по реальным данным",
      line3: "Нет справедливого и прозрачного пути от любителя до профессионала",
    },
    howWorksCoach: {
      badge: "Как это работает",
      title: "Три шага до скаутинга",
      step1: "Пройди оценку готовности — реакция, внимание и ментальное состояние",
      step2: "Твой результат попадает в общий рейтинг среди всех участников",
      step3: "Профессиональные команды просматривают лучших и выходят напрямую",
    },
    dashboardMockup: {
      title: "Что видят профессиональные команды в рейтинге",
      windowLabel: "Intent Lab — Лучшие сегодня",
      colPlayer: "Игрок",
      colStatus: "Позиция",
      colReaction: "Реакция",
      colFocus: "Фокус",
      colSleep: "Сон",
      colEmotion: "Ментальное",
      colAnswer: "Мотивация",
      footer: "Примерные данные. Твои реальные результаты появятся здесь после прохождения оценки.",
      statusSharp: "Топ-выбор",
      statusMonitor: "На заметке",
      statusBench: "Вне радара",
      labelFast: "Быстро",
      labelAverage: "Средне",
      labelSlow: "Медленно",
      labelHigh: "Высокий",
      labelLow: "Низкий",
      labelMobilized: "Заряжен",
      labelNeutral: "Нейтрально",
      labelFatigued: "Устал",
      labelAnxious: "Тревожен",
      player1Answer: "Мотивирован — тренируюсь чтобы побеждать",
      player2Answer: "Сфокусирован. Всегда готов.",
      player3Answer: "Стабильно, сегодня ничего особенного",
      player4Answer: "Честно, облегчение — нужен перерыв",
      player5Answer: "Волнуюсь, хочу доказать свой уровень",
    },
    coachForm: {
      badge: "Вступить в отбор",
      title: "Попасть в пул участников",
      labelName: "Твой никнейм",
      placeholderName: "Ник в игре",
      labelTeam: "Текущая команда (если есть)",
      placeholderTeam: "Название команды или «Соло»",
      labelContact: "Telegram или email",
      placeholderContact: "@username или email@example.com",
      labelSize: "Твой уровень",
      sizeDefault: "Выбери уровень",
      sizeMore: "Полупрофессионал / Open",
      btnSubmit: "Подать профиль",
      btnSending: "Отправка...",
      note: "Бесплатно. Твои результаты видят только верифицированные профессиональные команды.",
      errorGeneric: "Что-то пошло не так. Попробуйте снова.",
      successTitle: "Профиль подан",
      successMessage: "Ты в пуле. Профессиональные команды смогут увидеть твои результаты.",
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
