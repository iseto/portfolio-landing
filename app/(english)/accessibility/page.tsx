import AccessibilityReport from "@/components/AccessibilityReport";
import { accessibilityCopy } from "@/data/accessibility";
export const metadata = {
  title: accessibilityCopy.en.title,
  alternates: {
    canonical: "/accessibility",
    languages: {
      en: "/accessibility",
      de: "/de/accessibility",
      id: "/id/accessibility",
    },
  },
};
export default function Page() {
  return <AccessibilityReport locale="en" />;
}
