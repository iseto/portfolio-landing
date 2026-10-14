import AccessibilityReport from "@/components/AccessibilityReport";
import { accessibilityCopy } from "@/data/accessibility";
export const metadata = {
  title: accessibilityCopy.de.title,
  alternates: {
    canonical: "/de/accessibility",
    languages: {
      en: "/accessibility",
      de: "/de/accessibility",
      id: "/id/accessibility",
    },
  },
};
export default function Page() {
  return <AccessibilityReport locale="de" />;
}
