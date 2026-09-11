import { getDocuments, getStrapiMediaUrl } from "@/lib/strapi";
import { Metadata } from "next";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "Téléchargez le Curriculum Vitae, le dossier professionnel E5 et les ressources académiques de Yulian Guinand.",
  alternates: {
    canonical: "https://yulianguinand.fr/documents",
  },
  openGraph: {
    title: "Documents — Yulian Guinand",
    description:
      "Téléchargez le Curriculum Vitae, le dossier professionnel E5 et les ressources académiques de Yulian Guinand.",
    url: "https://yulianguinand.fr/documents",
  },
};

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <div className="container page-documents">
      <header className="documents-header">
        <h1>Documents</h1>
        <p>
          Ressources professionnelles, curriculum vitae et dossiers de Yulian
          Guinand.
        </p>
      </header>

      {documents.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "6em 1em",
            color: "var(--dark-text-secondary)",
            minHeight: "40vh",
          }}
        >
          <p>Aucun document disponible pour le moment.</p>
        </div>
      ) : (
        <section className="documents-grid" aria-label="Liste des documents">
          {documents.map((doc) => {
            const fileUrl = doc.file ? getStrapiMediaUrl(doc.file) : "#";
            const fileName = doc.file?.name || `${doc.title}.pdf`;

            return (
              <article key={doc.id || doc.slug} className="document-card">
                <div className="document-card-info">
                  <span className="document-card-badge">{doc.category}</span>
                  <h2 className="document-card-title">{doc.title}</h2>
                  <p className="document-card-desc">{doc.description}</p>
                </div>

                <div className="document-card-action">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-download-btn"
                    download={doc.downloadable ? fileName : undefined}
                    aria-label={`${doc.downloadable ? "Télécharger" : "Consulter"} ${doc.title}`}
                  >
                    {doc.downloadable ? (
                      <>
                        <FaDownload size="12px" />
                        <span>Télécharger</span>
                      </>
                    ) : (
                      <>
                        <FaExternalLinkAlt size="12px" />
                        <span>Consulter</span>
                      </>
                    )}
                  </a>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <div className="white-space" aria-hidden="true"></div>
    </div>
  );
}
