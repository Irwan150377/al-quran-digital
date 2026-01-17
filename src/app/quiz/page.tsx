"use client";

import BottomNav from "@/components/BottomNav";
import { Trophy, Star, Target, Clock, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-[#FDF8F3]/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-[#5D4E37] dark:text-white">
            🎯 Kuis Juz 30
          </h1>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
        {/* Stats Card */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Trophy size={32} />
            <div>
              <p className="text-sm opacity-90">Total Skor Anda</p>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs opacity-80">Kuis Selesai</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0%</p>
              <p className="text-xs opacity-80">Akurasi</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs opacity-80">Hari Streak</p>
            </div>
          </div>
        </div>

        {/* Start Quiz Button */}
        <Link
          href="/quiz/play"
          className="block bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-2xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Star size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Mulai Kuis</h3>
                <p className="text-sm opacity-90">10 soal • Juz 30</p>
              </div>
            </div>
            <ChevronRight size={24} />
          </div>
        </Link>

        {/* Quiz Categories */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Kategori Kuis
          </h2>
          <div className="space-y-3">
            <Link
              href="/quiz/play"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-[#F5EFE7] dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <Target size={24} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#5D4E37] dark:text-white">
                  Melengkapi Ayat
                </h3>
                <p className="text-sm text-[#8B7355] dark:text-gray-500">Lengkapi ayat yang hilang</p>
              </div>
              <ChevronRight size={20} className="text-[#8B7355]" />
            </Link>

            <Link
              href="/quiz/play"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-[#F5EFE7] dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#5D4E37] dark:text-white">
                  Identifikasi Surah
                </h3>
                <p className="text-sm text-[#8B7355] dark:text-gray-500">Tebak nama surah dari ayat</p>
              </div>
              <ChevronRight size={20} className="text-[#8B7355]" />
            </Link>

            <Link
              href="/quiz/play"
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-[#F5EFE7] dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Trophy size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#5D4E37] dark:text-white">
                  Makna & Arti
                </h3>
                <p className="text-sm text-[#8B7355] dark:text-gray-500">Pahami arti ayat Al-Quran</p>
              </div>
              <ChevronRight size={20} className="text-[#8B7355]" />
            </Link>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Tingkat Kesulitan
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/quiz/play" className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl text-center hover:scale-105 transition-transform">
              <p className="text-2xl mb-1">🌱</p>
              <p className="font-medium text-green-700 dark:text-green-400 text-sm">Pemula</p>
            </Link>
            <Link href="/quiz/play" className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-center hover:scale-105 transition-transform">
              <p className="text-2xl mb-1">🌿</p>
              <p className="font-medium text-amber-700 dark:text-amber-400 text-sm">Menengah</p>
            </Link>
            <Link href="/quiz/play" className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl text-center hover:scale-105 transition-transform">
              <p className="text-2xl mb-1">🌳</p>
              <p className="font-medium text-red-700 dark:text-red-400 text-sm">Mahir</p>
            </Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
