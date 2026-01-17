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

  const fetchPrayerTimes = async (lat: number, lng: number, retryCount = 0) => {
    const maxRetries = 3;
    const methods = [2, 20, 3]; // Kemenag RI, ISNA, MWL
    
    try {
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      
      // Try different calculation methods
      for (const method of methods) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          
          const response = await fetch(
            `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=${method}`,
            { signal: controller.signal }
          );
          
          clearTimeout(timeoutId);
          
          if (!response.ok) continue;
          
          const data = await response.json();
          
          if (data.code === 200 && data.data && data.data.timings) {
            setPrayerTimes({
              Fajr: data.data.timings.Fajr.split(" ")[0],
              Sunrise: data.data.timings.Sunrise.split(" ")[0],
              Dhuhr: data.data.timings.Dhuhr.split(" ")[0],
              Asr: data.data.timings.Asr.split(" ")[0],
              Maghrib: data.data.timings.Maghrib.split(" ")[0],
              Isha: data.data.timings.Isha.split(" ")[0],
            });
            
            // Get location from reverse geocoding or timezone
            if (data.data.meta && data.data.meta.timezone) {
              const timezone = data.data.meta.timezone;
              const city = timezone.split("/").pop()?.replace(/_/g, " ") || "Indonesia";
              setLocation(city);
            } else {
              // Try to get city name from coordinates
              try {
                const geoResponse = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`
                );
                const geoData = await geoResponse.json();
                const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || "Indonesia";
                setLocation(city);
              } catch {
                setLocation("Indonesia");
              }
            }
            
            return; // Success, exit function
          }
        } catch (err) {
          console.log(`Method ${method} failed:`, err);
          continue; // Try next method
        }
      }
      
      // If all methods failed, retry with exponential backoff
      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms...`);
        setTimeout(() => {
          fetchPrayerTimes(lat, lng, retryCount + 1);
        }, delay);
      } else {
        throw new Error("All API attempts failed");
      }
      
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      // Use default Jakarta times only as last resort
      setPrayerTimes(defaultTimes);
      setLocation("Jakarta (Default)");
    }
  };

  const getLocation = () => {
    setLoading(true);
    
    // Check if running on HTTPS or localhost (required for geolocation)
    const isSecure = window.location.protocol === 'https:' || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('192.168');
    
    if ("geolocation" in navigator && isSecure) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation success:", position.coords.latitude, position.coords.longitude);
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
          setLoading(false);
        },
        (error) => {
          console.log("Geolocation error:", error.message, error.code);
          // Use default Jakarta coordinates
          fetchPrayerTimes(-6.2088, 106.8456);
          setLoading(false);
        },
        { 
          timeout: 10000, 
          enableHighAccuracy: false, // Changed to false for faster response
          maximumAge: 600000 // 10 minutes cache
        }
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
