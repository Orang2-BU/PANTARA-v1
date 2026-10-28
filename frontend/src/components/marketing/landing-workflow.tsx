"use client";

import Image from "next/image";
import { Check, GitPullRequest } from "lucide-react";
import { Icon } from "@/components/ui";

export function LandingWorkflow() {
  return (
    <section className="landing-section" id="alur-kerja">
      <div className="landing-section-header">
        <span className="landing-tag">
          <Icon icon={GitPullRequest} size={14} />
          Alur Kerja Inti
        </span>
        <h2>Empat langkah dari deskripsi tugas sampai penetapan yang aman.</h2>
        <p>
          Setiap tahapan dirancang transparan dan dapat diaudit: kamu memeriksa asumsi, melihat konsekuensi beban, lalu mengambil keputusan dengan tenang.
        </p>
      </div>

      <div className="landing-steps-stack">
        {/* Step 1 */}
        <div className="landing-step-row">
          <div className="landing-step-content">
            <span className="landing-step-num">Langkah 01</span>
            <h3>Ekstraksi kebutuhan otomatis dari teks tugas (Task DNA)</h3>
            <p>
              Cukup tempelkan deskripsi tugas apa adanya. Model AI membaca bahasa alami dan mengekstrak tag kompetensi, level minimum yang dibutuhkan, estimasi jam pengerjaan, serta dependensi tugas.
            </p>
            <div className="landing-step-bullets">
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Kebutuhan dipetakan langsung ke katalog kompetensi terdaftar organisasi.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Isian dengan tingkat keyakinan rendah diberi tanda peringatan untuk ditinjau.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Manajer dapat mengoreksi estimasi dan tag dengan satu kali klik.</span>
              </div>
            </div>
          </div>
          <div className="landing-step-visual">
            <Image
              src="/marketing/preview-dna.png"
              alt="Pratinjau Analisis Task DNA di Pantara"
              width={800}
              height={506}
              quality={85}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="landing-step-row reverse">
          <div className="landing-step-content">
            <span className="landing-step-num">Langkah 02</span>
            <h3>Pencocokan profil kerja dan kapasitas jam nyata</h3>
            <p>
              Pantara membandingkan kebutuhan tugas dengan kondisi nyata setiap anggota: tingkat keahlian (Dasar, Mandiri, Mahir), jam kosong periode aktif, jadwal cuti, dan batasan jam kerja mingguan.
            </p>
            <div className="landing-step-bullets">
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Anggota yang sedang cuti atau kapasitasnya tidak mencukupi otomatis disaring.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Keahlian terverifikasi memiliki bobot keyakinan lebih tinggi dibanding klaim mandiri.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Jam kerja dihitung dari sisa riil minggu berjalan, bukan asumsi 40 jam tetap.</span>
              </div>
            </div>
          </div>
          <div className="landing-step-visual">
            <Image
              src="/marketing/preview-keahlian.png"
              alt="Pratinjau Matriks Keahlian dan Kapasitas Anggota di Pantara"
              width={800}
              height={506}
              quality={85}
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="landing-step-row">
          <div className="landing-step-content">
            <span className="landing-step-num">Langkah 03</span>
            <h3>Tiga rekomendasi teratas beserta alasan terhitung</h3>
            <p>
              Bukan tebak-tebakan dan bukan kotak hitam. Mesin penilai deterministik menghitung skor kecocokan (0,00 hingga 1,00) berdasarkan 5 faktor terukur, dirangkum dalam kalimat penjelasan yang logis.
            </p>
            <div className="landing-step-bullets">
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>5 faktor: Kesesuaian kompetensi, Utilisasi beban sesudah, Ketersediaan sampai tenggat, Riwayat tugas sejenis, dan Risiko konflik.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Alasan rekomendasi disusun langsung dari angka kalkulasi, bukan karangan teks LLM.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Preset penilaian fleksibel: Seimbang, Kejar Tenggat, Ratakan Beban, atau Sebar Pengetahuan.</span>
              </div>
            </div>
          </div>
          <div className="landing-step-visual">
            <Image
              src="/marketing/preview-kandidat.png"
              alt="Pratinjau Rekomendasi Top 3 Kandidat di Pantara"
              width={800}
              height={506}
              quality={85}
            />
          </div>
        </div>

        {/* Step 4 */}
        <div className="landing-step-row reverse">
          <div className="landing-step-content">
            <span className="landing-step-num">Langkah 04</span>
            <h3>Simulasi dampak beban sebelum penetapan resmi</h3>
            <p>
              Ketahui akibat keputusan sebelum menekan tombol penetapan. Periksa pergeseran utilisasi sebelum versus sesudah, pastikan tidak ada bentrok tenggat antar-proyek, atau simulasikan skenario bagi tugas ke 2 orang.
            </p>
            <div className="landing-step-bullets">
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Grafik batang visual menunjukkan perubahan utilisasi jam kerja secara instan.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Peringatan dini otomatis jika ada tenggat lain yang berdekatan dalam rentang 24 jam.</span>
              </div>
              <div className="landing-step-bullet">
                <Icon icon={Check} size={16} />
                <span>Setelah ditetapkan, seluruh dasbor dan sisa jam tim terbarukan secara otomatis.</span>
              </div>
            </div>
          </div>
          <div className="landing-step-visual">
            <Image
              src="/marketing/preview-simulasi.png"
              alt="Pratinjau Simulasi What-If di Pantara"
              width={800}
              height={506}
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
