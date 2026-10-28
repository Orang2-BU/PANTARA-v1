"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { Icon } from "@/components/ui";

const FAQS = [
  {
    q: "Apakah kami harus mengganti Jira, Trello, atau ClickUp?",
    a: "Tidak. Pantara bukan task tracker atau papan kanban dan tidak memiliki fitur obrolan atau komentar tiket. Pantara bekerja di tahap pra-penugasan: membantu manajer proyek memutuskan siapa penanggung jawab yang paling pas sebelum tugas dimasukkan ke papan kerja harian tim.",
  },
  {
    q: "Apakah AI membaca repositori kode sumber atau rahasia bisnis klien kami?",
    a: "Tidak sama sekali. Model bahasa alami hanya menerima potongan teks judul dan deskripsi tugas untuk mengidentifikasi kebutuhan kompetensi dan perkiraan waktu kerja. Repositori kode, kredensial, dan data bisnis klien tidak pernah disentuh atau dikirimkan ke server model.",
  },
  {
    q: "Bagaimana skor kecocokan kandidat dihitung?",
    a: "Skor dihitung secara matematis menggunakan rumus multikriteria terbuka dari 5 faktor: Kesesuaian kompetensi (K), Skor beban kapasitas sesudah penugasan (C), Ketersediaan jam kosong sampai tenggat (A), Riwayat tugas sejenis dan preferensi (R), dikurangi Risiko konflik jadwal berdekatan (F). Bobot masing-masing faktor dapat disesuaikan di menu pengaturan ruang kerja.",
  },
  {
    q: "Berapa lama persiapan data yang dibutuhkan untuk mulai menggunakan Pantara?",
    a: "Kurang dari 15 menit. Kamu cukup mendaftarkan nama anggota, peran, dan jam ketersediaan mingguan. Kamu juga dapat langsung mengeksplorasi seluruh sistem detik ini juga menggunakan 20 data contoh Arunika Digital yang sudah kami sediakan di dalam demo.",
  },
];

export function LandingFaq() {
  return (
    <section className="landing-section" id="faq">
      <div className="landing-section-header center">
        <span className="landing-tag">
          <Icon icon={HelpCircle} size={14} />
          Pertanyaan Umum
        </span>
        <h2>Pertanyaan yang sering diajukan</h2>
        <p>
          Penjelasan ringkas mengenai cara kerja sistem, batasan privasi data, dan integrasi dengan alur kerja tim kamu saat ini.
        </p>
      </div>

      <div className="landing-faq-list">
        {FAQS.map((faq, i) => (
          <details key={faq.q} className="landing-faq-item" open={i === 0}>
            <summary className="landing-faq-question">
              <span>{faq.q}</span>
              <Icon icon={ChevronDown} size={18} />
            </summary>
            <div className="landing-faq-answer">
              <p>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
