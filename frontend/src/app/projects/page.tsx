import { getProjects } from "@/lib/strapi";
import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Répertoire des Projets",
  description:
    "Liste détaillée des projets logiciels, architectures web, solutions SaaS et applications interactives développées par Yulian Guinand.",
  alternates: {
    canonical: "https://yulianguinand.fr/projects",
  },
  openGraph: {
    title: "Répertoire des Projets — Yulian Guinand",
    description:
      "Liste détaillée des projets logiciels, architectures web, solutions SaaS et applications interactives développées par Yulian Guinand.",
    url: "https://yulianguinand.fr/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
