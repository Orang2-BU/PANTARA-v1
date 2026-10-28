"use client";

import { AlertTriangle, Clock, Layers, Users } from "lucide-react";
import { Icon } from "@/components/ui";

export function LandingPainPoints() {
  return (
    <section className="landing-section">
      <div className="landing-section-header">
        <span className="landing-tag">
          <Icon icon={AlertTriangle} size={14} />
          Masalah Nyata di Agensi
        </span>
        <h2>Penugasan sering mengandalkan firasat, bukan data nyata.</h2>
        <p>
          Ketika proyek bertambah cepat, manajer proyek dihadapkan pada tiga jebakan umum yang menguras energi dan memicu gesekan di dalam tim.
        </p>
      </div>

      <div className="landing-pain-grid">
        <div className="landing-pain-card mesh">
          <div className="landing-pain-icon">
            <Icon icon={Layers} size={22} />
          </div>
          <h3>Informasi tim tersebar di 4 tempat</h3>
          <p>
            Keahlian di CV lama, jadwal cuti di Google Calendar, estimasi di ingatan PM, dan tenggat di spreadsheet. Tidak ada satu layar yang memperlihatkan kondisi tim secara utuh sebelum tugas dilepas.
          </p>
          <span className="landing-pain-chip">Beban kognitif tinggi bagi manajer</span>
        </div>

        <div className="landing-pain-card mesh">
          <div className="landing-pain-icon">
            <Icon icon={Users} size={22} />
          </div>
          <h3>Tugas selalu jatuh ke orang yang sama</h3>
          <p>
            Pengembang senior yang sigap selalu dibebani semua tugas kritis hingga lembur dan rentan burnout. Sementara itu, anggota lain tidak pernah diberi kesempatan untuk membuktikan diri.
          </p>
          <span className="landing-pain-chip">Risiko kelelahan & ketergantungan personil</span>
        </div>

        <div className="landing-pain-card mesh">
          <div className="landing-pain-icon">
            <Icon icon={Clock} size={22} />
          </div>
          <h3>Konflik baru ketahuan saat sudah telat</h3>
          <p>
            Dua tugas besar ternyata jatuh tempo di hari yang sama, atau berbenturan dengan cuti anggota yang luput dari pantauan. Masalah baru disadari saat klien menanyakan progres yang mandek.
          </p>
          <span className="landing-pain-chip">Keterlambatan rilis tak terduga</span>
        </div>
      </div>
    </section>
  );
}
