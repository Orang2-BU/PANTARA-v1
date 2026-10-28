"use client";

import Image from "next/image";
import { Building2 } from "lucide-react";
import { Icon } from "@/components/ui";

export function LandingAudience() {
  return (
    <section className="landing-section" id="untuk-siapa">
      <div className="landing-section-header">
        <span className="landing-tag">
          <Icon icon={Building2} size={14} />
          Sasaran Pengguna
        </span>
        <h2>Dirancang untuk agensi dan software house multi-proyek.</h2>
        <p>
          Ketika anggota tim memegang 2 hingga 3 proyek klien berbarengan, tabel spreadsheet dan memori manual tidak lagi mampu mencegah tumpang tindih beban kerja.
        </p>
      </div>

      <div className="landing-case-card mesh">
        <div className="landing-case-left">
          <span className="badge">Studi Kasus Nyata: Arunika Digital</span>
          <h3>Simulasi lengkap kondisi kerja agensi 20 karyawan</h3>
          <p>
            Data contoh di dalam aplikasi dibangun dari skenario agensi perangkat lunak di Jawa Timur yang menangani 5 proyek klien secara paralel. Sistem mencakup kondisi harian yang nyata: karyawan magang, staf paruh waktu, cuti di tengah minggu, dan penugasan yang ditolak oleh anggota tim.
          </p>

          <div className="landing-metrics-row">
            <div className="landing-metric-box">
              <strong>20</strong>
              <span>Karyawan aktif</span>
            </div>
            <div className="landing-metric-box">
              <strong>5</strong>
              <span>Proyek simultan</span>
            </div>
            <div className="landing-metric-box">
              <strong>16</strong>
              <span>Katalog kompetensi</span>
            </div>
            <div className="landing-metric-box">
              <strong>100%</strong>
              <span>Audit transparan</span>
            </div>
          </div>
        </div>

        <div className="landing-case-visual">
          <Image
            src="/marketing/preview-dashboard.png"
            alt="Dasbor Tim Arunika Digital di Pantara"
            width={640}
            height={400}
            quality={85}
          />
        </div>
      </div>
    </section>
  );
}
