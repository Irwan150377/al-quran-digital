import BottomNav from "@/components/BottomNav";
import PrayerCard from "@/components/PrayerCard";
import DailyVerse from "@/components/DailyVerse";
import QuickActions from "@/components/QuickActions";
import { BookOpen, Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-[#1ABC9C]">
            🕌 Al-Quran Digital
          </h1>
          <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Settings size={22} className="text-gray-600 dark:text-gray-400" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-5 max-w-lg mx-auto space-y-6">
        {/* Prayer Times Card */}
        <PrayerCard />

        {/* Continue Reading */}
        <Link
          href="/quran/2"
          className="block bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:border-[#1ABC9C] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1ABC9C]/10 rounded-xl">
              <BookOpen size={28} className="text-[#1ABC9C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Lanjutkan Membaca
              </p>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                Surah Al-Baqarah
              </h3>
              <p className="text-xs text-gray-400">Ayat 156 • Halaman 24</p>
            </div>
            <span className="text-[#1ABC9C] text-2xl">→</span>
          </div>
        </Link>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
            Aksi Cepat
          </h2>
          <QuickActions />
        </div>

        {/* Daily Verse */}
        <DailyVerse />

        {/* Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📊 Progress Bulan Ini
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Bacaan Al-Quran</span>
                <span className="text-[#1ABC9C] font-medium">24%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#1ABC9C] rounded-full" style={{ width: "24%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Kuis Juz 30</span>
                <span className="text-amber-500 font-medium">60%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
