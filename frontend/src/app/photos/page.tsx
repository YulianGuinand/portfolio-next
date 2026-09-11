import { getPhotos } from "@/lib/strapi";
import { Metadata } from "next";
import PhotosClient from "./PhotosClient";

export const metadata: Metadata = {
  title: "Galerie Photos & Interfaces",
  description:
    "Galerie visuelle des interfaces, maquettes et réalisations logicielles développées par Yulian Guinand.",
  alternates: {
    canonical: "https://yulianguinand.fr/photos",
  },
  openGraph: {
    title: "Galerie Photos & Interfaces — Yulian Guinand",
    description:
      "Galerie visuelle des interfaces, maquettes et réalisations logicielles développées par Yulian Guinand.",
    url: "https://yulianguinand.fr/photos",
  },
};

export default async function PhotosPage() {
  const photos = await getPhotos();
  return <PhotosClient photos={photos} />;
}
