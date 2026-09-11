import { getProjects } from "@/lib/strapi";
import { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Projets & Réalisations",
  description:
    "Découvrez les projets majeurs conçus par Yulian Guinand : architectures web, applications fullstack (Next.js, Golang, PHP, C#) et plateformes interactives.",
  alternates: {
    canonical: "https://yulianguinand.fr/work",
  },
  openGraph: {
    title: "Projets & Réalisations — Yulian Guinand",
    description:
      "Découvrez les projets majeurs conçus par Yulian Guinand : architectures web, applications fullstack et plateformes interactives.",
    url: "https://yulianguinand.fr/work",
  },
};

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkClient projects={projects} />;
}
