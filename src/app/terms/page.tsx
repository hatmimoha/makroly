import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of Service for Makroly — the open-source PDF annotation tool for generative AI training data.",
    alternates: { canonical: "https://makroly.com/terms" },
};

export default function TermsPage() {
    const lastUpdated = "April 14, 2026";

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Nav */}
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl shadow-sm">
                <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
                    <Link href="/">
                        <Image src="/logo.png" alt="Makroly" width={120} height={36} className="h-9 w-auto object-contain" />
                    </Link>
                    <Link href="/" className="text-sm text-slate-500 transition-colors hover:text-[#1a6fc4]">
                        ← Back to home
                    </Link>
                </nav>
            </header>

            <main className="mx-auto max-w-3xl px-6 py-16">
                <h1 className="text-4xl font-black text-[#0f2d5e] mb-2">Terms of Service</h1>
                <p className="text-sm text-slate-400 mb-10">Last updated: {lastUpdated}</p>

                <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using Makroly at <a href="https://makroly.com" className="text-[#1a6fc4] hover:underline">https://makroly.com</a> (the &quot;Service&quot;),
                            you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">2. Description of Service</h2>
                        <p>
                            Makroly is a free, open-source, browser-based PDF annotation tool designed to help individuals and teams prepare
                            structured training data for generative AI and machine learning models. The Service allows users to load PDF documents,
                            define annotation schemas, annotate document content, and export structured JSON datasets — all processed
                            locally in the user&apos;s browser.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">3. Open Source License</h2>
                        <p>
                            Makroly is open-source software licensed under the{" "}
                            <a href="https://github.com/hatmimoha/makroly/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-[#1a6fc4] hover:underline">
                                Apache 2.0 License
                            </a>. You are free to use, modify, and distribute the source code in accordance with the terms of that license.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">4. Use of the Service</h2>
                        <p>You agree to use the Service only for lawful purposes. You must not:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Use the Service in any way that violates applicable local, national, or international laws or regulations.</li>
                            <li>Upload PDFs containing content that infringes on the intellectual property rights of others.</li>
                            <li>Attempt to reverse-engineer, tamper with, or disrupt the Service.</li>
                            <li>Use the Service to process documents you are not authorized to access.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">5. Local Processing & No Data Collection</h2>
                        <p>
                            All PDF processing, annotation, and JSON export functionality operates entirely within your browser.
                            No documents, annotation data, or personal information are transmitted to our servers.
                            We do not store, read, or have access to any files you load into Makroly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">6. Disclaimer of Warranties</h2>
                        <p>
                            The Service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied,
                            including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                            We do not guarantee that the Service will be uninterrupted, error-free, or free of harmful components.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">7. Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, Makroly and its contributors shall not be liable for any indirect, incidental,
                            special, consequential, or punitive damages arising out of or related to your use of the Service,
                            even if advised of the possibility of such damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">8. Changes to Terms</h2>
                        <p>
                            We reserve the right to update these Terms of Service at any time. Changes will be reflected by updating
                            the &quot;Last updated&quot; date at the top of this page. Continued use of the Service after any changes
                            constitutes your acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">9. Contact</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:{" "}
                            <a href="mailto:textorch@gmail.com" className="text-[#1a6fc4] hover:underline">textorch@gmail.com</a>
                        </p>
                    </section>

                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-100 bg-slate-50 px-6 py-8 mt-8">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center text-sm text-slate-400">
                    <p>© {new Date().getFullYear()} Makroly · <Link href="/privacy" className="hover:text-[#1a6fc4]">Privacy Policy</Link> · <Link href="/terms" className="hover:text-[#1a6fc4] font-medium text-[#1a6fc4]">Terms of Service</Link></p>
                </div>
            </footer>
        </div>
    );
}
