"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import { Icon } from "@/components/ui";

export function LandingPilot() {
  return (
    <section className="landing-section">
      <div className="landing-pilot-card mesh">
        <div className="landing-pilot-top">
          <div>
            <span className="landing-tag">
              <Icon icon={Rocket} size={14} />
              Program Pilot Evaluasi
            </span>
            <h3 style={{ fontSize: "26px", fontWeight: 600, marginTop: "8px", letterSpacing: "-0.02em" }}>
              Uji coba Pantara untuk satu tim di organisasimu
            </h3>
            <p style={{ color: "var(--color-on-surface-muted)", marginTop: "6px", maxWidth: "58ch", fontSize: "15px", lineHeight: "1.6" }}>
              Jalankan evaluasi alur penugasan tanpa risiko. Kamu dapat langsung mencoba menggunakan data contoh yang sudah kami sediakan, atau memasukkan profil tim kerjamu sendiri.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Link className="button primary" href="/dashboard">
              Buka aplikasi demo
              <Icon icon={ArrowRight} size={15} />
            </Link>
            <Link className="button secondary" href="/harga">
              Lihat info harga
            </Link>
          </div>
        </div>

        <div className="landing-pilot-features">
          <div className="landing-pilot-item">
            <Icon icon={CheckCircle2} size={18} />
            <span>Seluruh fitur inti aktif: Task DNA, Rekomendasi Top 3, Simulasi What-If, dan Peta Keahlian.</span>
          </div>
          <div className="landing-pilot-item">
            <Icon icon={CheckCircle2} size={18} />
            <span>Data sesi tersimpan rapi di peramban tanpa risiko membocorkan informasi rahasia ke server luar.</span>
          </div>
          <div className="landing-pilot-item">
            <Icon icon={CheckCircle2} size={18} />
            <span>Onboarding mandiri cepat: impor profil tim dan katalog kompetensi selesai dalam waktu singkat.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
