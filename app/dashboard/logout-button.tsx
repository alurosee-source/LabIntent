"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
    >
      Выйти
    </button>
  );
}
