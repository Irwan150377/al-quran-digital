"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Loader, ExternalLink } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Mosque {
  id: string;
  name: string;
  address: string;
  distance: number;
  lat: number;
  lng: number;
  phone?: string;
}

export default function MosquePage() {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("Memuat lokasi...");

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371; // Radius bumi dalam km

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  // Get location name
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

  // Search mosques using Overpass API (OpenStreetMap)
  const searchMosques = async (lat: number, lng: number) => {
    try {
      // Search radius 5km
      const radius = 5000;
      
      const query = `
        [out:json];
        (
          node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
          way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
        );
        out body;
      `;

      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
      );
      
      const data = await response.json();
      
      const mosquesData: Mosque[] = data.elements
        .map((element: any) => {
          const mosqueLat = element.lat || element.center?.lat;
          const mosqueLng = element.lon || element.center?.lon;
          
          if (!mosqueLat || !mosqueLng) return null;

          const distance = calculateDistance(lat, lng, mosqueLat, mosqueLng);

          return {
            id: element.id.toString(),
            name: element.tags?.name || "Masjid",
            address: element.tags?.["addr:full"] || element.tags?.["addr:street"] || "Alamat tidak tersedia",
            distance: Math.round(distance * 1000), // Convert to meters
            lat: mosqueLat,
            lng: mosqueLng,
            phone: element.tags?.phone || element.tags?.["contact:phone"],
          };
        })
        .filter((m: Mosque | null) => m !== null)
        .sort((a: Mosque, b: Mosque) => a.distance - b.distance)
        .slice(0, 20); // Limit to 20 mosques

      setMosques(mosquesData);
      setLoading(false);
    } catch (err) {
      console.error("Error searching mosques:", err);
      setError("Gagal mencari masjid. Silakan coba lagi.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          getLocationName(latitude, longitude);
          searchMosques(latitude, longitude);
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
  }, []);

  const openInMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${name}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#FDF8F3] dark:bg-gray-900 pb-20">
      <header className="sticky top-0 z-40 bg-[#FDF8F3]/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-[#E8DFD5] dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-[#E8DFD5] dark:hover:bg-gray-800">
            <ArrowLeft size={24} className="text-[#5D4E37] dark:text-gray-400" />
          </Link>
          <h1 className="text-xl font-bold text-[#5D4E37] dark:text-white">
            🕌 Masjid Terdekat
          </h1>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="animate-spin text-[#1ABC9C] mb-4" size={48} />
            <p className="text-gray-600 dark:text-gray-400">Mencari masjid terdekat...</p>
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
            <div className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-2xl p-4 text-white shadow-lg mb-4">
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={18} />
                <span className="font-medium">{locationName}</span>
              </div>
              <p className="text-sm opacity-90">
                Ditemukan {mosques.length} masjid dalam radius 5 km
              </p>
            </div>

            {/* Mosques List */}
            {mosques.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-400">
                  Tidak ada masjid ditemukan di sekitar Anda
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {mosques.map((mosque, index) => (
                  <div
                    key={mosque.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">🕌</span>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {mosque.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {mosque.address}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Navigation size={14} className="text-[#1ABC9C]" />
                            {mosque.distance < 1000
                              ? `${mosque.distance} m`
                              : `${(mosque.distance / 1000).toFixed(1)} km`}
                          </span>
                          {mosque.phone && (
                            <a
                              href={`tel:${mosque.phone}`}
                              className="flex items-center gap-1 hover:text-[#1ABC9C]"
                            >
                              <Phone size={14} />
                              {mosque.phone}
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="flex-shrink-0 w-8 h-8 bg-[#1ABC9C] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => openInMaps(mosque.lat, mosque.lng, mosque.name)}
                      className="w-full mt-3 px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16A085] transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      Buka di Google Maps
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
