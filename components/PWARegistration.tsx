"use client";
import { useEffect } from "react";
export default function PWARegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          /* Standard browsing remains available if installation is blocked. */
        });
    }
  }, []);
  return null;
}
