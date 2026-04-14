import type { Metadata } from "next";
import App from '@/components/App';

export const metadata: Metadata = {
    title: "Makroly — PDF Annotation Workspace",
    description: "Annotate your PDF documents with structured schemas to generate high-quality training data for generative AI models.",
    robots: "noindex",
};

export default function AppPage() {
    return <App />;
}
