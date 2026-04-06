"use client";
import DocumentCard from "./DocumentCard";
import { documentsData } from "./documentsData";
import "./DocumentsSection.css";

const DocumentsSection = () => {
  return (
    <section className="documents-section">
      <div className="documents-container">
        <div className="documents-header">
          <h2 className="documents-title">Documents BTS SIO</h2>
          <p className="documents-subtitle">
            Accède à tous mes documents et ressources pour le BTS SIO
          </p>
        </div>

        <div className="documents-grid">
          {documentsData.map((doc, index) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              icon={doc.icon}
              color={doc.color}
              href={doc.href}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
