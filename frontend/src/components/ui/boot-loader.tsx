// Animasi pembuka sekali per sesi tab: cincin Pantara tergambar, titik jatuh ke celahnya, lalu tirai naik.
// Murni CSS supaya tampil sebelum JS aplikasi jalan. BOOT_SKIP (dipasang di root layout) menandai <html>
// bila sesi tab ini sudah pernah dibuka, sehingga loader tidak diulang.
export const BOOT_SKIP = `try{sessionStorage.getItem("pantara-boot")?document.documentElement.dataset.booted="":sessionStorage.setItem("pantara-boot","1")}catch(e){}`;

export function BootLoader() {
  return <div className="boot" aria-hidden="true">
    <svg className="boot-mark" viewBox="28 28 200 200">
      <path className="boot-ring" d="M150.05 49A82 82 0 1 0 207 105.95" pathLength={1} />
      <circle className="boot-dot" cx="185.98" cy="70.02" r="17" />
    </svg>
  </div>;
}
