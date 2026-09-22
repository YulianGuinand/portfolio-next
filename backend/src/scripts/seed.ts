import type { Core } from "@strapi/strapi";
import fs from "fs";
import path from "path";

// Helper to convert paragraph strings to Strapi 5 Blocks format
function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    type: "paragraph",
    children: [
      {
        type: "text",
        text,
      },
    ],
  }));
}

// Find local file in frontend/public
function resolvePublicFile(relativePath: string): string | null {
  const cleanPath = relativePath.replace(/^\//, "");
  const candidate = path.resolve(process.cwd(), "public", cleanPath);

  if (fs.existsSync(candidate)) {
    return candidate;
  }
  return null;
}

// Upload file to Strapi upload plugin
async function uploadMediaFile(
  strapi: Core.Strapi,
  relativePath: string,
  altText?: string,
) {
  const absolutePath = resolvePublicFile(relativePath);
  if (!absolutePath) {
    console.warn(`[SEED] File not found: ${relativePath}`);
    return null;
  }

  const name = path.basename(absolutePath);

  // Vérifier si le fichier existe déjà en base pour éviter les doublons inutiles
  const existing = await strapi.db.query("plugin::upload.file").findOne({
    where: { name },
  });
  if (existing) {
    return existing;
  }

  const stat = fs.statSync(absolutePath);
  const ext = path.extname(absolutePath).toLowerCase();

  let mimeType = "application/octet-stream";
  if (ext === ".png") mimeType = "image/png";
  else if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
  else if (ext === ".pdf") mimeType = "application/pdf";
  else if (ext === ".svg") mimeType = "image/svg+xml";
  else if (ext === ".webp") mimeType = "image/webp";

  // Format requis par Strapi pour l'upload programmatique
  const fileData = {
    filepath: absolutePath,
    originalFilename: name,
    name: name,
    mimetype: mimeType,
    size: stat.size,
  };

  try {
    const uploadService = strapi.plugin("upload").service("upload");
    const uploaded = await uploadService.upload({
      data: {
        fileInfo: {
          name,
          caption: altText || name,
          alternativeText: altText || name,
        },
      },
      files: fileData,
    });

    const result = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    console.log(`[SEED] Uploaded to Supabase Storage: ${name}`);
    return result;
  } catch (error) {
    console.error(`[SEED] Failed to upload ${name} to Supabase:`, error);
    return null;
  }
}

// Ensure public role has find and findOne permissions
async function setPublicPermissions(strapi: Core.Strapi) {
  console.log("[SEED] Configuring public read-only permissions...");
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) {
    console.warn("[SEED] Public role not found!");
    return;
  }

  const actions = [
    "api::project.project.find",
    "api::project.project.findOne",
    "api::document.document.find",
    "api::document.document.findOne",
    "api::photo.photo.find",
    "api::photo.photo.findOne",
    "api::global.global.find",
  ];

  for (const action of actions) {
    const existingPerm = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({
        where: {
          role: publicRole.id,
          action,
        },
      });

    if (!existingPerm) {
      await strapi.db.query("plugin::users-permissions.permission").create({
        data: {
          action,
          role: publicRole.id,
          enabled: true,
        },
      });
    } else if (!existingPerm.enabled) {
      await strapi.db.query("plugin::users-permissions.permission").update({
        where: { id: existingPerm.id },
        data: { enabled: true },
      });
    }
  }
}

