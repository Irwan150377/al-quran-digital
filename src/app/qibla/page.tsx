"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Navigation, MapPin, Loader } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function QiblaPage() {
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [heading, setHeading] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("Memuat lokasi...");

  // Koordinat Ka'bah di Mekah
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  // Hitung arah kiblat dari koordinat user
  const calculateQiblaDirection = (userLat: number, userLng: number) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const toDegrees = (rad: number) => (rad * 180) / Math.PI;

    const lat1 = toRadians(userLat);
    const lng1 = toRadians(userLng);
    const lat2 = toRadians(KAABA_LAT);
    const lng2 = toRadians(KAABA_LNG);

    const dLng = lng2 - lng1;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = toDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  // Hitung jarak ke Mekah (Haversine formula)
  const calculateDistance = (userLat: number, userLng: number) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371; // Radius bumi dalam km

    const dLat = toRadians(KAABA_LAT - userLat);
    const dLng = toRadians(KAABA_LNG - userLng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(userLat)) *
        Math.cos(toRadians(KAABA_LAT)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance);
  };

  // Get location name from coordinates
  const getLocationName = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`
      );
      const data = await response.json();
      const city = data.address?.city || data.address?.town || data.address?.village || "Indonesia";
      setLocationName(city);
    } catch {
      setLocationName("Lokasi Anda");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          const direction = calculateQiblaDirection(latitude, longitude);
          setQiblaDirection(direction);
          
          const dist = calculateDistance(latitude, longitude);
          setDistance(dist);
          
          getLocationName(latitude, longitude);
          setLoading(false);
        },
        (err) => {
          setError("Tidak dapat mengakses lokasi. Pastikan GPS aktif dan izinkan akses lokasi.");
          setLoading(false);
        }
      );
    } else {
      setError("Browser Anda tidak mendukung geolocation.");
      setLoading(false);
    }

    // Listen to device orientation for compass
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setHeading(360 - event.alpha);
        }
      };

      window.addEventListener("deviceorientation", handleOrientation);
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    }
  }, []);

  const compassRotation = heading - qiblaDirection;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FDF8F3] to-[#E8DFD5] dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-[#FDF8F3]/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-800">
            <ArrowLeft size={24} className="text-[#5D4E37] dark:text-gray-400" />
          </Link>
          <h1 className="text-xl font-bold text-[#5D4E37] dark:text-white">
            🧭 Arah Kiblat
          </h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="animate-spin text-[#1ABC9C] mb-4" size={48} />
            <p className="text-gray-600 dark:text-gray-400">Mendeteksi lokasi Anda...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            {/* Location Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm mb-6">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <MapPin size={18} className="text-[#1ABC9C]" />
                <span className="font-medium">{locationName}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Jarak ke Mekah: <span className="font-semibold text-[#1ABC9C]">{distance.toLocaleString()} km</span>
              </div>
            </div>

            {/* Compass */}
            <div className="relative aspect-square max-w-sm mx-auto mb-6">
              {/* Compass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1ABC9C] to-[#16A085] rounded-full shadow-2xl flex items-center justify-center">
                <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full shadow-inner"></div>
                
                {/* Compass Needle */}
                <div
                  className="absolute w-1 h-32 origin-bottom transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotate(${-compassRotation}deg)`,
                    bottom: "50%",
                  }}
                >
                  <div className="w-full h-1/2 bg-gradient-to-t from-red-600 to-red-400 rounded-t-full"></div>
                  <div className="w-full h-1/2 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-full"></div>
                </div>

                {/* Center Dot */}
                <div className="absolute w-4 h-4 bg-gray-800 dark:bg-gray-200 rounded-full shadow-lg"></div>

                {/* Direction Markers */}
                <div className="absolute inset-0">
                  {["U", "T", "S", "B"].map((dir, i) => (
                    <div
                      key={dir}
                      className="absolute text-sm font-bold text-gray-700 dark:text-gray-300"
                      style={{
                        top: i === 0 ? "8%" : i === 2 ? "88%" : "50%",
                        left: i === 1 ? "88%" : i === 3 ? "8%" : "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {dir}
                    </div>
                  ))}
                </div>

                {/* Ka'bah Icon */}
                <div
                  className="absolute text-2xl transition-transform duration-300"
                  style={{
                    transform: `rotate(${-compassRotation}deg) translateY(-80px)`,
                  }}
                >
                  🕋
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                <Navigation size={18} />
                Cara Menggunakan:
              </h3>
              <ol className="text-sm text-amber-800 dark:text-amber-300 space-y-1 list-decimal list-inside">
                <li>Pastikan GPS dan kompas HP aktif</li>
                <li>Pegang HP secara horizontal (datar)</li>
                <li>Putar badan hingga icon 🕋 menunjuk ke atas</li>
                <li>Arah tersebut adalah arah kiblat</li>
              </ol>
            </div>

            {/* Coordinates */}
            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>Ka'bah: {KAABA_LAT}° N, {KAABA_LNG}° E</p>
              {userLocation && (
                <p className="mt-1">
                  Anda: {userLocation.lat.toFixed(4)}° N, {userLocation.lng.toFixed(4)}° E
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
