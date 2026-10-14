import "../globals.css";
import PortfolioLayout, {
  localizedMetadata,
} from "@/components/PortfolioLayout";
export const metadata = localizedMetadata("de");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PortfolioLayout locale="de">{children}</PortfolioLayout>;
}
