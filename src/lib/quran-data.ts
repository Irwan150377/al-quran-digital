// Quran API helper functions

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

export interface Translation {
  number: number;
  text: string;
  numberInSurah: number;
}

// Fetch all surahs list
export async function getAllSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    return [];
  }
}

// Fetch surah with Uthmani text
export async function getSurahUthmani(surahNumber: number): Promise<Ayah[]> {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
    const data = await response.json();
    return data.data.ayahs;
  } catch (error) {
    console.error('Error fetching surah:', error);
    return [];
  }
}

// Fetch Indonesian translation
export async function getSurahTranslation(surahNumber: number): Promise<Translation[]> {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/id.indonesian`);
    const data = await response.json();
    return data.data.ayahs;
  } catch (error) {
    console.error('Error fetching translation:', error);
    return [];
  }
}

// Fetch surah info
export async function getSurahInfo(surahNumber: number): Promise<Surah | null> {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching surah info:', error);
    return null;
  }
}
