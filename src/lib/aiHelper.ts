export interface AIResponse {
  response: string;
  confidence: number;
}

export interface MedicalTopic {
  topic: string;
  keywords: string[];
  content: string;
}

const medicalKnowledgeBase: MedicalTopic[] = [
  {
    topic: 'Radioterapi Dasar',
    keywords: ['radioterapi', 'radiasi', 'terapi radiasi', 'pengobatan kanker'],
    content: 'Radioterapi adalah pengobatan kanker yang menggunakan radiasi berenergi tinggi untuk membunuh sel kanker atau menghentikan pertumbuhannya. Radiasi bekerja dengan merusak DNA sel kanker sehingga sel tidak dapat berkembang biak.',
  },
  {
    topic: 'Linear Accelerator (LINAC)',
    keywords: ['linac', 'linear accelerator', 'mesin radioterapi', 'alat terapi'],
    content: 'Linear Accelerator (LINAC) adalah mesin yang digunakan untuk memberikan radioterapi eksternal. LINAC menghasilkan foton berenergi tinggi atau elektron yang diarahkan ke tumor dengan presisi tinggi.',
  },
  {
    topic: 'Fraksinasi',
    keywords: ['fraksi', 'fraksinasi', 'dosis', 'jadwal terapi'],
    content: 'Fraksinasi adalah pembagian dosis total radiasi menjadi dosis-dosis kecil yang diberikan dalam beberapa sesi. Ini memungkinkan jaringan normal untuk pulih sambil tetap merusak sel kanker.',
  },
  {
    topic: 'IMRT',
    keywords: ['imrt', 'intensity modulated', 'teknik canggih'],
    content: 'Intensity Modulated Radiation Therapy (IMRT) adalah teknik canggih yang memungkinkan variasi intensitas radiasi di berbagai area. Ini membantu memberikan dosis tinggi ke tumor sambil melindungi organ sehat di sekitarnya.',
  },
  {
    topic: 'Efek Samping',
    keywords: ['efek samping', 'toksisitas', 'komplikasi', 'reaksi'],
    content: 'Efek samping radioterapi dapat bersifat akut (terjadi selama atau segera setelah terapi) atau lambat (berkembang bulan atau tahun setelah terapi). Efek samping tergantung pada area yang diobati, dosis, dan kondisi pasien.',
  },
  {
    topic: 'BED dan EQD2',
    keywords: ['bed', 'eqd2', 'radiobiologi', 'dosis biologis'],
    content: 'BED (Biologically Effective Dose) dan EQD2 (Equivalent Dose in 2 Gy fractions) adalah konsep radiobiologi untuk membandingkan efek biologis dari berbagai regimen fraksinasi. BED = nd[1 + d/(α/β)], di mana n adalah jumlah fraksi dan d adalah dosis per fraksi.',
  },
  {
    topic: 'Simulasi CT',
    keywords: ['ct simulator', 'ct-sim', 'perencanaan', 'simulasi'],
    content: 'CT Simulator adalah alat untuk mengambil gambar CT dalam posisi treatment yang akan digunakan untuk perencanaan terapi radiasi. Pasien diposisikan dengan alat immobilisasi yang sama yang akan digunakan saat terapi.',
  },
  {
    topic: 'Brachytherapy',
    keywords: ['brachytherapy', 'terapi jarak dekat', 'implant', 'internal radiasi'],
    content: 'Brachytherapy adalah jenis radioterapi di mana sumber radiasi ditempatkan sangat dekat atau di dalam tumor. Ini memungkinkan dosis tinggi diberikan ke target dengan minimal paparan ke jaringan sekitar.',
  },
  {
    topic: 'Organ at Risk (OAR)',
    keywords: ['oar', 'organ at risk', 'organ kritis', 'constraint'],
    content: 'Organ at Risk (OAR) adalah jaringan atau organ normal yang mungkin terpengaruh oleh radiasi selama terapi. Setiap OAR memiliki dose constraint (batas dosis) yang harus dipatuhi untuk mencegah toksisitas.',
  },
  {
    topic: 'Target Volume',
    keywords: ['gtv', 'ctv', 'ptv', 'target volume', 'volume target'],
    content: 'GTV (Gross Tumor Volume) adalah tumor yang terlihat pada pencitraan. CTV (Clinical Target Volume) mencakup GTV plus area mikroskopis. PTV (Planning Target Volume) adalah CTV plus margin untuk ketidakpastian setup dan pergerakan organ.',
  },
];

