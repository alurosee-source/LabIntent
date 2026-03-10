"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/60 bg-black/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600" />
          <span className="font-bold text-sm uppercase tracking-wider">Drop Detector</span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-1.5 rounded-md border border-gray-700 text-gray-300 hover:border-red-600/60 hover:text-white transition-colors"
          >
            {t("navbar.forCoaches")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
