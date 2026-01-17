"use client";

import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Play, Pause, Bookmark, ChevronLeft, ChevronRight, Volume2, SkipForward, RotateCcw } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState, useRef } from "react";
import { getSurahUthmani, getSurahTranslation, Ayah, Translation } from "@/lib/quran-data";
import { getSurahNameById } from "@/lib/surah-names";

// Qari options
const qaris = [
  { id: "ar.alafasy", name: "Misyari Alafasy", short: "Misyari" },
  { id: "ar.ahmedajamy", name: "Ahmed Al-Ajamy", short: "Al-Ajamy" },
];

// Convert number to Arabic numerals
function toArabicNumber(num: number): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
}

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const surahNumber = parseInt(id);
  const surahInfo = getSurahNameById(surahNumber);
  
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [fontSize, setFontSize] = useState(26);
  const [viewMode, setViewMode] = useState<'mushaf' | 'list'>('list');
  
  // Audio states
  const [selectedQari, setSelectedQari] = useState("ar.alafasy");
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showQariSelector, setShowQariSelector] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [uthmani, indo] = await Promise.all([
        getSurahUthmani(surahNumber),
        getSurahTranslation(surahNumber)
      ]);
      setAyahs(uthmani);
      setTranslations(indo);
      setLoading(false);
    }
    fetchData();
  }, [surahNumber]);

  // Play specific ayah
  const playAyah = (ayahNumber: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (playingAyah === ayahNumber && !isAutoPlay) {
      setPlayingAyah(null);
      return;
    }

    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${selectedQari}/${ayahNumber}.mp3`;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.onplay = () => setPlayingAyah(ayahNumber);
    audio.onended = () => {
      if (isAutoPlay) {
        // Find next ayah in current surah
        const currentAyahIndex = ayahs.findIndex(a => a.number === ayahNumber);
        if (currentAyahIndex < ayahs.length - 1) {
          const nextAyah = ayahs[currentAyahIndex + 1];
          playAyah(nextAyah.number);
        } else {
          setPlayingAyah(null);
          setIsAutoPlay(false);
        }
      } else {
        setPlayingAyah(null);
      }
    };
    audio.onerror = () => {
      setPlayingAyah(null);
      alert("Audio tidak tersedia");
    };
    
    audio.play();
  };

  // Play all from beginning or current
  const playAll = () => {
    if (ayahs.length > 0) {
      setIsAutoPlay(true);
      playAyah(ayahs[0].number);
    }
  };

  // Stop all audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlayingAyah(null);
    setIsAutoPlay(false);
  };

  // Skip to next ayah
  const skipNext = () => {
    if (playingAyah && ayahs.length > 0) {
      const currentIndex = ayahs.findIndex(a => a.number === playingAyah);
      if (currentIndex < ayahs.length - 1) {
        playAyah(ayahs[currentIndex + 1].number);
      }
    }
  };

  if (loading || !surahInfo) {
    return (
      <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
        <header className="sticky top-0 z-40 bg-[#FDF8F3]/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
            <Link href="/quran" className="p-2 -ml-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-800">
              <ArrowLeft size={24} className="text-[#5D4E37] dark:text-gray-400" />
            </Link>
            <div className="h-5 w-24 bg-[#E8DFD5] dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-10"></div>
          </div>
        </header>
        <div className="px-4 py-8 max-w-lg mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-[#E8DFD5] dark:bg-gray-700 rounded-2xl"></div>
            <div className="h-64 bg-[#E8DFD5] dark:bg-gray-700 rounded-2xl"></div>
          </div>
        </div>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FDF8F3]/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <Link href="/quran" className="p-2 -ml-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-800">
            <ArrowLeft size={24} className="text-[#5D4E37] dark:text-gray-400" />
          </Link>
          <div className="text-center">
            <h1 className="font-semibold text-[#5D4E37] dark:text-white">
              {surahInfo.indonesia}
            </h1>
            <p className="text-xs text-[#8B7355] dark:text-gray-500">{surahInfo.arti}</p>
          </div>
          <button 
            onClick={() => setShowQariSelector(!showQariSelector)}
            className="p-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-800"
          >
            <Volume2 size={20} className="text-[#1ABC9C]" />
          </button>
        </div>
      </header>

      {/* Qari Selector Dropdown */}
      {showQariSelector && (
        <div className="sticky top-14 z-30 bg-white dark:bg-gray-800 border-b border-[#E8DFD5] dark:border-gray-700 shadow-lg">
          <div className="px-4 py-3 max-w-lg mx-auto">
            <p className="text-xs text-[#8B7355] dark:text-gray-400 mb-2">Pilih Qari:</p>
            <div className="flex gap-2">
              {qaris.map((qari) => (
                <button
                  key={qari.id}
                  onClick={() => {
                    setSelectedQari(qari.id);
                    setShowQariSelector(false);
                    if (playingAyah) {
                      stopAudio();
                    }
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedQari === qari.id
                      ? "bg-[#1ABC9C] text-white"
                      : "bg-[#E8DFD5] dark:bg-gray-700 text-[#5D4E37] dark:text-gray-300"
                  }`}
                >
                  {qari.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-4 max-w-lg mx-auto">
        {/* Surah Header */}
        <div className="relative bg-gradient-to-b from-[#1ABC9C] to-[#16A085] rounded-2xl p-6 mb-6 overflow-hidden">
          <div className="relative text-center text-white">
            <p className="text-sm opacity-80 mb-2">سُورَةُ</p>
            <h2 className="font-uthmani text-4xl mb-3">{surahInfo.arabic}</h2>
            <p className="text-sm opacity-90">{surahInfo.indonesia} - {surahInfo.arti}</p>
            <div className="flex justify-center gap-4 mt-3 text-xs opacity-75">
              <span>{surahInfo.type}</span>
              <span>•</span>
              <span>{surahInfo.ayat} Ayat</span>
            </div>
          </div>
        </div>

        {/* Settings Bar */}
        <div className="flex items-center justify-between mb-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(Math.max(20, fontSize - 2))}
              className="w-8 h-8 flex items-center justify-center bg-[#E8DFD5] dark:bg-gray-700 rounded-lg text-sm font-bold text-[#5D4E37] dark:text-gray-300"
            >
              A-
            </button>
            <span className="text-sm text-[#8B7355] dark:text-gray-500 w-10 text-center">{fontSize}</span>
            <button
              onClick={() => setFontSize(Math.min(40, fontSize + 2))}
              className="w-8 h-8 flex items-center justify-center bg-[#E8DFD5] dark:bg-gray-700 rounded-lg text-sm font-bold text-[#5D4E37] dark:text-gray-300"
            >
              A+
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'mushaf' ? 'list' : 'mushaf')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'mushaf' 
                  ? "bg-[#1ABC9C] text-white" 
                  : "bg-[#E8DFD5] dark:bg-gray-700 text-[#5D4E37] dark:text-gray-400"
              }`}
            >
              {viewMode === 'mushaf' ? '📖' : '📋'}
            </button>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                showTranslation 
                  ? "bg-[#1ABC9C] text-white" 
                  : "bg-[#E8DFD5] dark:bg-gray-700 text-[#5D4E37] dark:text-gray-400"
              }`}
            >
              🇮🇩
            </button>
          </div>
        </div>

        {/* Bismillah */}
        {surahNumber !== 9 && surahNumber !== 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm mb-4">
            <p className="font-uthmani text-[#2C1810] dark:text-gray-100" style={{ fontSize: `${fontSize}px` }}>
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Ayah List */}
        <div className="space-y-4">
          {ayahs.map((ayah, index) => (
            <div 
              key={ayah.number} 
              className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm transition-all ${
                playingAyah === ayah.number ? 'ring-2 ring-[#1ABC9C] bg-[#1ABC9C]/5' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 flex items-center justify-center bg-[#1ABC9C]/10 rounded-full text-[#1ABC9C] font-semibold">
                  {ayah.numberInSurah}
                </span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => playAyah(ayah.number)}
                    className={`p-2 rounded-full transition-colors ${
                      playingAyah === ayah.number 
                        ? 'bg-[#1ABC9C] text-white' 
                        : 'hover:bg-[#E8DFD5] dark:hover:bg-gray-700'
                    }`}
                  >
                    {playingAyah === ayah.number ? (
                      <Pause size={18} />
                    ) : (
                      <Play size={18} className="text-[#8B7355] dark:text-gray-500 ml-0.5" />
                    )}
                  </button>
                  <button className="p-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-700">
                    <Bookmark size={18} className="text-[#8B7355] dark:text-gray-500" />
                  </button>
                </div>
              </div>

              <p 
                className="font-uthmani text-[#2C1810] dark:text-gray-100 leading-[2.5] mb-4 text-right"
                style={{ fontSize: `${fontSize}px` }}
              >
                {ayah.text}
              </p>

              {showTranslation && translations[index] && (
                <p className="text-sm text-[#5D4E37] dark:text-gray-400 leading-relaxed pt-4 border-t border-[#E8DFD5] dark:border-gray-700">
                  {translations[index].text}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center py-6 mt-4">
          {surahNumber > 1 ? (
            <Link
              href={`/quran/${surahNumber - 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl text-sm font-medium text-[#5D4E37] dark:text-gray-300 hover:bg-[#E8DFD5] dark:hover:bg-gray-700 shadow-sm"
            >
              <ChevronLeft size={18} />
              Sebelumnya
            </Link>
          ) : <div></div>}
          
          {surahNumber < 114 && (
            <Link
              href={`/quran/${surahNumber + 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-[#1ABC9C] text-white rounded-xl text-sm font-medium hover:bg-[#16A085] shadow-sm"
            >
              Berikutnya
              <ChevronRight size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Audio Player Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t border-[#E8DFD5] dark:border-gray-700 shadow-lg z-30">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                playingAyah ? 'bg-[#1ABC9C] text-white' : 'bg-[#E8DFD5] dark:bg-gray-700 text-[#8B7355] dark:text-gray-400'
              }`}>
                {playingAyah ? (
                  <Volume2 size={20} className="animate-pulse" />
                ) : (
                  <Volume2 size={20} />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-[#5D4E37] dark:text-white">
                  {playingAyah ? `Ayat ${ayahs.find(a => a.number === playingAyah)?.numberInSurah || ''}` : 'Siap Diputar'}
                </p>
                <p className="text-xs text-[#8B7355] dark:text-gray-500">
                  {qaris.find(q => q.id === selectedQari)?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {playingAyah ? (
                <>
                  <button
                    onClick={stopAudio}
                    className="p-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-700"
                  >
                    <RotateCcw size={20} className="text-[#8B7355] dark:text-gray-400" />
                  </button>
                  <button
                    onClick={skipNext}
                    className="p-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-700"
                  >
                    <SkipForward size={20} className="text-[#8B7355] dark:text-gray-400" />
                  </button>
                  <button
                    onClick={stopAudio}
                    className="w-12 h-12 bg-[#1ABC9C] rounded-full flex items-center justify-center text-white"
                  >
                    <Pause size={24} />
                  </button>
                </>
              ) : (
                <button
                  onClick={playAll}
                  className="w-12 h-12 bg-[#1ABC9C] rounded-full flex items-center justify-center text-white"
                >
                  <Play size={24} className="ml-1" />
                </button>
              )}
            </div>
          </div>
          
          {/* Auto-play indicator */}
          {isAutoPlay && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-[#E8DFD5] dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1ABC9C] transition-all duration-300"
                  style={{ 
                    width: `${((ayahs.findIndex(a => a.number === playingAyah) + 1) / ayahs.length) * 100}%` 
                  }}
                />
              </div>
              <span className="text-xs text-[#8B7355] dark:text-gray-500">
                {ayahs.findIndex(a => a.number === playingAyah) + 1}/{ayahs.length}
              </span>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
