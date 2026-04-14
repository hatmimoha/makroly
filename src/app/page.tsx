import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Makroly — Smart PDF Annotation for Generative AI Training Data",
  description:
    "Makroly is a schema-driven PDF annotation tool built for AI teams. Define custom entity schemas, annotate PDF documents with precision, and export structured JSON training data — ready for LLMs, document AI, and information extraction models.",
  alternates: {
    canonical: "https://makroly.com",
  },
  openGraph: {
    title: "Makroly — Smart PDF Annotation for Generative AI Training Data",
    description:
      "Define schemas, annotate PDFs, and export clean structured JSON for training LLMs and document AI models. Faster, smarter, schema-driven.",
    url: "https://makroly.com",
    images: [
      {
        url: "/makroly.png",
        width: 1200,
        height: 630,
        alt: "Makroly — Smart PDF Annotation for Generative AI Training Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Makroly — Smart PDF Annotation for Generative AI Training Data",
    description:
      "Schema-driven PDF annotation designed for AI training data. Annotate, structure, export. Built for AI teams.",
    images: ["/makroly.png"],
  },
  keywords: [
    "PDF annotation tool",
    "generative AI training data",
    "document annotation software",
    "LLM dataset preparation",
    "information extraction annotation",
    "named entity recognition",
    "AI data labeling",
    "structured data annotation",
    "document AI training",
    "PDF labeling tool",
  ],
};

export default function Home() {
  return <LandingPage />;
}
