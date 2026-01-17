// Quiz data for Juz 30 (Surah 78-114)

export interface QuizQuestion {
  id: number;
  type: 'verse-completion' | 'surah-identification' | 'meaning';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  arabicText?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  surah: string;
  ayah?: number;
}

// Juz 30 Quiz Questions - Mixed Difficulty
export const juz30Questions: QuizQuestion[] = [
  // ============ EASY QUESTIONS ============
  {
    id: 1,
    type: 'verse-completion',
    difficulty: 'easy',
    question: 'Lengkapi ayat berikut dari Surah Al-Fatihah:',
    arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ ...',
    options: ['نَسْتَعِينُ', 'نَسْتَغْفِرُ', 'نَتَوَكَّلُ', 'نَرْجُو'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" - Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.',
    surah: 'Al-Fatihah',
    ayah: 5
  },
  {
    id: 2,
    type: 'verse-completion',
    difficulty: 'easy',
    question: 'Lengkapi ayat berikut dari Surah Al-Ikhlas:',
    arabicText: 'قُلْ هُوَ اللَّهُ ...',
    options: ['أَحَدٌ', 'وَاحِدٌ', 'الْعَظِيمُ', 'الْكَبِيرُ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "قُلْ هُوَ اللَّهُ أَحَدٌ" - Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."',
    surah: 'Al-Ikhlas',
    ayah: 1
  },
  {
    id: 3,
    type: 'surah-identification',
    difficulty: 'easy',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
    options: ['Al-Kautsar', 'Al-Maun', 'Al-Fil', 'Quraisy'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat pertama dari Surah Al-Kautsar yang artinya "Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak."',
    surah: 'Al-Kautsar',
    ayah: 1
  },
  {
    id: 4,
    type: 'meaning',
    difficulty: 'easy',
    question: 'Berapa jumlah ayat dalam Surah Al-Ikhlas?',
    options: ['4 ayat', '3 ayat', '5 ayat', '6 ayat'],
    correctAnswer: 0,
    explanation: 'Surah Al-Ikhlas terdiri dari 4 ayat dan setara dengan sepertiga Al-Quran dalam keutamaannya.',
    surah: 'Al-Ikhlas'
  },
  {
    id: 5,
    type: 'meaning',
    difficulty: 'easy',
    question: 'Apa nama lain dari Surah Al-Masad?',
    options: ['Al-Lahab', 'An-Nar', 'Al-Hutamah', 'Al-Jahim'],
    correctAnswer: 0,
    explanation: 'Surah Al-Masad juga dikenal dengan nama Al-Lahab karena menceritakan tentang Abu Lahab, paman Nabi yang menentang Islam.',
    surah: 'Al-Masad'
  },

  // ============ MEDIUM QUESTIONS ============
  {
    id: 6,
    type: 'verse-completion',
    difficulty: 'medium',
    question: 'Lengkapi ayat dari Surah Al-Qadr:',
    arabicText: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ ...',
    options: ['الْقَدْرِ', 'الْمُبَارَكَةِ', 'النِّصْفِ', 'الْجُمُعَةِ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ" - Sesungguhnya Kami telah menurunkannya (Al-Quran) pada malam kemuliaan.',
    surah: 'Al-Qadr',
    ayah: 1
  },
  {
    id: 7,
    type: 'verse-completion',
    difficulty: 'medium',
    question: 'Lengkapi ayat dari Surah At-Tin:',
    arabicText: 'وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ ...',
    options: ['سِينِينَ', 'سَيْنَاءَ', 'الطُّورِ', 'الْجَبَلِ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ" - Demi (buah) Tin dan (buah) Zaitun, dan demi gunung Sinai.',
    surah: 'At-Tin',
    ayah: 2
  },
  {
    id: 8,
    type: 'surah-identification',
    difficulty: 'medium',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'أَلْهَاكُمُ التَّكَاثُرُ ۝ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ',
    options: ['At-Takatsur', 'Al-Qariah', 'Al-Humazah', 'Al-Asr'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat 1-2 dari Surah At-Takatsur yang artinya "Bermegah-megahan telah melalaikan kamu, sampai kamu masuk ke dalam kubur."',
    surah: 'At-Takatsur',
    ayah: 1
  },
  {
    id: 9,
    type: 'surah-identification',
    difficulty: 'medium',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ',
    options: ['Al-Humazah', 'Al-Masad', 'Al-Fil', 'Al-Maun'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat pertama dari Surah Al-Humazah yang artinya "Celakalah bagi setiap pengumpat dan pencela."',
    surah: 'Al-Humazah',
    ayah: 1
  },
  {
    id: 10,
    type: 'meaning',
    difficulty: 'medium',
    question: 'Dalam Surah Al-Qadr, Lailatul Qadr lebih baik dari berapa bulan?',
    options: ['1000 bulan', '100 bulan', '500 bulan', '10000 bulan'],
    correctAnswer: 0,
    explanation: 'Dalam Surah Al-Qadr ayat 3: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ" - Malam kemuliaan itu lebih baik dari seribu bulan.',
    surah: 'Al-Qadr',
    ayah: 3
  },
  {
    id: 11,
    type: 'meaning',
    difficulty: 'medium',
    question: 'Apa yang dimaksud "الْهُمَزَةِ لُّمَزَةٍ" dalam Surah Al-Humazah?',
    options: ['Pengumpat dan pencela', 'Pendusta dan pembohong', 'Pencuri dan perampok', 'Pembunuh dan penzalim'],
    correctAnswer: 0,
    explanation: 'Al-Humazah (pengumpat) adalah orang yang suka mengumpat di belakang, Al-Lumazah (pencela) adalah orang yang suka mencela di depan.',
    surah: 'Al-Humazah'
  },
  {
    id: 12,
    type: 'verse-completion',
    difficulty: 'medium',
    question: 'Lengkapi ayat dari Surah Ad-Duha:',
    arabicText: 'وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا ...',
    options: ['سَجَىٰ', 'يَغْشَىٰ', 'عَسْعَسَ', 'أَدْبَرَ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا سَجَىٰ" - Demi waktu Duha, dan demi malam apabila telah sunyi.',
    surah: 'Ad-Duha',
    ayah: 2
  },
  {
    id: 13,
    type: 'verse-completion',
    difficulty: 'medium',
    question: 'Lengkapi ayat dari Surah Al-Insyirah:',
    arabicText: 'أَلَمْ نَشْرَحْ لَكَ ...',
    options: ['صَدْرَكَ', 'قَلْبَكَ', 'أَمْرَكَ', 'ذِكْرَكَ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ" - Bukankah Kami telah melapangkan dadamu (Muhammad)?',
    surah: 'Al-Insyirah',
    ayah: 1
  },
  {
    id: 14,
    type: 'surah-identification',
    difficulty: 'medium',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    options: ['Al-Alaq', 'Al-Qalam', 'Al-Muzzammil', 'Al-Muddassir'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat pertama dari Surah Al-Alaq, ayat pertama yang diturunkan kepada Nabi Muhammad ﷺ.',
    surah: 'Al-Alaq',
    ayah: 1
  },
  {
    id: 15,
    type: 'meaning',
    difficulty: 'medium',
    question: 'Apa arti "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا" dalam Surah Al-Insyirah?',
    options: ['Sesungguhnya bersama kesulitan ada kemudahan', 'Sesungguhnya setelah kesulitan ada kemudahan', 'Sesungguhnya kesulitan akan berlalu', 'Sesungguhnya kemudahan akan datang'],
    correctAnswer: 0,
    explanation: 'Ayat ini menegaskan bahwa bersama (bukan setelah) kesulitan pasti ada kemudahan.',
    surah: 'Al-Insyirah',
    ayah: 5
  },

  // ============ HARD QUESTIONS ============
  {
    id: 16,
    type: 'verse-completion',
    difficulty: 'hard',
    question: 'Lengkapi ayat dari Surah An-Naba:',
    arabicText: 'عَمَّ يَتَسَاءَلُونَ ۝ عَنِ النَّبَإِ ...',
    options: ['الْعَظِيمِ', 'الْكَبِيرِ', 'الْمُبِينِ', 'الْحَقِّ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "عَمَّ يَتَسَاءَلُونَ ۝ عَنِ النَّبَإِ الْعَظِيمِ" - Tentang apakah mereka saling bertanya-tanya? Tentang berita besar.',
    surah: 'An-Naba',
    ayah: 2
  },
  {
    id: 17,
    type: 'verse-completion',
    difficulty: 'hard',
    question: 'Lengkapi ayat dari Surah Al-Infitar:',
    arabicText: 'إِذَا السَّمَاءُ انفَطَرَتْ ۝ وَإِذَا الْكَوَاكِبُ ...',
    options: ['انتَثَرَتْ', 'انكَدَرَتْ', 'انشَقَّتْ', 'انفَجَرَتْ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "إِذَا السَّمَاءُ انفَطَرَتْ ۝ وَإِذَا الْكَوَاكِبُ انتَثَرَتْ" - Apabila langit terbelah, dan apabila bintang-bintang jatuh berserakan.',
    surah: 'Al-Infitar',
    ayah: 2
  },
  {
    id: 18,
    type: 'verse-completion',
    difficulty: 'hard',
    question: 'Lengkapi ayat dari Surah At-Takwir:',
    arabicText: 'إِذَا الشَّمْسُ كُوِّرَتْ ۝ وَإِذَا النُّجُومُ ...',
    options: ['انكَدَرَتْ', 'انتَثَرَتْ', 'سُجِّرَتْ', 'انفَطَرَتْ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "إِذَا الشَّمْسُ كُوِّرَتْ ۝ وَإِذَا النُّجُومُ انكَدَرَتْ" - Apabila matahari digulung, dan apabila bintang-bintang berjatuhan.',
    surah: 'At-Takwir',
    ayah: 2
  },
  {
    id: 19,
    type: 'surah-identification',
    difficulty: 'hard',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'كَلَّا إِنَّ كِتَابَ الْفُجَّارِ لَفِي سِجِّينٍ',
    options: ['Al-Mutaffifin', 'Al-Infitar', 'At-Takwir', 'Al-Buruj'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat 7 dari Surah Al-Mutaffifin yang artinya "Sekali-kali tidak! Sesungguhnya catatan orang-orang durhaka benar-benar tersimpan dalam Sijjin."',
    surah: 'Al-Mutaffifin',
    ayah: 7
  },
  {
    id: 20,
    type: 'surah-identification',
    difficulty: 'hard',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ ۝ وَالْيَوْمِ الْمَوْعُودِ',
    options: ['Al-Buruj', 'At-Tariq', 'Al-Fajr', 'Asy-Syams'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat 1-2 dari Surah Al-Buruj yang artinya "Demi langit yang mempunyai gugusan bintang, dan demi hari yang dijanjikan."',
    surah: 'Al-Buruj',
    ayah: 1
  },
  {
    id: 21,
    type: 'surah-identification',
    difficulty: 'hard',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'وَالسَّمَاءِ وَالطَّارِقِ ۝ وَمَا أَدْرَاكَ مَا الطَّارِقُ ۝ النَّجْمُ الثَّاقِبُ',
    options: ['At-Tariq', 'Al-Buruj', 'An-Najm', 'Al-Fajr'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat 1-3 dari Surah At-Tariq yang artinya "Demi langit dan yang datang pada malam hari."',
    surah: 'At-Tariq',
    ayah: 1
  },
  {
    id: 22,
    type: 'meaning',
    difficulty: 'hard',
    question: 'Apa yang dimaksud "سِجِّينٍ" dalam Surah Al-Mutaffifin?',
    options: ['Kitab catatan orang durhaka di tempat paling bawah', 'Nama neraka', 'Nama malaikat', 'Nama hari kiamat'],
    correctAnswer: 0,
    explanation: 'Sijjin adalah kitab yang mencatat amal perbuatan orang-orang durhaka, berada di tempat paling bawah.',
    surah: 'Al-Mutaffifin'
  },
  {
    id: 23,
    type: 'meaning',
    difficulty: 'hard',
    question: 'Apa yang dimaksud "عِلِّيِّينَ" dalam Surah Al-Mutaffifin?',
    options: ['Kitab catatan orang baik di tempat paling tinggi', 'Nama surga', 'Nama malaikat', 'Tingkatan tertinggi surga'],
    correctAnswer: 0,
    explanation: 'Illiyyun adalah kitab yang mencatat amal perbuatan orang-orang baik, berada di tempat paling tinggi.',
    surah: 'Al-Mutaffifin'
  },
  {
    id: 24,
    type: 'verse-completion',
    difficulty: 'hard',
    question: 'Lengkapi ayat dari Surah Al-Ghasyiyah:',
    arabicText: 'هَلْ أَتَاكَ حَدِيثُ ...',
    options: ['الْغَاشِيَةِ', 'الْقَارِعَةِ', 'الْحَاقَّةِ', 'الْوَاقِعَةِ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ" - Sudahkah sampai kepadamu berita tentang hari pembalasan?',
    surah: 'Al-Ghasyiyah',
    ayah: 1
  },
  {
    id: 25,
    type: 'meaning',
    difficulty: 'hard',
    question: 'Dalam Surah Abasa, siapakah yang bermuka masam?',
    options: ['Nabi Muhammad ﷺ ketika didatangi Abdullah bin Ummi Maktum', 'Abu Lahab', 'Abu Jahal', 'Orang kafir Quraisy'],
    correctAnswer: 0,
    explanation: 'Surah Abasa turun berkaitan dengan peristiwa ketika Nabi ﷺ bermuka masam kepada Abdullah bin Ummi Maktum (seorang buta).',
    surah: 'Abasa'
  },
  {
    id: 26,
    type: 'surah-identification',
    difficulty: 'hard',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ ۝ فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا',
    options: ['Al-Insyiqaq', 'Al-Infitar', 'Al-Haqqah', 'Al-Qiyamah'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat 7-8 dari Surah Al-Insyiqaq tentang orang yang menerima kitab dari kanan.',
    surah: 'Al-Insyiqaq',
    ayah: 7
  },
  {
    id: 27,
    type: 'meaning',
    difficulty: 'hard',
    question: 'Surah apa yang merupakan wahyu pertama yang diturunkan kepada Nabi Muhammad ﷺ?',
    options: ['Al-Alaq (ayat 1-5)', 'Al-Fatihah', 'Al-Muddassir', 'Al-Muzzammil'],
    correctAnswer: 0,
    explanation: 'Lima ayat pertama Surah Al-Alaq adalah wahyu pertama yang diturunkan di Gua Hira.',
    surah: 'Al-Alaq'
  },
  {
    id: 28,
    type: 'verse-completion',
    difficulty: 'hard',
    question: 'Lengkapi ayat dari Surah Al-Fajr:',
    arabicText: 'وَالْفَجْرِ ۝ وَلَيَالٍ ...',
    options: ['عَشْرٍ', 'مُبَارَكَةٍ', 'قَدْرٍ', 'سَبْعٍ'],
    correctAnswer: 0,
    explanation: 'Ayat lengkapnya: "وَالْفَجْرِ ۝ وَلَيَالٍ عَشْرٍ" - Demi fajar, dan malam yang sepuluh.',
    surah: 'Al-Fajr',
    ayah: 2
  },
  {
    id: 29,
    type: 'meaning',
    difficulty: 'hard',
    question: 'Apa yang dimaksud "لَيَالٍ عَشْرٍ" dalam Surah Al-Fajr?',
    options: ['10 malam pertama Dzulhijjah', '10 malam terakhir Ramadhan', '10 malam pertama Muharram', '10 malam Lailatul Qadr'],
    correctAnswer: 0,
    explanation: 'Menurut mayoritas ulama, "malam yang sepuluh" merujuk pada 10 malam pertama bulan Dzulhijjah.',
    surah: 'Al-Fajr'
  },
  {
    id: 30,
    type: 'surah-identification',
    difficulty: 'hard',
    question: 'Ayat ini berasal dari surah apa?',
    arabicText: 'وَالشَّمْسِ وَضُحَاهَا ۝ وَالْقَمَرِ إِذَا تَلَاهَا',
    options: ['Asy-Syams', 'Al-Lail', 'Ad-Duha', 'Al-Fajr'],
    correctAnswer: 0,
    explanation: 'Ini adalah ayat 1-2 dari Surah Asy-Syams yang artinya "Demi matahari dan sinarnya pada pagi hari, dan demi bulan apabila mengiringinya."',
    surah: 'Asy-Syams',
    ayah: 1
  },
];

// Get random questions for quiz
export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...juz30Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get questions by type
export function getQuestionsByType(type: QuizQuestion['type']): QuizQuestion[] {
  return juz30Questions.filter(q => q.type === type);
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty: QuizQuestion['difficulty']): QuizQuestion[] {
  return juz30Questions.filter(q => q.difficulty === difficulty);
}

// Get mixed difficulty questions (balanced)
export function getMixedQuestions(count: number = 10): QuizQuestion[] {
  const easy = getQuestionsByDifficulty('easy').sort(() => Math.random() - 0.5);
  const medium = getQuestionsByDifficulty('medium').sort(() => Math.random() - 0.5);
  const hard = getQuestionsByDifficulty('hard').sort(() => Math.random() - 0.5);
  
  // Mix: 30% easy, 40% medium, 30% hard
  const easyCount = Math.ceil(count * 0.3);
  const mediumCount = Math.ceil(count * 0.4);
  const hardCount = count - easyCount - mediumCount;
  
  const selected = [
    ...easy.slice(0, easyCount),
    ...medium.slice(0, mediumCount),
    ...hard.slice(0, hardCount)
  ];
  
  return selected.sort(() => Math.random() - 0.5);
}
