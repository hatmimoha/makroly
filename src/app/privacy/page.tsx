import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Makroly — all PDF processing happens locally in your browser. No data is uploaded or stored.",
    alternates: { canonical: "https://makroly.com/privacy" },
};

export default function PrivacyPage() {
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
                <h1 className="text-4xl font-black text-[#0f2d5e] mb-2">Privacy Policy</h1>
                <p className="text-sm text-slate-400 mb-10">Last updated: {lastUpdated}</p>

                {/* highlight box */}
                <div className="mb-10 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                    <p className="text-sm font-semibold text-cyan-800">
                        🔒 <strong>Short version:</strong> Makroly processes everything locally in your browser.
                        We do not collect, transmit, or store your documents, annotations, or any personal data.
                    </p>
                </div>

                <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">1. Overview</h2>
                        <p>
                            Makroly (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website{" "}
                            <a href="https://makroly.com" className="text-[#1a6fc4] hover:underline">https://makroly.com</a> and
                            the open-source PDF annotation tool available at{" "}
                            <a href="https://makroly.com/app" className="text-[#1a6fc4] hover:underline">https://makroly.com/app</a>.
                            This Privacy Policy explains what information we collect (and what we do not), and how we handle it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">2. Information We Do NOT Collect</h2>
                        <p>Makroly is designed with privacy as a core principle. We do <strong>not</strong> collect:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li><strong>Your PDF documents</strong> — files are loaded and rendered entirely in your browser and never transmitted to any server.</li>
                            <li><strong>Your annotations or schemas</strong> — all annotation data stays in your browser&apos;s memory and is exported directly to your local machine.</li>
                            <li><strong>Account or login information</strong> — Makroly requires no account, no email, and no sign-up of any kind.</li>
                            <li><strong>Payment information</strong> — the Service is completely free.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">3. Information We May Collect</h2>
                        <p>
                            Like most websites, our hosting infrastructure may automatically collect standard server logs, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>IP address (anonymized)</li>
                            <li>Browser type and version</li>
                            <li>Pages visited and time of visit</li>
                            <li>Referring URL</li>
                        </ul>
                        <p className="mt-3">
                            This information is used solely for security monitoring and understanding aggregate traffic patterns.
                            It is not linked to any personal identity and is not sold or shared with third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">4. Cookies</h2>
                        <p>
                            Makroly does not use tracking cookies, advertising cookies, or third-party analytics cookies.
                            The site may use essential session cookies required for the browser application to function correctly.
                            These cookies contain no personally identifiable information and are not used for tracking purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">5. Third-Party Services</h2>
                        <p>
                            Makroly is hosted on standard web infrastructure. We do not integrate any third-party analytics platforms
                            (e.g. Google Analytics), advertising networks, or data brokers. External fonts are loaded from Google Fonts,
                            which may log your IP address as part of their CDN service — see{" "}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1a6fc4] hover:underline">
                                Google&apos;s Privacy Policy
                            </a>{" "}for details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">6. Data Security</h2>
                        <p>
                            Because Makroly does not store or transmit your document data, there is no risk of a data breach
                            exposing your annotated documents or PDFs. All sensitive work remains entirely on your local device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">7. Children&apos;s Privacy</h2>
                        <p>
                            Makroly is not directed at children under the age of 13. We do not knowingly collect any information
                            from children under 13. If you believe a child has provided us with personal information, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">8. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Changes will be indicated by updating the
                            &quot;Last updated&quot; date at the top of this page. We encourage you to review this page periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0f2d5e] mb-3">9. Contact Us</h2>
                        <p>
                            If you have any questions or concerns about this Privacy Policy, please reach out at:{" "}
                            <a href="mailto:textorch@gmail.com" className="text-[#1a6fc4] hover:underline">textorch@gmail.com</a>
                        </p>
                    </section>

                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-100 bg-slate-50 px-6 py-8 mt-8">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center text-sm text-slate-400">
                    <p>© {new Date().getFullYear()} Makroly · <Link href="/privacy" className="hover:text-[#1a6fc4] font-medium text-[#1a6fc4]">Privacy Policy</Link> · <Link href="/terms" className="hover:text-[#1a6fc4]">Terms of Service</Link></p>
                </div>
            </footer>
        </div>
    );
}
