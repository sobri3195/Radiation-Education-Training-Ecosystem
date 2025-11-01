export interface UserProgress {
  xp: number;
  level: number;
  badges: string[];
  completedChallenges: string[];
  completedModules: string[];
  learningPath: string[];
  bookmarks: string[];
  reflections: Journal[];
  learningLog: LearningEntry[];
  customTheme: ThemeSettings;
  lastDailyChallenge: string;
}

export interface Journal {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

export interface LearningEntry {
  date: string;
  module: string;
  duration: number;
  topics: string[];
  score?: number;
}

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'high-contrast';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  lastReviewed?: string;
  nextReview?: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  description: string;
  patientAge: number;
  patientGender: string;
  diagnosis: string;
  stage: string;
  imaging: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    points: number;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

const STORAGE_KEYS = {
  USER_PROGRESS: 'radiate_user_progress',
  FLASHCARDS: 'radiate_flashcards',
  QUIZ_BANK: 'radiate_quiz_bank',
  CLINICAL_CASES: 'radiate_clinical_cases',
  ACHIEVEMENTS: 'radiate_achievements',
};

export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return defaultValue;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage:`, error);
  }
};

export const getUserProgress = (): UserProgress => {
  return getStorageItem<UserProgress>(STORAGE_KEYS.USER_PROGRESS, {
    xp: 0,
    level: 1,
    badges: [],
    completedChallenges: [],
    completedModules: [],
    learningPath: [],
    bookmarks: [],
    reflections: [],
    learningLog: [],
    customTheme: {
      mode: 'light',
      primaryColor: '#3b82f6',
      fontSize: 'medium',
    },
    lastDailyChallenge: '',
  });
};

export const updateUserProgress = (progress: Partial<UserProgress>): void => {
  const current = getUserProgress();
  const updated = { ...current, ...progress };
  setStorageItem(STORAGE_KEYS.USER_PROGRESS, updated);
};

export const addXP = (amount: number): { newXP: number; leveledUp: boolean; newLevel: number } => {
  const progress = getUserProgress();
  const newXP = progress.xp + amount;
  const oldLevel = progress.level;
  const newLevel = calculateLevel(newXP);
  const leveledUp = newLevel > oldLevel;
  
  updateUserProgress({ xp: newXP, level: newLevel });
  
  return { newXP, leveledUp, newLevel };
};

export const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return (currentLevel * currentLevel) * 100;
};

export const unlockAchievement = (achievementId: string): void => {
  const progress = getUserProgress();
  if (!progress.badges.includes(achievementId)) {
    const achievements = getAchievements();
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      achievement.unlockedAt = new Date().toISOString();
      updateUserProgress({ badges: [...progress.badges, achievementId] });
      setStorageItem(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    }
  }
};

export const getFlashcards = (): Flashcard[] => {
  return getStorageItem<Flashcard[]>(STORAGE_KEYS.FLASHCARDS, []);
};

export const saveFlashcard = (flashcard: Flashcard): void => {
  const flashcards = getFlashcards();
  const existingIndex = flashcards.findIndex(f => f.id === flashcard.id);
  
  if (existingIndex >= 0) {
    flashcards[existingIndex] = flashcard;
  } else {
    flashcards.push(flashcard);
  }
  
  setStorageItem(STORAGE_KEYS.FLASHCARDS, flashcards);
};

export const getQuizBank = (): QuizQuestion[] => {
  return getStorageItem<QuizQuestion[]>(STORAGE_KEYS.QUIZ_BANK, getDefaultQuizBank());
};

export const getClinicalCases = (): ClinicalCase[] => {
  return getStorageItem<ClinicalCase[]>(STORAGE_KEYS.CLINICAL_CASES, getDefaultClinicalCases());
};

export const getAchievements = (): Achievement[] => {
  return getStorageItem<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, getDefaultAchievements());
};

export const addLearningLog = (entry: Omit<LearningEntry, 'date'>): void => {
  const progress = getUserProgress();
  const newEntry: LearningEntry = {
    ...entry,
    date: new Date().toISOString(),
  };
  updateUserProgress({
    learningLog: [...progress.learningLog, newEntry],
  });
};

export const saveJournal = (journal: Omit<Journal, 'id' | 'date'>): void => {
  const progress = getUserProgress();
  const newJournal: Journal = {
    ...journal,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  updateUserProgress({
    reflections: [...progress.reflections, newJournal],
  });
};

function getDefaultQuizBank(): QuizQuestion[] {
  return [
    {
      id: '1',
      question: 'Apa yang dimaksud dengan radioterapi?',
      options: [
        'Pengobatan menggunakan obat kimia',
        'Pengobatan menggunakan radiasi untuk membunuh sel kanker',
        'Operasi pengangkatan tumor',
        'Terapi menggunakan hormon',
      ],
      correctAnswer: 1,
      explanation: 'Radioterapi adalah pengobatan kanker yang menggunakan radiasi berenergi tinggi untuk membunuh sel kanker atau menghentikan pertumbuhannya.',
      category: 'Dasar Radioterapi',
      difficulty: 'easy',
    },
    {
      id: '2',
      question: 'Berapa fraksi standar untuk radioterapi kanker payudara?',
      options: ['10 fraksi', '15-16 fraksi', '25-28 fraksi', '35-40 fraksi'],
      correctAnswer: 2,
      explanation: 'Standar radioterapi kanker payudara biasanya 25-28 fraksi (50-50.4 Gy), meskipun hipofraksinasi 15-16 fraksi juga semakin umum digunakan.',
      category: 'Protokol Terapi',
      difficulty: 'medium',
    },
    {
      id: '3',
      question: 'Apa kepanjangan dari IMRT?',
      options: [
        'Intensive Modulated Radiation Therapy',
        'Intensity Modulated Radiation Therapy',
        'Internal Modulated Radiation Therapy',
        'Integrated Modulated Radiation Therapy',
      ],
      correctAnswer: 1,
      explanation: 'IMRT adalah Intensity Modulated Radiation Therapy, teknik canggih yang memungkinkan variasi intensitas radiasi untuk membentuk dosis sesuai target.',
      category: 'Teknik Radioterapi',
      difficulty: 'easy',
    },
    {
      id: '4',
      question: 'Apa fungsi CT-Simulator dalam radioterapi?',
      options: [
        'Memberikan terapi radiasi',
        'Mengambil gambar untuk perencanaan terapi',
        'Mengukur dosis radiasi',
        'Memonitor pasien selama terapi',
      ],
      correctAnswer: 1,
      explanation: 'CT-Simulator digunakan untuk mengambil gambar CT dalam posisi treatment yang akan digunakan untuk perencanaan terapi radiasi.',
      category: 'Peralatan',
      difficulty: 'medium',
    },
    {
      id: '5',
      question: 'Apa itu BED (Biologically Effective Dose)?',
      options: [
        'Dosis total yang diberikan',
        'Dosis yang diperhitungkan dengan efek biologis radiasi',
        'Dosis maksimum yang aman',
        'Dosis minimal untuk membunuh tumor',
      ],
      correctAnswer: 1,
      explanation: 'BED adalah konsep untuk menghitung efek biologis radiasi dengan memperhitungkan ukuran fraksi dan α/β ratio jaringan.',
      category: 'Radiobiologi',
      difficulty: 'hard',
    },
  ];
}

function getDefaultClinicalCases(): ClinicalCase[] {
  return [
    {
      id: 'case-1',
      title: 'Kanker Payudara Stadium IIA',
      description: 'Pasien wanita 45 tahun dengan kanker payudara kiri T2N0M0, telah menjalani lumpektomi.',
      patientAge: 45,
      patientGender: 'Perempuan',
      diagnosis: 'Invasive Ductal Carcinoma',
      stage: 'IIA (T2N0M0)',
      imaging: 'Mammografi menunjukkan massa 3 cm di kuadran lateral atas',
      questions: [
        {
          question: 'Apa indikasi radioterapi pada kasus ini?',
          options: [
            'Tidak perlu radioterapi',
            'Radioterapi adjuvant whole breast',
            'Radioterapi paliatif',
            'Radioterapi preoperatif',
          ],
          correctAnswer: 1,
          explanation: 'Pasien post-lumpektomi memerlukan radioterapi adjuvant whole breast untuk mengurangi risiko rekurensi lokal.',
          points: 10,
        },
        {
          question: 'Berapa dosis standar yang direkomendasikan?',
          options: ['30 Gy dalam 10 fraksi', '40 Gy dalam 15 fraksi', '50 Gy dalam 25 fraksi', '60 Gy dalam 30 fraksi'],
          correctAnswer: 2,
          explanation: 'Dosis standar untuk whole breast radiotherapy adalah 50 Gy dalam 25 fraksi, dengan atau tanpa boost ke tumor bed.',
          points: 15,
        },
      ],
    },
    {
      id: 'case-2',
      title: 'Kanker Nasofaring Stadium III',
      description: 'Pasien laki-laki 50 tahun dengan massa nasofaring dan limfadenopati bilateral leher.',
      patientAge: 50,
      patientGender: 'Laki-laki',
      diagnosis: 'Undifferentiated Carcinoma of Nasopharynx',
      stage: 'III (T1N2M0)',
      imaging: 'MRI menunjukkan massa nasofaring dengan ekstensi ke fossa pterygoid dan multiple limfadenopati',
      questions: [
        {
          question: 'Modalitas terapi yang paling tepat?',
          options: [
            'Radioterapi saja',
            'Kemoterapi saja',
            'Kemoradioterapi konkuren',
            'Operasi',
          ],
          correctAnswer: 2,
          explanation: 'Standar terapi untuk kanker nasofaring stadium III adalah kemoradioterapi konkuren untuk meningkatkan kontrol lokal dan survival.',
          points: 15,
        },
        {
          question: 'Teknik radioterapi yang direkomendasikan?',
          options: ['2D-RT', '3D-CRT', 'IMRT', 'Brachytherapy'],
          correctAnswer: 2,
          explanation: 'IMRT adalah teknik pilihan untuk kanker nasofaring karena dapat memberikan dosis tinggi ke target sambil melindungi organ kritis sekitar.',
          points: 15,
        },
      ],
    },
  ];
}

function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: 'first-quiz',
      title: 'Peserta Pertama',
      description: 'Menyelesaikan kuis pertama',
      icon: '🎯',
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Menyelesaikan 10 kuis dengan skor sempurna',
      icon: '🏆',
    },
    {
      id: 'radBio-master',
      title: 'RadBio Master',
      description: 'Menguasai semua konsep radiobiologi',
      icon: '🧬',
    },
    {
      id: 'safety-hero',
      title: 'Radiation Safety Hero',
      description: 'Menyelesaikan semua modul keselamatan radiasi',
      icon: '🛡️',
    },
    {
      id: 'onco-planner',
      title: 'OncoPlanner',
      description: 'Berhasil merencanakan 5 kasus klinik dengan benar',
      icon: '📋',
    },
    {
      id: 'daily-learner',
      title: 'Daily Learner',
      description: 'Menyelesaikan daily challenge 7 hari berturut-turut',
      icon: '📅',
    },
    {
      id: 'case-solver',
      title: 'Case Solver',
      description: 'Menyelesaikan 10 kasus klinik',
      icon: '💼',
    },
    {
      id: 'physics-expert',
      title: 'Physics Expert',
      description: 'Menguasai visualisasi fisika radiasi',
      icon: '⚛️',
    },
  ];
}
