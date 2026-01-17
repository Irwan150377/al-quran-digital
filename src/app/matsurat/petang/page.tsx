"use client";

import { ArrowLeft, Moon } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

// Dzikir Petang berdasarkan hadits shahih
const dzikirPetang = [
  {
    id: 1,
    title: "Ayat Kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    translation: "Allah, tidak ada Tuhan selain Dia, Yang Mahahidup, Yang terus menerus mengurus makhluk-Nya. Dia tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan di bumi...",
    source: "Al-Baqarah: 255",
    hadits: "HR. An-Nasa'i dalam Amalul Yaum wal Lailah",
    count: "1x"
  },
  {
    id: 2,
    title: "Al-Ikhlas, Al-Falaq, An-Nas",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ...",
    translation: "Baca Surah Al-Ikhlas, Al-Falaq, dan An-Nas masing-masing 3 kali",
    source: "QS. Al-Ikhlas, Al-Falaq, An-Nas",
    hadits: "HR. Abu Dawud no. 5082, Tirmidzi no. 3575 - Shahih",
    count: "3x"
  },
  {
    id: 3,
    title: "Doa Petang",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا",
    translation: "Kami memasuki waktu petang dan kerajaan milik Allah. Segala puji bagi Allah. Tidak ada Tuhan kecuali Allah semata, tidak ada sekutu bagi-Nya...",
    source: "Dzikir Petang",
    hadits: "HR. Muslim no. 2723",
    count: "1x"
  },
  {
    id: 4,
    title: "Sayyidul Istighfar",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    translation: "Ya Allah, Engkau Tuhanku, tidak ada Tuhan kecuali Engkau. Engkau menciptakanku dan aku hamba-Mu. Aku berada di atas perjanjian-Mu semampuku...",
    source: "Dzikir Petang",
    hadits: "HR. Bukhari no. 6306",
    count: "1x"
  },
  {
    id: 5,
    title: "Doa Perlindungan",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    translation: "Dengan nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang membahayakan di bumi maupun di langit. Dia Maha Mendengar lagi Maha Mengetahui.",
    source: "Dzikir Petang",
    hadits: "HR. Abu Dawud no. 5088, Tirmidzi no. 3388 - Shahih",
    count: "3x"
  },
  {
    id: 6,
    title: "Ridha dengan Allah",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    translation: "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad ﷺ sebagai nabiku.",
    source: "Dzikir Petang",
    hadits: "HR. Abu Dawud no. 5072, Tirmidzi no. 3389 - Shahih",
    count: "3x"
  },
  {
    id: 7,
    title: "Doa Keselamatan",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
    translation: "Ya Allah, aku memohon keselamatan di dunia dan akhirat. Ya Allah, aku memohon ampunan dan keselamatan dalam agama, dunia, keluarga, dan hartaku.",
    source: "Dzikir Petang",
    hadits: "HR. Abu Dawud no. 5074, Ibnu Majah no. 3871 - Shahih",
    count: "1x"
  },
  {
    id: 8,
    title: "Tasbih Petang",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    translation: "Mahasuci Allah dan segala puji bagi-Nya.",
    source: "Dzikir Petang",
    hadits: "HR. Muslim no. 2692",
    count: "100x"
  },
  {
    id: 9,
    title: "Tahlil",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translation: "Tidak ada Tuhan kecuali Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya kerajaan dan segala pujian. Dia Mahakuasa atas segala sesuatu.",
    source: "Dzikir Petang",
    hadits: "HR. Bukhari no. 3293, Muslim no. 2691",
    count: "10x"
  },
  {
    id: 10,
    title: "Shalawat",
    arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ",
    translation: "Ya Allah, limpahkanlah shalawat dan salam kepada Nabi kami Muhammad.",
    source: "Dzikir Petang",
    hadits: "HR. Tirmidzi no. 484 - Shahih",
    count: "10x"
  },
];

export default function MatsuratPetangPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center gap-3 px-4 py-4 max-w-lg mx-auto">
          <Link href="/audio" className="p-2 -ml-2 rounded-full hover:bg-white/20">
            <ArrowLeft size={24} />
          </Link>
          <Moon size={24} />
          <div>
            <h1 className="text-lg font-bold">Ma'tsurat Petang</h1>
            <p className="text-xs opacity-90">Setelah Ashar - Sebelum Maghrib</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Info */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm text-indigo-800 dark:text-indigo-300">
            📖 Semua dzikir berdasarkan hadits shahih dari Bukhari, Muslim, Abu Dawud, dan Tirmidzi.
          </p>
        </div>

        {dzikirPetang.map((dzikir) => (
          <div key={dzikir.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#5D4E37] dark:text-white">{dzikir.title}</h3>
                <p className="text-xs text-[#8B7355] dark:text-gray-500">{dzikir.source}</p>
              </div>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium">
                {dzikir.count}
              </span>
            </div>
            
            <p className="font-uthmani text-xl text-[#2C1810] dark:text-gray-100 text-right leading-[2.5] mb-4">
              {dzikir.arabic}
            </p>
            
            <p className="text-sm text-[#5D4E37] dark:text-gray-400 leading-relaxed mb-3">
              {dzikir.translation}
            </p>
            
            <p className="text-xs text-[#1ABC9C] dark:text-[#1ABC9C] bg-[#1ABC9C]/10 px-3 py-1.5 rounded-lg inline-block">
              📚 {dzikir.hadits}
            </p>
          </div>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}
