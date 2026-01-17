"use client";

import { Clock, MapPin, Settings } from "lucide-react";
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

const prayerNames: Record<string, string> = {
  Fajr: "Subuh",
  Sunrise: "Terbit",
  Dhuhr: "Dzuhur",
  Asr: "Ashar",
  Maghrib: "Maghrib",
  Isha: "Isya",
};

// Default prayer times for Jakarta
const defaultTimes: PrayerTimes = {
  Fajr: "04:35",
  Sunrise: "05:50",
  Dhuhr: "11:55",
  Asr: "15:15",
  Maghrib: "17:55",
  Isha: "19:05",
};

export default function PrayerCard() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(defaultTimes);
  const [nextPrayer, setNextPrayer] = useState<string>("Dzuhur");
  const [countdown, setCountdown] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPrayerTimes = async (city: City) => {
    setLoading(true);
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      // Use Kemenag RI method (method 2) for Indonesia
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${city.lat}&longitude=${city.lng}&method=2`
      );
      
      const data = await response.json();
      
      if (data.code === 200 && data.data && data.data.timings) {
        // Get saved adjustments
        const savedAdjustments = localStorage.getItem("prayerAdjustments");
        const adjustments = savedAdjustments ? JSON.parse(savedAdjustments) : {
          Fajr: -19, Dhuhr: 3, Asr: 3, Maghrib: 2, Isha: 16
        };

        // Apply adjustments to prayer times
        const applyAdjustment = (timeStr: string, adjustment: number) => {
          const [hours, minutes] = timeStr.split(":").map(Number);
          let totalMinutes = hours * 60 + minutes + adjustment;
          
          // Handle negative minutes (wrap to previous day)
          if (totalMinutes < 0) {
            totalMinutes = 1440 + totalMinutes; // 1440 = 24 hours in minutes
          }
          
          // Handle overflow (wrap to next day)
          if (totalMinutes >= 1440) {
            totalMinutes = totalMinutes - 1440;
          }
          
          const adjustedHours = Math.floor(totalMinutes / 60);
          const adjustedMinutes = totalMinutes % 60;
          return `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
        };

        setPrayerTimes({
          Fajr: applyAdjustment(data.data.timings.Fajr.split(" ")[0], adjustments.Fajr),
          Sunrise: data.data.timings.Sunrise.split(" ")[0],
          Dhuhr: applyAdjustment(data.data.timings.Dhuhr.split(" ")[0], adjustments.Dhuhr),
          Asr: applyAdjustment(data.data.timings.Asr.split(" ")[0], adjustments.Asr),
          Maghrib: applyAdjustment(data.data.timings.Maghrib.split(" ")[0], adjustments.Maghrib),
          Isha: applyAdjustment(data.data.timings.Isha.split(" ")[0], adjustments.Isha),
        });
        
        setSelectedCity(city);
        // Save to localStorage
        localStorage.setItem("selectedCity", JSON.stringify(city));
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    } finally {
      setLoading(false);
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
    const updateNextPrayer = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      
      for (const prayer of prayers) {
        const timeStr = prayerTimes[prayer as keyof PrayerTimes];
        if (!timeStr) continue;
        
        const [hours, minutes] = timeStr.split(":").map(Number);
        const prayerMinutes = hours * 60 + minutes;

        if (prayerMinutes > currentMinutes) {
          setNextPrayer(prayer);
          const diff = prayerMinutes - currentMinutes;
          const h = Math.floor(diff / 60);
          const m = diff % 60;
          setCountdown(h > 0 ? `${h} jam ${m} menit lagi` : `${m} menit lagi`);
          return;
        }
      }

      // After Isha, next is Fajr tomorrow
      setNextPrayer("Fajr");
      setCountdown("Besok");
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <>
      <div className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 opacity-90">
            <MapPin size={16} />
            <span className="text-sm">{selectedCity?.name || "Pilih Kota"}, Indonesia</span>
          </div>
          <button 
            onClick={() => setShowCityModal(true)}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            title="Ganti Kota"
          >
            <Settings size={16} />
          </button>
        </div>
        
        <div className="mb-2">
          <p className="text-sm opacity-80">Waktu sholat berikutnya</p>
          <h2 className="text-2xl font-bold">
            {prayerNames[nextPrayer]} - {prayerTimes[nextPrayer as keyof PrayerTimes]}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span className="text-sm">{countdown}</span>
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
    </>
  );
}
