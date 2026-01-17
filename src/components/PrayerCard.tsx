"use client";

import { Clock, MapPin, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [location, setLocation] = useState<string>("Jakarta");
  const [loading, setLoading] = useState(false);

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=20`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        setPrayerTimes({
          Fajr: data.data.timings.Fajr.split(" ")[0],
          Sunrise: data.data.timings.Sunrise.split(" ")[0],
          Dhuhr: data.data.timings.Dhuhr.split(" ")[0],
          Asr: data.data.timings.Asr.split(" ")[0],
          Maghrib: data.data.timings.Maghrib.split(" ")[0],
          Isha: data.data.timings.Isha.split(" ")[0],
        });
        
        // Get city name from timezone
        const timezone = data.data.meta.timezone || "Asia/Jakarta";
        const city = timezone.split("/").pop()?.replace(/_/g, " ") || "Jakarta";
        setLocation(city);
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  const getLocation = () => {
    setLoading(true);
    
    // Check if running on HTTPS or localhost (required for geolocation)
    const isSecure = window.location.protocol === 'https:' || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';
    
    if ("geolocation" in navigator && isSecure) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
          setLoading(false);
        },
        (error) => {
          console.log("Geolocation error:", error.message);
          // Use default Jakarta coordinates
          fetchPrayerTimes(-6.2088, 106.8456);
          setLoading(false);
        },
        { timeout: 15000, enableHighAccuracy: true, maximumAge: 300000 }
      );
    } else {
      // Fallback to Jakarta - geolocation not available or not secure context
      console.log("Using default location (Jakarta) - geolocation requires HTTPS");
      fetchPrayerTimes(-6.2088, 106.8456);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
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
    <div className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 opacity-90">
          <MapPin size={16} />
          <span className="text-sm">{location}, Indonesia</span>
        </div>
        <button 
          onClick={getLocation}
          disabled={loading}
          className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
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
  );
}
