import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/60 bg-black/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600" />
          <span className="font-bold text-sm uppercase tracking-wider">Drop Detector</span>
        </Link>

        <Link
          href="/login"
          className="text-sm font-semibold px-4 py-1.5 rounded-md border border-gray-700 text-gray-300 hover:border-red-600/60 hover:text-white transition-colors"
        >
          Для тренеров
        </Link>
      </div>
    </nav>
  );
}