export function getAIResponse(question: string): AIResponse {
  const lowerQuestion = question.toLowerCase();
  
  let bestMatch: MedicalTopic | null = null;
  let matchScore = 0;
  
  for (const topic of medicalKnowledgeBase) {
    let score = 0;
    for (const keyword of topic.keywords) {
      if (lowerQuestion.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }
    
    if (score > matchScore) {
      matchScore = score;
      bestMatch = topic;
    }
  }
  
  if (bestMatch && matchScore > 0) {
    return {
      response: bestMatch.content,
      confidence: Math.min(matchScore / 3, 1),
    };
  }
  
  return {
    response: 'Maaf, saya tidak dapat menemukan informasi spesifik tentang pertanyaan Anda. Silakan coba pertanyaan lain atau kunjungi modul pembelajaran untuk informasi lebih lengkap.',
    confidence: 0,
  };
}

export function generateFlashcardFromText(text: string, category: string): { question: string; answer: string } {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  if (sentences.length < 2) {
    return {
      question: 'Apa yang perlu diketahui tentang topik ini?',
      answer: text,
    };
  }
  
  const firstPart = sentences[0].trim();
  const restParts = sentences.slice(1).join('. ').trim();
  
  const questionStarters = [
    'Jelaskan tentang',
    'Apa yang dimaksud dengan',
    'Bagaimana cara kerja',
    'Mengapa penting untuk memahami',
  ];
  
  const randomStarter = questionStarters[Math.floor(Math.random() * questionStarters.length)];
  
  return {
    question: `${randomStarter} konsep ini?`,
    answer: text,
  };
}

export function generateResearchIdea(cancerType: string, topic: string): string {
  const templates = [
    `Studi komparatif antara teknik IMRT dan VMAT untuk ${cancerType}: Analisis kontrol lokal dan toksisitas`,
    `Evaluasi hasil klinis radioterapi hipofraksinasi pada pasien ${cancerType} di Indonesia`,
    `Peran radioterapi adjuvant dalam meningkatkan survival rate pasien ${cancerType} stadium lanjut`,
    `Analisis faktor prognostik dan prediktif respons radioterapi pada ${cancerType}`,
    `Pengembangan model prediksi toksisitas radioterapi berbasis machine learning untuk ${cancerType}`,
    `Studi dosis-respons radiobiologi untuk optimalisasi fraksinasi pada ${cancerType}`,
    `Evaluasi kualitas hidup pasien ${cancerType} pasca kemoradioterapi konkuren`,
    `Peran adaptive radiotherapy dalam meningkatkan hasil terapi ${cancerType}`,
  ];
  
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  if (topic) {
    return `${randomTemplate}\n\nFokus khusus: ${topic}`;
  }
  
  return randomTemplate;
}

export function generateEthicalScenario(): {
  title: string;
  scenario: string;
  options: { text: string; consequence: string }[];
} {
  const scenarios = [
    {
      title: 'Informed Consent pada Pasien Lanjut Usia',
      scenario: 'Pasien laki-laki 75 tahun dengan kanker paru stadium IIIB. Keluarga meminta agar diagnosis tidak diberitahu ke pasien karena khawatir pasien akan putus asa. Namun pasien terlihat ingin tahu tentang kondisinya.',
      options: [
        {
          text: 'Mengikuti permintaan keluarga dan tidak memberitahu pasien',
          consequence: 'Menghormati keluarga tetapi melanggar otonomi pasien. Ini dapat menimbulkan masalah etis dan legal jika pasien merasa haknya dilanggar.',
        },
        {
          text: 'Memberitahu pasien secara langsung tanpa keluarga',
          consequence: 'Menghormati otonomi pasien tetapi dapat merusak hubungan dengan keluarga. Komunikasi terbuka tetap penting.',
        },
        {
          text: 'Melakukan diskusi keluarga bersama-sama dengan konseling',
          consequence: 'Pendekatan terbaik: mengedukasi keluarga tentang pentingnya informed consent sambil memberikan dukungan emosional kepada semua pihak.',
        },
      ],
    },
    {
      title: 'Prioritas Pasien dengan Sumber Daya Terbatas',
      scenario: 'Mesin LINAC rusak dan hanya 1 slot treatment tersedia per hari. Ada 2 pasien: Pasien A dengan kanker serviks stadium IIB yang memerlukan radioterapi kuratif, dan Pasien B dengan metastasis tulang yang memerlukan radioterapi paliatif untuk nyeri berat.',
      options: [
        {
          text: 'Prioritaskan Pasien A karena terapi kuratif',
          consequence: 'Pendekatan utilitarian: memaksimalkan kesempatan kesembuhan. Namun Pasien B akan terus menderita nyeri.',
        },
        {
          text: 'Prioritaskan Pasien B karena kondisi darurat paliatif',
          consequence: 'Pendekatan compassionate care: mengurangi penderitaan segera. Namun dapat menunda terapi kuratif Pasien A.',
        },
        {
          text: 'Konsultasi tim multidisiplin untuk menentukan prioritas',
          consequence: 'Pendekatan terbaik: keputusan kolaboratif dengan mempertimbangkan semua aspek medis, etis, dan sosial.',
        },
      ],
    },
  ];
  
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

export function generatePeerReviewComment(caseDescription: string, userAnswer: string): string {
  const positiveComments = [
    'Pendekatan yang Anda ambil menunjukkan pemahaman yang baik tentang prinsip radioterapi.',
    'Pertimbangan Anda terhadap faktor risiko pasien sangat tepat.',
    'Pemilihan teknik yang Anda usulkan sesuai dengan guideline terkini.',
  ];
  
  const constructiveComments = [
    'Pertimbangkan untuk mengevaluasi lebih lanjut kondisi komorbid pasien yang mungkin mempengaruhi toleransi terapi.',
    'Mungkin perlu diskusi lebih lanjut tentang fraksionasi dosis yang optimal untuk kasus ini.',
    'Jangan lupa untuk mempertimbangkan kualitas hidup pasien dalam pemilihan modalitas terapi.',
  ];
  
  const recommendations = [
    'Sebaiknya konsultasikan dengan tim multidisiplin untuk pendekatan yang komprehensif.',
    'Review kembali literatur terbaru tentang kasus serupa untuk mendapatkan evidence-based approach.',
    'Pertimbangkan untuk melakukan shared decision making dengan pasien dan keluarga.',
  ];
  
  const positive = positiveComments[Math.floor(Math.random() * positiveComments.length)];
  const constructive = constructiveComments[Math.floor(Math.random() * constructiveComments.length)];
  const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
  
  return `Feedback Peer Review:\n\n✅ ${positive}\n\n💡 ${constructive}\n\n📚 ${recommendation}`;
}

export async function speakText(text: string, lang: string = 'id-ID'): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;
  
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
