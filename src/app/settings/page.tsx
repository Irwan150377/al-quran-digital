"use client";

import { ArrowLeft, User, Info, Heart, MapPin, Star, Clock, Plus, Minus } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [adjustments, setAdjustments] = useState({
    Fajr: -19,
    Dhuhr: 3,
    Asr: 3,
    Maghrib: 2,
    Isha: 3
  });

  useEffect(() => {
    // Load saved adjustments from localStorage
    const saved = localStorage.getItem("prayerAdjustments");
    if (saved) {
      setAdjustments(JSON.parse(saved));
    }
  }, []);

  const updateAdjustment = (prayer: string, change: number) => {
    const newAdjustments = {
      ...adjustments,
      [prayer]: adjustments[prayer as keyof typeof adjustments] + change
    };
    setAdjustments(newAdjustments);
    localStorage.setItem("prayerAdjustments", JSON.stringify(newAdjustments));
  };

  const resetAdjustments = () => {
    const defaultAdjustments = { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 };
    setAdjustments(defaultAdjustments);
    localStorage.setItem("prayerAdjustments", JSON.stringify(defaultAdjustments));
  };

  const formatAdjustment = (minutes: number) => {
    if (minutes === 0) return "0 min";
    return minutes > 0 ? `+${minutes} min` : `${minutes} min`;
  };
  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-[#FDF8F3]/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-800">
            <ArrowLeft size={24} className="text-[#5D4E37] dark:text-gray-400" />
          </Link>
          <h1 className="text-xl font-bold text-[#5D4E37] dark:text-white">
            ⚙️ Pengaturan
          </h1>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
        {/* App Info */}
        <div className="bg-gradient-to-br from-[#1ABC9C] to-[#16A085] rounded-2xl p-6 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📖</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Al-Quran Digital</h2>
          <p className="text-sm opacity-90 mb-2">Versi 1.0</p>
          <div className="flex items-center justify-center gap-1 text-amber-300">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
        </div>

        {/* Prayer Time Adjustment */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Penyesuaian Waktu Sholat
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-[#1ABC9C]" />
              <div>
                <h4 className="font-medium text-[#5D4E37] dark:text-white">Sesuaikan Waktu</h4>
                <p className="text-xs text-[#8B7355] dark:text-gray-400">
                  Sesuaikan dengan jadwal masjid lokal Anda
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {Object.entries(adjustments).map(([prayer, minutes]) => (
                <div key={prayer} className="flex items-center justify-between">
                  <span className="text-[#5D4E37] dark:text-gray-300 font-medium">
                    {prayer === 'Fajr' ? 'Subuh' : 
                     prayer === 'Dhuhr' ? 'Dzuhur' : 
                     prayer === 'Asr' ? 'Ashar' : 
                     prayer === 'Maghrib' ? 'Maghrib' : 'Isya'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateAdjustment(prayer, -1)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-16 text-center text-sm font-mono text-[#1ABC9C] font-medium">
                      {formatAdjustment(minutes)}
                    </span>
                    <button 
                      onClick={() => updateAdjustment(prayer, 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={resetAdjustments}
                className="w-full bg-[#1ABC9C] text-white py-2 px-4 rounded-lg hover:bg-[#16A085] transition-colors text-sm font-medium"
              >
                Reset ke Default
              </button>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Developer
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1ABC9C] to-[#16A085] rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#5D4E37] dark:text-white">Irwan Darma</h3>
                  <div className="flex items-center gap-1 text-[#8B7355] dark:text-gray-400 text-sm">
                    <MapPin size={14} />
                    <span>Duri, Riau - Indonesia</span>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        </div>

        {/* About App */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Tentang Aplikasi
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-[#1ABC9C] mt-0.5" />
              <div>
                <h4 className="font-medium text-[#5D4E37] dark:text-white">Deskripsi</h4>
                <p className="text-sm text-[#8B7355] dark:text-gray-400">
                  Aplikasi Al-Quran Digital dengan fitur lengkap: Mushaf Utsmani, Audio Murottal, Waktu Sholat, Ma'tsurat, dan Kuis Juz 30.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Heart size={20} className="text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-[#5D4E37] dark:text-white">Tujuan</h4>
                <p className="text-sm text-[#8B7355] dark:text-gray-400">
                  Memudahkan umat Islam dalam membaca Al-Quran, menghafal, dan beribadah sehari-hari.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Fitur Aplikasi
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <ul className="space-y-3 text-sm text-[#5D4E37] dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-[#1ABC9C]">✓</span>
                Al-Quran 30 Juz dengan teks Utsmani
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1ABC9C]">✓</span>
                Terjemahan Bahasa Indonesia
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1ABC9C]">✓</span>
                Audio Murottal per Ayat
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1ABC9C]">✓</span>
                Jadwal Waktu Sholat
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1ABC9C]">✓</span>
                Ma'tsurat Pagi & Petang
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1ABC9C]">✓</span>
                Kuis Hafalan Juz 30
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1ABC9C]">✓</span>
                PWA - Bisa di-install
              </li>
            </ul>
          </div>
        </div>

        {/* Credits */}
        <div>
          <h2 className="text-sm font-semibold text-[#8B7355] dark:text-gray-400 mb-3 uppercase tracking-wide">
            Sumber Data
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm text-sm text-[#5D4E37] dark:text-gray-400 space-y-2">
            <p>• Al-Quran API: AlQuran.cloud</p>
            <p>• Audio: Islamic Network CDN</p>
            <p>• Waktu Sholat: Aladhan API</p>
            <p>• Font Arab: Amiri Quran (Google Fonts)</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-sm text-[#8B7355] dark:text-gray-500">
            Dibuat dengan ❤️ untuk umat Islam
          </p>
          <p className="text-xs text-[#8B7355] dark:text-gray-600 mt-1">
            © 2026 Irwan Darma - Duri, Riau
          </p>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
