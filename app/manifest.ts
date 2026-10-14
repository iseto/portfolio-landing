import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Ignatius Seto — Portfolio",
    short_name: "Seto Portfolio",
    description:
      "Frontend, accessibility and applied AI work. English, Deutsch, Bahasa Indonesia.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f8f2",
    theme_color: "#182c2b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
