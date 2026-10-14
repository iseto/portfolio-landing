import "../globals.css";
import PortfolioLayout, {
  localizedMetadata,
} from "@/components/PortfolioLayout";
export const metadata = localizedMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PortfolioLayout locale="en">{children}</PortfolioLayout>;
}
