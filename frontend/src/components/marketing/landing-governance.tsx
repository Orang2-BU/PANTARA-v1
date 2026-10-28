"use client";

import { Lock, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Icon } from "@/components/ui";
import { FluidArt } from "@/components/ui/fluid-art";

export function LandingGovernance() {
  return (
    <section className="landing-section no-border" id="prinsip">
      <div className="landing-dark-band">
        <FluidArt className="highlight-art" style="streak" seed={7} w={1200} h={480} />
        <div className="landing-dark-band-content">
          <div className="landing-dark-head">
            <span className="landing-tag" style={{ color: "var(--color-on-inverse-accent)" }}>
              <Icon icon={ShieldCheck} size={14} />
              Kendali Manusia & Transparansi
            </span>
            <h2>Kecerdasan buatan membantu menganalisis. Kamu yang memegang keputusan akhir.</h2>
            <p>
              Pantara dibangun di atas prinsip bahwa penugasan manusia tidak boleh diserahkan secara buta kepada algoritma atau kotak hitam. Keputusan tetap berada di tangan manajer yang memahami konteks nyata.
            </p>
          </div>

          <div className="landing-dark-grid">
            <div className="landing-dark-card">
              <h4>
                <Icon icon={ShieldCheck} size={18} />
                <span>AI Mengurai, Kode Menghitung</span>
              </h4>
              <p>
                Model bahasa alami hanya difungsikan untuk mengekstrak teks kebutuhan tugas menjadi tag katalog terstruktur. Penilaian skor kecocokan diproses sepenuhnya oleh kode deterministik berbasis rumus matematika yang terbuka.
              </p>
            </div>

            <div className="landing-dark-card">
              <h4>
                <Icon icon={SlidersHorizontal} size={18} />
                <span>Hak Veto Penuh & Alasan Wajib</span>
              </h4>
              <p>
                Manajer bebas menetapkan kandidat nomor dua, nomor tiga, atau anggota lain di luar daftar rekomendasi bila ada pertimbangan khusus klien. Sistem meminta alasan singkat untuk memperkaya arsip keputusan organisasi.
              </p>
            </div>

            <div className="landing-dark-card">
              <h4>
                <Icon icon={Lock} size={18} />
                <span>Bebas Pengawasan / Time-Tracking</span>
              </h4>
              <p>
                Pantara tidak mencatat menit kerja, tidak merekam tangkapan layar, dan tidak membandingkan produktivitas perseorangan. Jam kapasitas digunakan murni sebagai alat bantu perencanaan agar beban kerja tetap manusiawi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
