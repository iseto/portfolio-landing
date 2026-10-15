"use client";
import { useSyncExternalStore, useState } from "react";
import type { Locale } from "@/data/portfolio";

const labels = {
  en: { button: "Clear offline data", busy: "Clearing…", done: "Offline data cleared. Pages can be saved again on your next visit.", error: "Could not clear offline data. Try again or clear site data in your browser settings." },
  de: { button: "Offline-Daten löschen", busy: "Wird gelöscht…", done: "Offline-Daten gelöscht. Beim nächsten Besuch können Seiten erneut gespeichert werden.", error: "Offline-Daten konnten nicht gelöscht werden. Erneut versuchen oder Websitedaten in den Browsereinstellungen löschen." },
  id: { button: "Hapus data luring", busy: "Menghapus…", done: "Data luring dihapus. Halaman dapat disimpan lagi pada kunjungan berikutnya.", error: "Data luring tidak dapat dihapus. Coba lagi atau hapus data situs melalui pengaturan browser." },
};
const subscribe = () => () => {};
const supported = () => process.env.NODE_ENV === "production" && "serviceWorker" in navigator && "caches" in window;
export default function OfflineControls({ locale }: { locale: Locale }) {
  const available = useSyncExternalStore(subscribe, supported, () => false);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  if (!available) return null;
  const t = labels[locale];
  async function clear() {
    setState("busy");
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration?.active) {
        await new Promise<void>((resolve, reject) => {
          const channel = new MessageChannel();
          const timer = window.setTimeout(() => { channel.port1.close(); reject(new Error("timeout")); }, 5000);
          channel.port1.onmessage = (event) => {
            window.clearTimeout(timer);
            channel.port1.close();
            if (event.data?.ok) resolve(); else reject(new Error("clear failed"));
          };
          registration.active!.postMessage({ type: "CLEAR_OFFLINE_DATA" }, [channel.port2]);
        });
      } else {
        for (const key of await caches.keys()) {
          if (key.startsWith("seto-portfolio-")) await caches.delete(key);
        }
      }
      setState("done");
    } catch { setState("error"); }
  }
  return <div className="offline-controls">
    <button type="button" onClick={clear} disabled={state === "busy"}>{state === "busy" ? t.busy : t.button}</button>
    <span role="status">{state === "done" ? t.done : state === "error" ? t.error : ""}</span>
  </div>;
}
