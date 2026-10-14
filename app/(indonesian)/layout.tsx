import "../globals.css";
import PortfolioLayout, {
  localizedMetadata,
} from "@/components/PortfolioLayout";
export const metadata = localizedMetadata("id");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <PortfolioLayout locale="id">{children}</PortfolioLayout>;
}
