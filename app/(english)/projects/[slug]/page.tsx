import CaseStudy from "@/components/CaseStudy";
import { portfolioProjects } from "@/data/portfolio";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) notFound();
  return {
    title: project.title,
    description: project.en.description,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: { en: `/projects/${slug}`, de: `/de/projects/${slug}` },
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <CaseStudy locale="en" slug={(await params).slug} />;
}
