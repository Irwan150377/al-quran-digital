"use client";

import BottomNav from "@/components/BottomNav";
import { MapPin, Compass, Navigation, Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const prayerList = [
  { key: "Fajr", name: "Subuh", icon: "🌙" },
  { key: "Sunrise", name: "Terbit", icon: "🌅" },
  { key: "Dhuhr", name: "Dzuhur", icon: "☀️" },
  { key: "Asr", name: "Ashar", icon: "🌤️" },
  { key: "Maghrib", name: "Maghrib", icon: "🌇" },
  { key: "Isha", name: "Isya", icon: "🌃" },
];

export default function PrayerPage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState("Memuat...");
  const [currentPrayer, setCurrentPrayer] = useState("");
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const today = new Date();
            const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
            
            const response = await fetch(
              `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=20`
            );
            const data = await response.json();
            
            if (data.code === 200) {
              setPrayerTimes(data.data.timings);
              setLocation(data.data.meta.timezone.split("/")[1]?.replace("_", " ") || "Indonesia");
              setHijriDate(`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year} H`);
            }
          } catch {
            setPrayerTimes({
              Fajr: "04:45", Sunrise: "05:58", Dhuhr: "12:10",
              Asr: "15:30", Maghrib: "18:15", Isha: "19:30",
            });
            setLocation("Jakarta");
            setHijriDate("15 Rajab 1447 H");
          }
        },
        () => {
          setPrayerTimes({
            Fajr: "04:45", Sunrise: "05:58", Dhuhr: "12:10",
            Asr: "15:30", Maghrib: "18:15", Isha: "19:30",
          });
          setLocation("Jakarta");
          setHijriDate("15 Rajab 1447 H");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    
    for (let i = prayers.length - 1; i >= 0; i--) {
      const [h, m] = prayerTimes[prayers[i] as keyof PrayerTimes].split(":").map(Number);
      if (currentMinutes >= h * 60 + m) {
        setCurrentPrayer(prayers[i]);
        break;
      }
    }
  }, [prayerTimes]);

  const isPassed = (prayerKey: string) => {
    if (!prayerTimes) return false;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [h, m] = prayerTimes[prayerKey as keyof PrayerTimes].split(":").map(Number);
    return currentMinutes > h * 60 + m;
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            🕌 Waktu Sholat
          </h1>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        {/* Location Card */}
        <div className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} />
            <span className="font-medium">{location}, Indonesia</span>
          </div>
          <p className="text-sm opacity-90">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-sm opacity-75">{hijriDate}</p>
        </div>

        {/* Prayer Times List */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
          {prayerList.map((prayer, index) => {
            const time = prayerTimes?.[prayer.key as keyof PrayerTimes] || "--:--";
            const passed = isPassed(prayer.key);
            const isCurrent = currentPrayer === prayer.key;

            return (
              <div
                key={prayer.key}
                className={`flex items-center justify-between p-4 ${
                  index !== prayerList.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""
                } ${isCurrent ? "bg-[#1ABC9C]/10" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{prayer.icon}</span>
                  <div>
                    <p className={`font-semibold ${passed && !isCurrent ? "text-gray-400" : "text-gray-800 dark:text-white"}`}>
                      {prayer.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-mono ${isCurrent ? "text-[#1ABC9C] font-bold" : passed ? "text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>
                    {time}
                  </span>
                  {passed && !isCurrent && (
                    <Check size={18} className="text-green-500" />
                  )}
                  {isCurrent && (
                    <Clock size={18} className="text-[#1ABC9C]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Compass size={24} className="text-[#1ABC9C]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Arah Kiblat</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Navigation size={24} className="text-[#1ABC9C]" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Cari Masjid</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
