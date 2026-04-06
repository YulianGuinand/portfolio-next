import {
  MdArticle,
  MdInsertChart,
  MdPerson,
  MdSearch,
  MdSlideshow,
} from "react-icons/md";

export const documentsData = [
  {
    id: 1,
    title: "CV",
    description:
      "Consulter mon curriculum vitae détaillé avec mon expérience, formations et compétences.",
    icon: MdPerson,
    color: "cv",
    href: "/documents/CV.pdf",
  },
  {
    id: 2,
    title: "Dossier E5",
    description:
      "Mon dossier professionnel pour l'épreuve E5 du BTS SIO documentant mes projets.",
    icon: MdArticle,
    color: "e5",
    href: "/documents/DOSSIER_EPREUVE_E5.pdf",
  },
  {
    id: 3,
    title: "Tableau Compétences",
    description:
      "Excel interactif listant toutes mes compétences téchniques et professionnelles.",
    icon: MdInsertChart,
    color: "competence",
    href: "/documents/competences",
  },
  {
    id: 4,
    title: "Présentation E4",
    description:
      "PowerPoint de ma présentation pour l'épreuve E4 avec slides et contenus.",
    icon: MdSlideshow,
    color: "e4",
    href: "/documents/e4",
  },
  {
    id: 5,
    title: "Veille Technologique",
    description:
      "Rapport complet de ma veille sur les dernières tendances technologiques.",
    icon: MdSearch,
    color: "veille",
    href: "/documents/veille",
  },
];
