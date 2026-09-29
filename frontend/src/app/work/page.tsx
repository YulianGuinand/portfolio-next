import { getProjects } from "@/lib/strapi";
import { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Projets & Réalisations Web — Bourgogne-Franche-Comté",
  description:
    "Découvrez les architectures web, applications SaaS et plateformes développées par Yulian Guinand pour des entreprises et structures régionales.",
  alternates: {
    canonical: "https://yulianguinand.fr/work",
  },
  openGraph: {
    title: "Projets & Réalisations Web — Bourgogne-Franche-Comté | Yulian Guinand",
    description:
      "Découvrez les architectures web, applications SaaS et plateformes développées par Yulian Guinand pour des entreprises et structures régionales.",
    url: "https://yulianguinand.fr/work",
  },
};

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkClient projects={projects} />;
}
