"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

interface Verse {
  arabic: string;
  translation: string;
  surah: string;
  ayah: number;
}

// Sample verses for demo
const sampleVerses: Verse[] = [
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Sesungguhnya bersama kesulitan ada kemudahan.",
    surah: "Al-Insyirah",
    ayah: 6,
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translation: "Dan barangsiapa bertawakal kepada Allah, niscaya Allah akan mencukupkan (keperluan)nya.",
    surah: "At-Talaq",
    ayah: 3,
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    translation: "Maka ingatlah kepada-Ku, niscaya Aku akan mengingat kalian.",
    surah: "Al-Baqarah",
    ayah: 152,
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    translation: "Dan katakanlah: Ya Tuhanku, tambahkanlah ilmu kepadaku.",
    surah: "Taha",
    ayah: 114,
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat.",
    surah: "Al-Baqarah",
    ayah: 201,
  },
];

export default function DailyVerse() {
  const [verse, setVerse] = useState<Verse | null>(null);

  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * sampleVerses.length);
    setVerse(sampleVerses[randomIndex]);
  };

  useEffect(() => {
    getRandomVerse();
  }, []);

  if (!verse) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">
          ✨ Ayat Hari Ini
        </h3>
        <button
          onClick={getRandomVerse}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Ayat lainnya"
        >
          <RefreshCw size={18} className="text-gray-500" />
        </button>
      </div>

      <p className="font-arabic text-2xl text-gray-800 dark:text-gray-100 mb-4 leading-loose">
        {verse.arabic}
      </p>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 italic">
        "{verse.translation}"
      </p>

      <p className="text-xs text-[#1ABC9C] font-medium">
        QS. {verse.surah}: {verse.ayah}
      </p>
    </div>
  );
}
