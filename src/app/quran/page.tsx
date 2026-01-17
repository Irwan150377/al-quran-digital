"use client";

import BottomNav from "@/components/BottomNav";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { allSurahNames, SurahName } from "@/lib/surah-names";

export default function QuranPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = allSurahNames.filter(
    (surah) =>
      surah.indonesia.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.arti.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.id.toString().includes(searchQuery)
  );

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FDF8F3]/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-[#5D4E37] dark:text-white mb-3">
            📖 Al-Quran
          </h1>
          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7355]"
            />
            <input
              type="text"
              placeholder="Cari surah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] border border-[#E8DFD5] dark:border-gray-700"
            />
          </div>
        </div>
      </header>

      {/* Surah List */}
      <div className="px-4 py-4 max-w-lg mx-auto">
        <div className="space-y-2">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.id}
              href={`/quran/${surah.id}`}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-[#F5EFE7] dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#1ABC9C]/10 rounded-lg text-[#1ABC9C] font-semibold">
                {surah.id}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#5D4E37] dark:text-white">
                  {surah.indonesia}
                </h3>
                <p className="text-xs text-[#8B7355] dark:text-gray-500">
                  {surah.arti} • {surah.ayat} ayat • {surah.type}
                </p>
              </div>
              <p className="font-uthmani text-xl text-[#5D4E37] dark:text-gray-300">
                {surah.arabic}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
