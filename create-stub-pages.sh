#!/bin/bash

# AI pages
cat > /home/engine/project/src/app/ai/prompt-builder/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Prompt Builder" description="Buat dan simpan pertanyaan radioterapi" features={['Template pertanyaan kustom', 'Library prompt tersimpan', 'Export/import prompt', 'Kategori topik']} />;
}
EOF

cat > /home/engine/project/src/app/ai/annotator/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="AI Image Annotator" description="Tandai area tumor dan OAR pada CT/DICOM" features={['Upload DICOM files', 'Markup tools', 'OAR detection', 'Export annotations']} />;
}
EOF

cat > /home/engine/project/src/app/ai/speech/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Speech Narration" description="Penjelasan audio untuk konten edukasi" features={['Text-to-speech engine', 'Multiple voices', 'Speed control', 'Offline narration']} />;
}
EOF

# Game pages
cat > /home/engine/project/src/app/game/progress/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="XP & Level System" description="Sistem poin pengalaman dan leveling" features={['Real-time XP tracking', 'Level progression', 'Skill tree', 'Weekly goals']} />;
}
EOF

cat > /home/engine/project/src/app/game/leaderboard/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Leaderboard" description="Peringkat lokal dan kompetisi" features={['Local rankings', 'Score comparison', 'Achievement showcase', 'Monthly competitions']} />;
}
EOF

cat > /home/engine/project/src/app/game/tracker/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Progress Tracker" description="Visualisasi progres pembelajaran" features={['Learning analytics', 'Time spent tracking', 'Topic mastery', 'Growth charts']} />;
}
EOF

# Explore pages
cat > /home/engine/project/src/app/explore/history/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Radiotherapy History Timeline" description="Sejarah radioterapi interaktif 1895-sekarang" features={['Interactive timeline', 'Key discoveries', 'Historical figures', 'Technology evolution']} />;
}
EOF

cat > /home/engine/project/src/app/explore/themes/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Theme & Accessibility" description="Kustomisasi warna, font, dan kontras" features={['Dark/light mode', 'Color themes', 'Font size control', 'High contrast mode']} />;
}
EOF

cat > /home/engine/project/src/app/explore/learning-path/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Guided Learning Path" description="Panduan bertahap dari intro hingga mahir" features={['Structured curriculum', 'Step-by-step guide', 'Progress checkpoints', 'Recommended order']} />;
}
EOF

cat > /home/engine/project/src/app/explore/bookmarks/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Smart Bookmarks" description="Simpan halaman dan kasus favorit" features={['Quick save', 'Organize by tags', 'Search bookmarks', 'Export list']} />;
}
EOF

cat > /home/engine/project/src/app/explore/story-mode/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Story Mode: From Diagnosis to Healing" description="Perjalanan pasien dari diagnosis ke healing" features={['Patient perspective', 'Interactive narrative', 'Decision points', 'Multiple endings']} />;
}
EOF

# Pro pages
cat > /home/engine/project/src/app/pro/journal/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Journal Reflection Mode" description="Tulis refleksi kasus pribadi (offline)" features={['Markdown editor', 'Case templates', 'Tags and categories', 'Search and filter']} />;
}
EOF

cat > /home/engine/project/src/app/pro/learning-log/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Learning Log Dashboard" description="Dashboard waktu belajar dan penguasaan topik" features={['Study time analytics', 'Topic mastery', 'Learning trends', 'Weekly reports']} />;
}
EOF

cat > /home/engine/project/src/app/pro/peer-review/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Peer Review Simulator" description="Simulasi evaluasi kasus antar pengguna" features={['Case review templates', 'AI feedback', 'Best practices', 'Evaluation criteria']} />;
}
EOF

cat > /home/engine/project/src/app/pro/research/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Research Idea Generator" description="Generator ide penelitian radioterapi" features={['Topic suggestions', 'Research templates', 'Literature keywords', 'Methodology guidance']} />;
}
EOF

cat > /home/engine/project/src/app/pro/ethics/page.tsx << 'EOF'
import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="Ethical Decision Trainer" description="Skenario etika klinik dengan pilihan moral" features={['Real-world scenarios', 'Multiple perspectives', 'Consequence analysis', 'Expert commentary']} />;
}
EOF

echo "Stub pages created successfully!"
