"use client";

import BottomNav from "@/components/BottomNav";
import { MapPin, Compass, Navigation, Check, Clock, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { indonesiaCities, type City } from "@/lib/indonesia-cities";

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
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState("");
  const [hijriDate, setHijriDate] = useState("");

  const fetchPrayerTimes = async (city: City) => {
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${city.lat}&longitude=${city.lng}&method=2`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setSelectedCity(city);
        setHijriDate(`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year} H`);
        // Save to localStorage
        localStorage.setItem("selectedCity", JSON.stringify(city));
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      setPrayerTimes({
        Fajr: "04:45", Sunrise: "05:58", Dhuhr: "12:10",
        Asr: "15:30", Maghrib: "18:15", Isha: "19:30",
      });
      setHijriDate("15 Rajab 1447 H");
    }
  };

  const handleCitySelect = (city: City) => {
    fetchPrayerTimes(city);
    setShowCityModal(false);
    setSearchQuery("");
  };

  const filteredCities = indonesiaCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.province.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Load saved city from localStorage
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      const city = JSON.parse(savedCity) as City;
      setSelectedCity(city);
      fetchPrayerTimes(city);
    } else {
      // Default to Jakarta
      const jakarta = indonesiaCities.find(c => c.id === "jakarta");
      if (jakarta) {
        fetchPrayerTimes(jakarta);
      }
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="font-medium">{selectedCity?.name || "Pilih Kota"}, Indonesia</span>
            </div>
            <button 
              onClick={() => setShowCityModal(true)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title="Ganti Kota"
            >
              <Settings size={18} />
            </button>
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

      {/* City Selection Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Pilih Kota</h3>
              <input
                type="text"
                placeholder="Cari kota atau provinsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] text-gray-800"
                autoFocus
              />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {filteredCities.length > 0 ? (
                <div className="space-y-1">
                  {filteredCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className={`w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors ${
                        selectedCity?.id === city.id ? "bg-[#1ABC9C]/10 border-2 border-[#1ABC9C]" : ""
                      }`}
                    >
                      <div className="font-medium text-gray-800">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.province}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Kota tidak ditemukan
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  setShowCityModal(false);
                  setSearchQuery("");
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  );
}
