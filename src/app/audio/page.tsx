"use client";

import BottomNav from "@/components/BottomNav";
import { Sun, Moon, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

// Data Ma'tsurat
const matsurat = {
  pagi: [
    { id: 1, title: "Ayat Kursi", arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ...", surah: "Al-Baqarah: 255" },
    { id: 2, title: "Al-Ikhlas (3x)", arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ...", surah: "Al-Ikhlas: 1-4" },
    { id: 3, title: "Al-Falaq (3x)", arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ...", surah: "Al-Falaq: 1-5" },
    { id: 4, title: "An-Nas (3x)", arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ...", surah: "An-Nas: 1-6" },
    { id: 5, title: "Doa Pagi", arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ...", surah: "Dzikir Pagi" },
    { id: 6, title: "Sayyidul Istighfar", arabic: "اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـٰهَ إِلاَّ أَنْتَ...", surah: "Dzikir Pagi" },
    { id: 7, title: "Doa Perlindungan", arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ...", surah: "3x Pagi" },
    { id: 8, title: "Ridha Allah", arabic: "رَضِيْتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِيْنًا...", surah: "3x Pagi" },
  ],
  petang: [
    { id: 1, title: "Ayat Kursi", arabic: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ...", surah: "Al-Baqarah: 255" },
    { id: 2, title: "Al-Ikhlas (3x)", arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ...", surah: "Al-Ikhlas: 1-4" },
    { id: 3, title: "Al-Falaq (3x)", arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ...", surah: "Al-Falaq: 1-5" },
    { id: 4, title: "An-Nas (3x)", arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ...", surah: "An-Nas: 1-6" },
    { id: 5, title: "Doa Petang", arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ...", surah: "Dzikir Petang" },
    { id: 6, title: "Sayyidul Istighfar", arabic: "اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـٰهَ إِلاَّ أَنْتَ...", surah: "Dzikir Petang" },
    { id: 7, title: "Doa Perlindungan", arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ...", surah: "3x Petang" },
    { id: 8, title: "Tasbih Petang", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ...", surah: "100x Petang" },
  ]
};

export default function MatsuratPage() {
  // Determine if it's morning or evening
  const hour = new Date().getHours();
  const isMorning = hour >= 4 && hour < 15;

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-[#FDF8F3]/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-[#5D4E37] dark:text-white">
            📿 Ma'tsurat
          </h1>
          <p className="text-sm text-[#8B7355] dark:text-gray-400">Dzikir Pagi & Petang</p>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
        {/* Time Indicator */}
        <div className={`rounded-2xl p-5 text-white ${isMorning ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}>
          <div className="flex items-center gap-3">
            {isMorning ? <Sun size={32} /> : <Moon size={32} />}
            <div>
              <p className="text-sm opacity-90">Waktu yang disarankan</p>
              <p className="text-xl font-bold">{isMorning ? 'Dzikir Pagi' : 'Dzikir Petang'}</p>
            </div>
          </div>
          <p className="text-sm opacity-80 mt-2">
            {isMorning ? 'Setelah Subuh hingga Dhuha' : 'Setelah Ashar hingga Maghrib'}
          </p>
        </div>

        {/* Dzikir Pagi */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sun size={20} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 uppercase tracking-wide">
              Dzikir Pagi
            </h2>
          </div>
          <Link
            href="/matsurat/pagi"
            className="block bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <BookOpen size={24} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#5D4E37] dark:text-white">Ma'tsurat Pagi</h3>
                  <p className="text-sm text-[#8B7355] dark:text-gray-500">{matsurat.pagi.length} dzikir</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#8B7355]" />
            </div>
          </Link>
        </div>

        {/* Dzikir Petang */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Moon size={20} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 uppercase tracking-wide">
              Dzikir Petang
            </h2>
          </div>
          <Link
            href="/matsurat/petang"
            className="block bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-5 border border-indigo-200 dark:border-indigo-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#5D4E37] dark:text-white">Ma'tsurat Petang</h3>
                  <p className="text-sm text-[#8B7355] dark:text-gray-500">{matsurat.petang.length} dzikir</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[#8B7355]" />
            </div>
          </Link>
        </div>

        {/* Quick Preview */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Pratinjau Dzikir
          </h2>
          <div className="space-y-3">
            {(isMorning ? matsurat.pagi : matsurat.petang).slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-[#5D4E37] dark:text-white">{item.title}</h3>
                  <span className="text-xs text-[#8B7355] dark:text-gray-500 bg-[#F5EFE7] dark:bg-gray-700 px-2 py-1 rounded-full">
                    {item.surah}
                  </span>
                </div>
                <p className="font-uthmani text-lg text-[#2C1810] dark:text-gray-200 text-right leading-loose">
                  {item.arabic}
                </p>
              </div>
            ))}
          </div>
          <Link
            href={isMorning ? "/matsurat/pagi" : "/matsurat/petang"}
            className="block text-center text-[#1ABC9C] font-medium mt-4 py-2"
          >
            Lihat Semua →
          </Link>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
