// Database kota-kota di Indonesia dengan koordinat akurat
export interface City {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
}

export const indonesiaCities: City[] = [
  // Aceh
  { id: "banda-aceh", name: "Banda Aceh", province: "Aceh", lat: 5.5483, lng: 95.3238 },
  { id: "lhokseumawe", name: "Lhokseumawe", province: "Aceh", lat: 5.1801, lng: 97.1507 },
  
  // Sumatera Utara
  { id: "medan", name: "Medan", province: "Sumatera Utara", lat: 3.5952, lng: 98.6722 },
  { id: "pematangsiantar", name: "Pematangsiantar", province: "Sumatera Utara", lat: 2.9597, lng: 99.0687 },
  { id: "binjai", name: "Binjai", province: "Sumatera Utara", lat: 3.6001, lng: 98.4854 },
  
  // Sumatera Barat
  { id: "padang", name: "Padang", province: "Sumatera Barat", lat: -0.9471, lng: 100.4172 },
  { id: "bukittinggi", name: "Bukittinggi", province: "Sumatera Barat", lat: -0.3055, lng: 100.3693 },
  { id: "payakumbuh", name: "Payakumbuh", province: "Sumatera Barat", lat: -0.2166, lng: 100.6333 },
  
  // Riau
  { id: "pekanbaru", name: "Pekanbaru", province: "Riau", lat: 0.5071, lng: 101.4478 },
  { id: "dumai", name: "Dumai", province: "Riau", lat: 1.6812, lng: 101.4478 },
  { id: "duri", name: "Duri", province: "Riau", lat: 1.2333, lng: 101.4833 },
  { id: "bengkalis", name: "Bengkalis", province: "Riau", lat: 1.4719, lng: 102.0969 },
  
  // Kepulauan Riau
  { id: "batam", name: "Batam", province: "Kepulauan Riau", lat: 1.0456, lng: 104.0305 },
  { id: "tanjungpinang", name: "Tanjung Pinang", province: "Kepulauan Riau", lat: 0.9186, lng: 104.4586 },
  
  // Jambi
  { id: "jambi", name: "Jambi", province: "Jambi", lat: -1.6101, lng: 103.6131 },
  
  // Sumatera Selatan
  { id: "palembang", name: "Palembang", province: "Sumatera Selatan", lat: -2.9761, lng: 104.7754 },
  { id: "lubuklinggau", name: "Lubuklinggau", province: "Sumatera Selatan", lat: -3.2945, lng: 102.8614 },
  
  // Bengkulu
  { id: "bengkulu", name: "Bengkulu", province: "Bengkulu", lat: -3.8004, lng: 102.2655 },
  
  // Lampung
  { id: "bandarlampung", name: "Bandar Lampung", province: "Lampung", lat: -5.4292, lng: 105.2625 },
  { id: "metro", name: "Metro", province: "Lampung", lat: -5.1131, lng: 105.3067 },
  
  // Bangka Belitung
  { id: "pangkalpinang", name: "Pangkal Pinang", province: "Bangka Belitung", lat: -2.1316, lng: 106.1168 },
  
  // DKI Jakarta
  { id: "jakarta", name: "Jakarta", province: "DKI Jakarta", lat: -6.2088, lng: 106.8456 },
  
  // Jawa Barat
  { id: "bandung", name: "Bandung", province: "Jawa Barat", lat: -6.9175, lng: 107.6191 },
  { id: "bekasi", name: "Bekasi", province: "Jawa Barat", lat: -6.2383, lng: 106.9756 },
  { id: "bogor", name: "Bogor", province: "Jawa Barat", lat: -6.5950, lng: 106.8166 },
  { id: "depok", name: "Depok", province: "Jawa Barat", lat: -6.4025, lng: 106.7942 },
  { id: "cirebon", name: "Cirebon", province: "Jawa Barat", lat: -6.7063, lng: 108.5571 },
  { id: "tasikmalaya", name: "Tasikmalaya", province: "Jawa Barat", lat: -7.3274, lng: 108.2207 },
  
  // Banten
  { id: "serang", name: "Serang", province: "Banten", lat: -6.1204, lng: 106.1503 },
  { id: "tangerang", name: "Tangerang", province: "Banten", lat: -6.1781, lng: 106.6300 },
  { id: "tangerangselatan", name: "Tangerang Selatan", province: "Banten", lat: -6.2884, lng: 106.7161 },
  { id: "cilegon", name: "Cilegon", province: "Banten", lat: -6.0025, lng: 106.0188 },
  
  // Jawa Tengah
  { id: "semarang", name: "Semarang", province: "Jawa Tengah", lat: -6.9667, lng: 110.4167 },
  { id: "surakarta", name: "Surakarta (Solo)", province: "Jawa Tengah", lat: -7.5755, lng: 110.8243 },
  { id: "magelang", name: "Magelang", province: "Jawa Tengah", lat: -7.4797, lng: 110.2175 },
  { id: "pekalongan", name: "Pekalongan", province: "Jawa Tengah", lat: -6.8886, lng: 109.6753 },
  { id: "tegal", name: "Tegal", province: "Jawa Tengah", lat: -6.8694, lng: 109.1402 },
  
  // DI Yogyakarta
  { id: "yogyakarta", name: "Yogyakarta", province: "DI Yogyakarta", lat: -7.7956, lng: 110.3695 },
  
  // Jawa Timur
  { id: "surabaya", name: "Surabaya", province: "Jawa Timur", lat: -7.2575, lng: 112.7521 },
  { id: "malang", name: "Malang", province: "Jawa Timur", lat: -7.9797, lng: 112.6304 },
  { id: "kediri", name: "Kediri", province: "Jawa Timur", lat: -7.8167, lng: 112.0167 },
  { id: "blitar", name: "Blitar", province: "Jawa Timur", lat: -8.0983, lng: 112.1681 },
  { id: "mojokerto", name: "Mojokerto", province: "Jawa Timur", lat: -7.4664, lng: 112.4338 },
  { id: "madiun", name: "Madiun", province: "Jawa Timur", lat: -7.6298, lng: 111.5239 },
  { id: "probolinggo", name: "Probolinggo", province: "Jawa Timur", lat: -7.7543, lng: 113.2159 },
  
  // Bali
  { id: "denpasar", name: "Denpasar", province: "Bali", lat: -8.6705, lng: 115.2126 },
  
  // Nusa Tenggara Barat
  { id: "mataram", name: "Mataram", province: "Nusa Tenggara Barat", lat: -8.5833, lng: 116.1167 },
  { id: "bimacity", name: "Bima", province: "Nusa Tenggara Barat", lat: -8.4600, lng: 118.7267 },
  
  // Nusa Tenggara Timur
  { id: "kupang", name: "Kupang", province: "Nusa Tenggara Timur", lat: -10.1718, lng: 123.6075 },
  
  // Kalimantan Barat
  { id: "pontianak", name: "Pontianak", province: "Kalimantan Barat", lat: -0.0263, lng: 109.3425 },
  { id: "singkawang", name: "Singkawang", province: "Kalimantan Barat", lat: 0.9063, lng: 108.9896 },
  
  // Kalimantan Tengah
  { id: "palangkaraya", name: "Palangka Raya", province: "Kalimantan Tengah", lat: -2.2089, lng: 113.9139 },
  
  // Kalimantan Selatan
  { id: "banjarmasin", name: "Banjarmasin", province: "Kalimantan Selatan", lat: -3.3194, lng: 114.5906 },
  { id: "banjarbaru", name: "Banjarbaru", province: "Kalimantan Selatan", lat: -3.4542, lng: 114.8378 },
  
  // Kalimantan Timur
  { id: "samarinda", name: "Samarinda", province: "Kalimantan Timur", lat: -0.5022, lng: 117.1536 },
  { id: "balikpapan", name: "Balikpapan", province: "Kalimantan Timur", lat: -1.2379, lng: 116.8529 },
  { id: "bontang", name: "Bontang", province: "Kalimantan Timur", lat: 0.1333, lng: 117.5000 },
  
  // Kalimantan Utara
  { id: "tarakan", name: "Tarakan", province: "Kalimantan Utara", lat: 3.3000, lng: 117.6333 },
  
  // Sulawesi Utara
  { id: "manado", name: "Manado", province: "Sulawesi Utara", lat: 1.4748, lng: 124.8421 },
  { id: "bitung", name: "Bitung", province: "Sulawesi Utara", lat: 1.4404, lng: 125.1825 },
  
  // Sulawesi Tengah
  { id: "palu", name: "Palu", province: "Sulawesi Tengah", lat: -0.8999, lng: 119.8707 },
  
  // Sulawesi Selatan
  { id: "makassar", name: "Makassar", province: "Sulawesi Selatan", lat: -5.1477, lng: 119.4327 },
  { id: "parepare", name: "Parepare", province: "Sulawesi Selatan", lat: -4.0133, lng: 119.6267 },
  { id: "palopo", name: "Palopo", province: "Sulawesi Selatan", lat: -2.9926, lng: 120.1989 },
  
  // Sulawesi Tenggara
  { id: "kendari", name: "Kendari", province: "Sulawesi Tenggara", lat: -3.9450, lng: 122.5989 },
  { id: "baubau", name: "Baubau", province: "Sulawesi Tenggara", lat: -5.4667, lng: 122.6333 },
  
  // Gorontalo
  { id: "gorontalo", name: "Gorontalo", province: "Gorontalo", lat: 0.5435, lng: 123.0585 },
  
  // Sulawesi Barat
  { id: "mamuju", name: "Mamuju", province: "Sulawesi Barat", lat: -2.6739, lng: 118.8896 },
  
  // Maluku
  { id: "ambon", name: "Ambon", province: "Maluku", lat: -3.6954, lng: 128.1814 },
  { id: "tual", name: "Tual", province: "Maluku", lat: -5.6288, lng: 132.7524 },
  
  // Maluku Utara
  { id: "ternate", name: "Ternate", province: "Maluku Utara", lat: 0.7833, lng: 127.3667 },
  { id: "tidore", name: "Tidore", province: "Maluku Utara", lat: 0.6833, lng: 127.4000 },
  
  // Papua Barat
  { id: "manokwari", name: "Manokwari", province: "Papua Barat", lat: -0.8618, lng: 134.0640 },
  { id: "sorong", name: "Sorong", province: "Papua Barat", lat: -0.8833, lng: 131.2500 },
  
  // Papua
  { id: "jayapura", name: "Jayapura", province: "Papua", lat: -2.5333, lng: 140.7167 },
];

// Group cities by province for easier selection
export const citiesByProvince = indonesiaCities.reduce((acc, city) => {
  if (!acc[city.province]) {
    acc[city.province] = [];
  }
  acc[city.province].push(city);
  return acc;
}, {} as Record<string, City[]>);

// Get all provinces
export const provinces = Object.keys(citiesByProvince).sort();
