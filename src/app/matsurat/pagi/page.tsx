"use client";

import { ArrowLeft, Sun } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const dzikirPagi = [
  {
    id: 1,
    title: "Ayat Kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    translation: "Allah, tidak ada Tuhan selain Dia, Yang Mahahidup, Yang terus menerus mengurus (makhluk-Nya). Dia tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka. Mereka tidak mengetahui sesuatu apa pun dari ilmu-Nya, kecuali apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dan Dia Mahatinggi, Mahabesar.",
    source: "Al-Baqarah: 255",
    count: "1x"
  },
  {
    id: 2,
    title: "Surah Al-Ikhlas",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    translation: "Katakanlah (Muhammad), 'Dialah Allah, Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan. Dan tidak ada sesuatu yang setara dengan Dia.'",
    source: "Al-Ikhlas: 1-4",
    count: "3x"
  },
  {
    id: 3,
    title: "Surah Al-Falaq",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    translation: "Katakanlah, 'Aku berlindung kepada Tuhan yang menguasai subuh, dari kejahatan (makhluk yang) Dia ciptakan, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul, dan dari kejahatan orang yang dengki apabila dia dengki.'",
    source: "Al-Falaq: 1-5",
    count: "3x"
  },
  {
    id: 4,
    title: "Surah An-Nas",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    translation: "Katakanlah, 'Aku berlindung kepada Tuhannya manusia, Raja manusia, sembahan manusia, dari kejahatan (bisikan) setan yang bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia.'",
    source: "An-Nas: 1-6",
    count: "3x"
  },
  {
    id: 5,
    title: "Doa Pagi",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـٰهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ",
    translation: "Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah. Segala puji bagi Allah. Tidak ada Tuhan yang berhak disembah kecuali Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya kerajaan dan milik-Nya segala pujian. Dia Mahakuasa atas segala sesuatu.",
    source: "HR. Abu Dawud",
    count: "1x"
  },
  {
    id: 6,
    title: "Sayyidul Istighfar",
    arabic: "اَللَّهُمَّ أَنْتَ رَبِّيْ لاَ إِلَـٰهَ إِلاَّ أَنْتَ، خَلَقْتَنِيْ وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوْذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوْءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوْءُ بِذَنْبِيْ فَاغْفِرْ لِيْ فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوْبَ إِلاَّ أَنْتَ",
    translation: "Ya Allah, Engkau adalah Tuhanku, tidak ada Tuhan yang berhak disembah kecuali Engkau. Engkau telah menciptakanku dan aku adalah hamba-Mu. Aku berada di atas perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan yang aku perbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku. Maka ampunilah aku, sesungguhnya tidak ada yang mengampuni dosa kecuali Engkau.",
    source: "HR. Bukhari",
    count: "1x"
  },
  {
    id: 7,
    title: "Doa Perlindungan",
    arabic: "بِسْمِ اللَّهِ الَّذِيْ لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيْعُ الْعَلِيْمُ",
    translation: "Dengan nama Allah yang dengan nama-Nya tidak ada sesuatu pun yang membahayakan di bumi maupun di langit. Dan Dia Maha Mendengar lagi Maha Mengetahui.",
    source: "HR. Abu Dawud & Tirmidzi",
    count: "3x"
  },
  {
    id: 8,
    title: "Ridha dengan Allah",
    arabic: "رَضِيْتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلاَمِ دِيْنًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    translation: "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad shallallahu 'alaihi wa sallam sebagai nabiku.",
    source: "HR. Abu Dawud & Tirmidzi",
    count: "3x"
  },
  {
    id: 9,
    title: "Tasbih Pagi",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    translation: "Mahasuci Allah dan segala puji bagi-Nya.",
    source: "HR. Muslim",
    count: "100x"
  },
  {
    id: 10,
    title: "Tahlil",
    arabic: "لاَ إِلَـٰهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ",
    translation: "Tidak ada Tuhan yang berhak disembah kecuali Allah semata, tidak ada sekutu bagi-Nya. Milik-Nya kerajaan dan segala pujian. Dia Mahakuasa atas segala sesuatu.",
    source: "HR. Bukhari & Muslim",
    count: "10x/100x"
  },
];

export default function MatsuratPagiPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-amber-400 to-orange-500 text-white">
        <div className="flex items-center gap-3 px-4 py-4 max-w-lg mx-auto">
          <Link href="/audio" className="p-2 -ml-2 rounded-full hover:bg-white/20">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <Sun size={24} />
            <div>
              <h1 className="text-lg font-bold">Ma'tsurat Pagi</h1>
              <p className="text-xs opacity-90">Setelah Subuh - Sebelum Dhuha</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {dzikirPagi.map((dzikir) => (
          <div key={dzikir.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#5D4E37] dark:text-white">{dzikir.title}</h3>
                <p className="text-xs text-[#8B7355] dark:text-gray-500">{dzikir.source}</p>
              </div>
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">
                {dzikir.count}
              </span>
            </div>
            
            <p className="font-uthmani text-xl text-[#2C1810] dark:text-gray-100 text-right leading-[2.5] mb-4">
              {dzikir.arabic}
            </p>
            
            <p className="text-sm text-[#5D4E37] dark:text-gray-400 leading-relaxed pt-3 border-t border-[#E8DFD5] dark:border-gray-700">
              {dzikir.translation}
            </p>
          </div>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}