export async function seedDatabase(strapi: Core.Strapi) {
  console.log("[SEED] Starting database seeding...");

  await setPublicPermissions(strapi);

  // 1. Seed Global Settings
  console.log("[SEED] Seeding Global Settings...");
  const existingGlobal = await strapi
    .documents("api::global.global")
    .findFirst();
  const siteIconFile = await uploadMediaFile(
    strapi,
    "/site-icon.png",
    "Yulian Guinand Portfolio",
  );

  const globalData = {
    siteName: "Yulian Guinand",
    siteBrand: "Y. Guinand",
    heroTitle: "Développement Web & Solutions Digitales",
    heroSubtitle: "Par Yulian Guinand",
    defaultSeoTitle: "Yulian Guinand — Développement Web & Solutions Digitales",
    defaultSeoDescription:
      "Portfolio officiel de Yulian Guinand. Concepteur développeur web & architectures fullstack (Next.js, TypeScript, Golang, PHP, C#). BTS SIO option SLAM.",
    defaultOgImage: siteIconFile ? siteIconFile.id : undefined,
    dockLinks: [
      {
        label: "Accueil",
        path: "/",
        iconKey: "home",
        external: false,
        order: 1,
      },
      {
        label: "Projets en vedette",
        path: "/work",
        iconKey: "palette",
        external: false,
        order: 2,
      },
      {
        label: "Répertoire des projets",
        path: "/projects",
        iconKey: "folder",
        external: false,
        order: 3,
      },
      {
        label: "Galerie Photos",
        path: "/photos",
        iconKey: "camera",
        external: false,
        order: 4,
      },
      {
        label: "Documents",
        path: "/documents",
        iconKey: "file",
        external: false,
        order: 5,
      },
      {
        label: "Profil LinkedIn de Yulian Guinand",
        path: "https://www.linkedin.com/in/yulian-guinand/",
        iconKey: "linkedin",
        external: true,
        order: 6,
      },
      {
        label: "Profil GitHub de Yulian Guinand",
        path: "https://github.com/YulianGuinand",
        iconKey: "github",
        external: true,
        order: 7,
      },
      {
        label: "Contacter Yulian Guinand par email",
        path: "mailto:yulianguinand@etik.com",
        iconKey: "envelope",
        external: true,
        order: 8,
      },
    ],
  };

  if (!existingGlobal) {
    await strapi.documents("api::global.global").create({
      data: globalData as any,
      status: "published",
    });
  } else {
    await strapi.documents("api::global.global").update({
      documentId: existingGlobal.documentId,
      data: globalData as any,
      status: "published",
    });
  }

  // 2. Seed Projects
  console.log("[SEED] Seeding Projects...");
  const rawProjects = [
    {
      slug: "competia",
      title: "Competia",
      category: "Architecture FullStack",
      forme: "Application Web & ATS",
      year: "2025",
      cadre: "Auto-Entreprise",
      role: "Concepteur & Développeur Fullstack",
      stack: ["Next.js", "TypeScript", "Golang", "PostgreSQL", "Tailwind CSS"],
      shortDescription:
        "Plateforme d’analyse de CV et d’offres basée sur un moteur ATS avec détection de mots-clés.",
      fullDescription: [
        "Competia est une plateforme intelligente d'analyse de CV et d'offres d'emploi conçue autour d'un moteur ATS (Applicant Tracking System). Le système analyse la pertinence des candidatures, détecte les mots-clés manquants et formule des recommandations d'optimisation immédiates pour maximiser la visibilité des candidats face aux recruteurs.",
        "L'architecture propose deux espaces dédiés : un portail candidat pour tester et peaufiner son CV en temps réel, et un portail coach pour accompagner, corriger et piloter les offres de recrutement de manière centralisée et fluide.",
        "Conçu avec Next.js et TypeScript côté frontend, et une API haute performance développée en Golang avec PostgreSQL pour la persistance des données et la vélocité des analyses.",
      ],
      coverImage: "/project/competia/competia-project-1.png",
      containerHeight: "h450",
      galleryImages: [
        "/project/competia/competia-project-2.png",
        "/project/competia/competia-project-3.png",
        "/project/competia/competia-project-4.png",
        "/project/competia/competia-project-5.png",
        "/project/competia/competia-project-6.png",
        "/project/competia/competia-project-7.png",
        "/project/competia/competia-project-8.png",
      ],
      pdfLinks: [],
      order: 1,
    },
    {
      slug: "associations-manager",
      title: "Association Manager",
      category: "Architecture Hybride",
      forme: "Application Lourde & API Web",
      year: "2025",
      cadre: "Projet Académique (BTS SIO)",
      role: "Chef d’équipe & Développeur Fullstack",
      stack: ["C#", "WPF", "ASP.NET", "PHP", "Laravel", "React"],
      shortDescription:
        "Solution de gestion associative combinant client lourd desktop et portail web interactif.",
      fullDescription: [
        "Association Manager est une solution globale de gestion centralisée pour les structures associatives, alliant la réactivité et la robustesse d'un client lourd desktop aux avantages d'un portail web collaboratif.",
        "Le tableau de bord desktop développé en C# WPF permet le pilotage administratif précis (adhérents, cotisations, comptabilité, événements), tandis qu'une API dédiée et un portail web Laravel/React automatisent la collecte des formulaires complexes et la synchronisation en temps réel.",
        "Projet mené en qualité de chef d'équipe dans le cadre du BTS SIO, coordonnant la modélisation de la base de données, la réalisation des cahiers des charges et l'implémentation de l'architecture logicielle.",
      ],
      coverImage: "/project/associations-manager/am-project-1.png",
      containerHeight: "h350",
      galleryImages: [
        "/project/associations-manager/am-project-2.png",
        "/project/associations-manager/am-project-3.png",
        "/project/associations-manager/am-project-4.png",
      ],
      pdfLinks: [
        {
          title: "Cahier des Charges (CDC)",
          url: "/project/associations-manager/AP3-CDC.pdf",
        },
        {
          title: "Cahier des Charges Fonctionnel (CDCF)",
          url: "/project/associations-manager/AP3-CDF.pdf",
        },
      ],
      order: 2,
    },
    {
      slug: "docs-dev",
      title: "Doc's Dev",
      category: "Collaboration Temps Réel",
      forme: "Application Web",
      year: "2024",
      cadre: "Projet Personnel",
      role: "Développeur Fullstack & Architecture",
      stack: [
        "Next.js",
        "TypeScript",
        "Liveblocks",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      liveUrl: "https://google-doc-ecru.vercel.app",
      shortDescription:
        "Éditeur de documents collaboratif avec synchronisation instantanée multi-utilisateurs.",
      fullDescription: [
        "Doc's Dev est un éditeur de texte collaboratif en ligne inspiré de Google Docs, conçu pour permettre la rédaction et l'édition simultanée de documents techniques entre plusieurs développeurs.",
        "Le défi d'ingénierie majeur repose sur la synchronisation instantanée des curseurs, sélections et modifications grâce à Liveblocks, tout en assurant la gestion des conflits d'écriture, l'authentification sécurisée et la persistance des données sous PostgreSQL.",
        "Développé de bout en bout en Next.js avec TypeScript pour garantir un code modulaire, une interface réactive et une excellente maintenabilité.",
      ],
      coverImage: "/project/docs/docs-project-1.png",
      containerHeight: "h500",
      galleryImages: [
        "/project/docs/docs-project-2.png",
        "/project/docs/docs-project-3.png",
        "/project/docs/docs-project-4.png",
        "/project/docs/docs-project-5.png",
        "/project/docs/docs-project-6.png",
      ],
      pdfLinks: [],
      order: 3,
    },
    {
      slug: "engagement-leucemie",
      title: "Engagement Leucémie",
      category: "Social Impact Engineering",
      forme: "Application Web Solidaire",
      year: "2025",
      cadre: "Bénévolat pour l’association Engagement Leucémie",
      role: "Développeur Fullstack Bénévole",
      stack: [
        "Next.js",
        "TypeScript",
        "React",
        "Nodemailer",
        "Tailwind CSS",
        "Vercel",
      ],
      liveUrl: "https://engagement-leucemie.vercel.app",
      shortDescription:
        "Application web interactive pour la sensibilisation et le don de moelle osseuse.",
      fullDescription: [
        "Engagement Leucémie est une application web conçue et déployée bénévolement pour soutenir l'association éponyme et amplifier la sensibilisation au don vital de moelle osseuse.",
        "La plateforme permet aux utilisateurs de s'informer, de tester leur éligibilité et de générer instantanément des certificats d'engagement personnalisés au format visuel, spécialement optimisés pour un partage viral sur les réseaux sociaux.",
        "Intégration d'un service d'envoi automatisé d'attestations par email via Nodemailer et mise en production continue sur l'infrastructure Vercel pour une disponibilité maximale.",
      ],
      coverImage: "/project/engagement-leucemie/el-project-1.png",
      containerHeight: "h350",
      galleryImages: [
        "/project/engagement-leucemie/el-project-2.png",
        "/project/engagement-leucemie/el-project-3.png",
        "/project/engagement-leucemie/el-project-4.png",
      ],
      pdfLinks: [],
      order: 4,
    },
    {
      slug: "send-it",
      title: "Send-It",
      category: "Développement Backend Natif",
      forme: "Application Web de Transfert",
      year: "2025",
      cadre: "Projet Académique (BTS SIO)",
      role: "Développeur Fullstack",
      stack: ["PHP Natif", "Tailwind CSS", "JavaScript", "HTML5"],
      shortDescription:
        "Service sécurisé de transfert de fichiers éphémère sans framework lourd.",
      fullDescription: [
        "Send-It est une solution de transfert de fichiers éphémère, sécurisée et légère, conçue comme une alternative épurée aux services grand public tels que SwissTransfer ou WeTransfer.",
        "Le choix d'une architecture en PHP pur sans surcharge de framework permet d'atteindre des performances brutes remarquables, avec une gestion fine du streaming de téléversement, du chiffrement des fichiers stockés et de leur suppression automatique à expiration.",
        "Interface soignée et ergonomique développée avec Tailwind CSS et JavaScript vanilla pour assurer un glisser-déposer intuitif et un suivi en direct des barres de progression.",
      ],
      coverImage: "/project/send-it/sendit-project-1.png",
      containerHeight: "h350",
      galleryImages: [
        "/project/send-it/sendit-project-2.png",
        "/project/send-it/sendit-project-3.png",
        "/project/send-it/sendit-project-4.png",
        "/project/send-it/sendit-project-5.png",
        "/project/send-it/sendit-project-6.png",
      ],
      pdfLinks: [
        {
          title: "Cahier des Charges Fonctionnel (CDCF)",
          url: "/project/send-it/CDCF.pdf",
        },
        {
          title: "Charte Graphique",
          url: "/project/send-it/CHARTE_GRAPHIQUE.pdf",
        },
      ],
      order: 5,
    },
    {
      slug: "yotion",
      title: "Yotion",
      category: "Développement Web Fullstack",
      forme: "Application Web & Workroom",
      year: "2024",
      cadre: "Projet Personnel",
      role: "Développeur Fullstack & Design",
      stack: ["Next.js", "React", "PostgreSQL", "Tailwind CSS", "Prisma"],
      liveUrl: "https://yotion-ten.vercel.app",
      shortDescription:
        "Espace de travail tout-en-un avec gestion récursive de notes Markdown et synchronisation.",
      fullDescription: [
        "Yotion est un clone soigné et performant de l'outil de productivité Notion, proposant un espace de travail complet pour la prise de notes structurée, la gestion de tâches et la documentation de projets.",
        "L'application intègre une hiérarchie arborescente récursive infinie de pages, un éditeur de contenu Markdown modulaire par blocs, une authentification sécurisée et une synchronisation réactive des modifications.",
        "Architecture moderne construite sous Next.js et PostgreSQL, mettant l'accent sur la rapidité de chargement, l'accessibilité au clavier et la sobriété esthétique.",
      ],
      coverImage: "/project/yotion/yotion-project-1.png",
      containerHeight: "h450",
      galleryImages: [
        "/project/yotion/yotion-project.png",
        "/project/yotion/yotion-project-3.png",
        "/project/yotion/yotion-project-4.png",
        "/project/yotion/yotion-project-5.png",
        "/project/yotion/yotion-project-6.png",
      ],
      pdfLinks: [],
      order: 6,
    },
  ];

  const projectMap = new Map<string, any>();

  for (const p of rawProjects) {
    const existingProject = await strapi
      .documents("api::project.project")
      .findFirst({
        filters: { slug: p.slug },
      });

    const coverFile = await uploadMediaFile(
      strapi,
      p.coverImage,
      `${p.title} - Image de couverture`,
    );

    const galleryFileIds: number[] = [];
    for (const gPath of p.galleryImages) {
      const gFile = await uploadMediaFile(
        strapi,
        gPath,
        `${p.title} - Galerie`,
      );
      if (gFile) galleryFileIds.push(gFile.id);
    }

    const pdfLinksData: any[] = [];
    for (const pdf of p.pdfLinks) {
      const pdfFile = await uploadMediaFile(strapi, pdf.url, pdf.title);
      pdfLinksData.push({
        title: pdf.title,
        url: pdf.url,
        file: pdfFile ? pdfFile.id : undefined,
      });
    }

    const payload = {
      title: p.title,
      slug: p.slug,
      category: p.category,
      forme: p.forme,
      year: p.year,
      cadre: p.cadre,
      role: p.role,
      stack: p.stack,
      shortDescription: p.shortDescription,
      fullDescription: paragraphsToBlocks(p.fullDescription),
      coverImage: coverFile ? coverFile.id : undefined,
      containerHeight: p.containerHeight as any,
      galleryImages: galleryFileIds,
      liveUrl: (p as any).liveUrl,
      githubUrl: (p as any).githubUrl,
      pdfLinks: pdfLinksData,
      order: p.order,
    };

    let docResult;
    if (!existingProject) {
      docResult = await strapi.documents("api::project.project").create({
        data: payload as any,
        status: "published",
      });
      console.log(`[SEED] Created project: ${p.title}`);
    } else {
      docResult = await strapi.documents("api::project.project").update({
        documentId: existingProject.documentId,
        data: payload as any,
        status: "published",
      });
      console.log(`[SEED] Updated project: ${p.title}`);
    }
    projectMap.set(p.slug, docResult);
  }

  // 3. Seed Documents
  console.log("[SEED] Seeding Documents...");
  const rawDocuments = [
    {
      slug: "cv",
      title: "Curriculum Vitae",
      category: "Parcours & Compétences",
      description:
        "Curriculum Vitae complet de Yulian Guinand, alternant développeur et étudiant en BTS SIO option SLAM.",
      filePath: "/documents/CV.pdf",
      downloadable: true,
      date: "2025",
      order: 1,
    },
    {
      slug: "dossier-e5",
      title: "Dossier Professionnel E5",
      category: "Épreuve BTS SIO",
      description:
        "Dossier technique de support pour l’épreuve E5 documentant la conception et la réalisation de projets logiciels.",
      filePath: "/documents/DOSSIER_EPREUVE_E5.pdf",
      downloadable: true,
      date: "2025",
      order: 2,
    },
    {
      slug: "tableau-competences",
      title: "Tableau de Synthèse & Compétences",
      category: "Référentiel BTS SIO SLAM",
      description:
        "Tableau synoptique détaillant la couverture des compétences du référentiel officiel BTS SIO.",
      filePath: "/documents/DOSSIER_EPREUVE_E5.pdf",
      downloadable: true,
      date: "2025",
      order: 3,
    },
    {
      slug: "presentation-e4",
      title: "Support de Présentation E4",
      category: "Épreuve BTS SIO",
      description:
        "Support de soutenance illustrant le parcours professionnel, les réalisations en entreprise et le contexte organisationnel.",
      filePath: "/documents/DOSSIER_EPREUVE_E5.pdf",
      downloadable: false,
      date: "2025",
      order: 4,
    },
    {
      slug: "veille-technologique",
      title: "Rapport de Veille Technologique",
      category: "Innovation & Méthodologie",
      description:
        "Étude et synthèse méthodologique de veille sur les architectures logicielles modernes, Next.js et la sécurité web.",
      filePath: "/documents/DOSSIER_EPREUVE_E5.pdf",
      downloadable: false,
      date: "2025",
      order: 5,
    },
  ];

  for (const d of rawDocuments) {
    const existingDoc = await strapi
      .documents("api::document.document")
      .findFirst({
        filters: { slug: d.slug },
      });

    const docFile = await uploadMediaFile(strapi, d.filePath, d.title);

    const docPayload = {
      title: d.title,
      slug: d.slug,
      category: d.category,
      description: d.description,
      file: docFile ? docFile.id : undefined,
      downloadable: d.downloadable,
      date: d.date,
      order: d.order,
    };

    if (!existingDoc) {
      await strapi.documents("api::document.document").create({
        data: docPayload as any,
        status: "published",
      });
      console.log(`[SEED] Created document: ${d.title}`);
    } else {
      await strapi.documents("api::document.document").update({
        documentId: existingDoc.documentId,
        data: docPayload as any,
        status: "published",
      });
      console.log(`[SEED] Updated document: ${d.title}`);
    }
  }

  // 4. Seed Photos
  console.log("[SEED] Seeding Photos...");
  const rawPhotos = [
    {
      src: "/project/competia/competia-project-1.png",
      alt: "Competia - Tableau de bord analyse ATS",
      slug: "competia",
    },
    {
      src: "/project/send-it/sendit-project-1.png",
      alt: "Send-It - Interface de transfert de fichiers",
      slug: "send-it",
    },
    {
      src: "/project/associations-manager/am-project-2.png",
      alt: "Association Manager - Vue administrative WPF",
      slug: "associations-manager",
    },
    {
      src: "/project/docs/docs-project-2.png",
      alt: "Doc’s Dev - Édition collaborative Liveblocks",
      slug: "docs-dev",
    },
    {
      src: "/project/yotion/yotion-project.png",
      alt: "Yotion - Vue arborescente et blocs",
      slug: "yotion",
    },
    {
      src: "/project/engagement-leucemie/el-project-2.png",
      alt: "Engagement Leucémie - Certificat de donateur",
      slug: "engagement-leucemie",
    },
    {
      src: "/project/competia/competia-project-4.png",
      alt: "Competia - Détection sémantique de mots-clés",
      slug: "competia",
    },
    {
      src: "/project/associations-manager/am-project-1.png",
      alt: "Association Manager - Accueil du portail",
      slug: "associations-manager",
    },
    {
      src: "/project/docs/docs-project-1.png",
      alt: "Doc’s Dev - Vue d’ensemble du document",
      slug: "docs-dev",
    },
    {
      src: "/project/yotion/yotion-project-3.png",
      alt: "Yotion - Interface d’écriture sombre",
      slug: "yotion",
    },
    {
      src: "/project/send-it/sendit-project-3.png",
      alt: "Send-It - Barre de progression en streaming",
      slug: "send-it",
    },
    {
      src: "/project/competia/competia-project-2.png",
      alt: "Competia - Métriques de compatibilité",
      slug: "competia",
    },
    {
      src: "/project/engagement-leucemie/el-project-3.png",
      alt: "Engagement Leucémie - Visualisation mobile",
      slug: "engagement-leucemie",
    },
    {
      src: "/project/docs/docs-project-5.png",
      alt: "Doc’s Dev - Curseurs multi-utilisateurs",
      slug: "docs-dev",
    },
    {
      src: "/project/yotion/yotion-project-1.png",
      alt: "Yotion - Espace de travail connecté",
      slug: "yotion",
    },
    {
      src: "/project/engagement-leucemie/el-project-1.png",
      alt: "Engagement Leucémie - Landing page solidaire",
      slug: "engagement-leucemie",
    },
    {
      src: "/project/competia/competia-project-3.png",
      alt: "Competia - Recommandations pour candidats",
      slug: "competia",
    },
    {
      src: "/project/send-it/sendit-project-4.png",
      alt: "Send-It - Génération de lien temporaire chiffré",
      slug: "send-it",
    },
    {
      src: "/project/associations-manager/am-project-3.png",
      alt: "Association Manager - Gestion des adhérents",
      slug: "associations-manager",
    },
    {
      src: "/project/docs/docs-project-4.png",
      alt: "Doc’s Dev - Modal de permissions et partage",
      slug: "docs-dev",
    },
    {
      src: "/project/yotion/yotion-project-4.png",
      alt: "Yotion - Mise en page typographique markdown",
      slug: "yotion",
    },
  ];

  let orderCount = 1;
  for (const ph of rawPhotos) {
    const existingPhoto = await strapi.documents("api::photo.photo").findFirst({
      filters: { alt: ph.alt },
    });

    const photoFile = await uploadMediaFile(strapi, ph.src, ph.alt);
    if (!photoFile) continue;

    const linkedProj = projectMap.get(ph.slug);

    const photoPayload = {
      image: photoFile.id,
      alt: ph.alt,
      project: linkedProj ? linkedProj.documentId : undefined,
      order: orderCount++,
    };

    if (!existingPhoto) {
      await strapi.documents("api::photo.photo").create({
        data: photoPayload as any,
        status: "published",
      });
      console.log(`[SEED] Created photo: ${ph.alt}`);
    } else {
      await strapi.documents("api::photo.photo").update({
        documentId: existingPhoto.documentId,
        data: photoPayload as any,
        status: "published",
      });
    }
  }

  console.log("[SEED] Database seeding finished successfully!");
}
