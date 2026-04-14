'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github } from 'lucide-react';

/* ─── badge ─── */
function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-600">
            {children}
        </span>
    );
}

/* ─── animated counter ─── */
function useCountUp(target: number, duration = 1400) {
    const [value, setValue] = React.useState(0);
    const started = useRef(false);
    useEffect(() => {
        if (started.current) return;
        started.current = true;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setValue(Math.floor(current));
            if (current >= target) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return value;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const v = useCountUp(value);
    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-black text-[#0f2d5e]">
                {v}<span className="text-cyan-500">{suffix}</span>
            </span>
            <span className="text-sm text-slate-500">{label}</span>
        </div>
    );
}

/* ─── feature card ─── */
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-md hover:shadow-cyan-500/10">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 text-2xl">
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-bold text-[#0f2d5e]">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-500">{description}</p>
        </div>
    );
}

/* ─── step ─── */
function StepCard({ num, title, description }: { num: string; title: string; description: string }) {
    return (
        <div className="relative flex gap-5">
            <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1a6fc4] to-cyan-400 text-sm font-black text-white shadow-md shadow-cyan-400/30">
                    {num}
                </div>
                <div className="mt-2 w-px flex-1 bg-gradient-to-b from-cyan-300 to-transparent" />
            </div>
            <div className="pb-10">
                <h3 className="mb-1 text-lg font-bold text-[#0f2d5e]">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
        </div>
    );
}

/* ─── comparison row ─── */
function CompRow({ feature, traditional, makroly }: { feature: string; traditional: string; makroly: string }) {
    return (
        <tr className="border-t border-slate-100 transition-colors hover:bg-slate-50/60">
            <td className="py-4 pl-6 pr-4 text-sm font-medium text-slate-700">{feature}</td>
            <td className="py-4 pr-4 text-center">
                <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs text-red-500">{traditional}</span>
            </td>
            <td className="py-4 pr-6 text-center">
                <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-600">{makroly}</span>
            </td>
        </tr>
    );
}

/* ═══════════════════════════════════════════════════
   MAIN LANDING PAGE
═══════════════════════════════════════════════════ */
export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* ── Nav ── */}
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl shadow-sm">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3" aria-label="Main navigation">
                    <a href="/">
                        <Image src="/logo.png" alt="Makroly logo" width={140} height={40} className="h-10 w-auto object-contain" priority />
                    </a>
                    <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
                        <a href="#features" className="transition-colors hover:text-[#1a6fc4]">Features</a>
                        <a href="#how-it-works" className="transition-colors hover:text-[#1a6fc4]">How it works</a>
                        <a href="#comparison" className="transition-colors hover:text-[#1a6fc4]">Comparison</a>
                    </div>
                    <Link
                        href="/app"
                        className="rounded-lg bg-gradient-to-r from-[#1a6fc4] to-cyan-400 px-5 py-2 text-sm font-bold text-white shadow-md shadow-cyan-400/20 transition-all hover:scale-105 hover:shadow-cyan-400/40"
                    >
                        Open Annotator →
                    </Link>
                </nav>
            </header>

            <main>

                {/* ── Hero ── */}
                <section className="relative overflow-hidden px-6 pb-24 pt-20 text-center" aria-label="Hero">
                    {/* subtle background decoration */}
                    <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-gradient-to-b from-cyan-50 to-transparent blur-3xl opacity-70" />
                    <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-blue-50 blur-[80px]" />

                    <div className="relative mx-auto max-w-4xl">
                        <Badge>AI Data Preparation · PDF Annotation</Badge>

                        <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-[#0f2d5e] md:text-7xl">
                            Annotate PDFs.{' '}
                            <span className="bg-gradient-to-r from-[#1a6fc4] to-cyan-500 bg-clip-text text-transparent">
                                Train Better AI.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
                            Makroly is a precision PDF annotation platform built for AI teams.
                            Define custom entity schemas, highlight structured information from any document, and export
                            clean JSON datasets — ready to fine-tune your language models and document AI pipelines.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/app"
                                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1a6fc4] to-cyan-400 px-8 py-4 text-base font-bold text-white shadow-lg shadow-cyan-400/25 transition-all hover:scale-105 hover:shadow-cyan-400/40"
                            >
                                Start Annotating Free
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                            <a
                                href="#how-it-works"
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-600 shadow-sm transition-all hover:border-cyan-300 hover:text-[#1a6fc4] hover:shadow-md"
                            >
                                See how it works
                            </a>
                        </div>

                        {/* hero screenshot */}
                        <div className="mx-auto mt-16 flex justify-center">
                            <div className="relative rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-200">
                                <Image
                                    src="/makroly.png"
                                    alt="Makroly PDF annotation workspace screenshot"
                                    width={900}
                                    height={520}
                                    className="rounded-xl object-cover w-full max-w-3xl"
                                    priority
                                />
                            </div>
                        </div>

                        {/* stats */}
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-slate-100 pt-12">
                            <StatCard value={5} suffix="×" label="Faster than manual labeling" />
                            <StatCard value={100} suffix="%" label="Locally processed — private" />
                            <StatCard value={0} suffix="" label="Setup required — open in browser" />
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <section id="features" className="bg-slate-50/60 px-6 py-24" aria-labelledby="features-heading">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <Badge>Features</Badge>
                            <h2 id="features-heading" className="mt-4 text-4xl font-black tracking-tight text-[#0f2d5e]">
                                Everything your AI team needs
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl text-slate-500">
                                Purpose-built for the specific challenges of creating structured training data from real-world PDF documents.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <FeatureCard icon="🗂️" title="Schema-Driven Annotation"
                                description="Define named entity types with typed properties (text, number, date, enum). Every annotation is validated against your schema — no free-form noise." />
                            <FeatureCard icon="🖊️" title="Precise Text Span Selection"
                                description="Select exact text fragments from rendered PDFs with pixel-perfect accuracy. Supports multi-span annotations for discontinuous evidence." />
                            <FeatureCard icon="🏗️" title="Implicit Object Support"
                                description="Annotate entities implied by context but not explicitly mentioned — critical for comprehensive document understanding model training." />
                            <FeatureCard icon="📤" title="Structured JSON Export"
                                description="Export annotations as clean, schema-aligned JSON ready to feed directly into your fine-tuning or RAG pipelines. No post-processing needed." />
                            <FeatureCard icon="🔄" title="Schema Import / Export"
                                description="Save and reuse annotation schemas across documents and projects. Share schemas with your team for consistent multi-annotator datasets." />
                            <FeatureCard icon="🔒" title="100% Browser-Based & Private"
                                description="No server uploads. Your PDFs and annotations never leave your device. Fully local processing — compliant with sensitive data policies." />
                        </div>
                    </div>
                </section>

                {/* ── How it works ── */}
                <section id="how-it-works" className="px-6 py-24" aria-labelledby="how-heading">
                    <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2 lg:items-start">
                        <div>
                            <Badge>Workflow</Badge>
                            <h2 id="how-heading" className="mt-4 text-4xl font-black tracking-tight text-[#0f2d5e]">
                                From PDF to training data in minutes
                            </h2>
                            <p className="mt-3 text-slate-500">
                                A streamlined four-step workflow that replaces error-prone spreadsheet annotation with a structured, repeatable process.
                            </p>

                            <div className="mt-10">
                                <StepCard num="1" title="Upload your PDF"
                                    description="Open any PDF document directly in the browser. Pages render with full fidelity — tables, figures, and mixed layouts all supported." />
                                <StepCard num="2" title="Define your schema"
                                    description="Create entity types matching your domain — invoices, contracts, medical reports, patents. Add typed properties and mark which are required." />
                                <StepCard num="3" title="Annotate with precision"
                                    description="Select text ranges on the PDF to link them to entities. Fill in property values. Add implicit objects for inferred information." />
                                <StepCard num="4" title="Export structured JSON"
                                    description="One click exports your complete annotation set as structured JSON, perfectly aligned with your schema. LLM-ready, immediately." />
                            </div>
                        </div>

                        {/* JSON mock */}
                        <div className="relative rounded-2xl border border-slate-100 bg-white p-1 shadow-xl shadow-slate-200/80 lg:sticky lg:top-24">
                            <div className="flex items-center gap-1.5 rounded-t-xl bg-slate-50 px-4 py-3 border-b border-slate-100">
                                <span className="h-3 w-3 rounded-full bg-red-400" />
                                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                                <span className="ml-3 text-xs text-slate-400 font-mono">makroly — annotation export</span>
                            </div>
                            <div className="rounded-b-xl bg-[#0f1f35] p-4 font-mono text-xs leading-7 text-slate-300">
                                <div className="mb-2 text-slate-500">{'// Exported annotation (JSON)'}</div>
                                <div><span className="text-cyan-400">{'{'}</span></div>
                                <div className="pl-4"><span className="text-[#3b9eff]">&quot;schema&quot;</span><span>: &quot;</span><span className="text-emerald-400">invoice_extraction_v2</span><span>&quot;,</span></div>
                                <div className="pl-4"><span className="text-[#3b9eff]">&quot;entities&quot;</span><span>: [</span></div>
                                <div className="pl-8"><span className="text-cyan-400">{'{'}</span></div>
                                <div className="pl-12"><span className="text-[#3b9eff]">&quot;type&quot;</span><span>: &quot;</span><span className="text-emerald-400">LineItem</span><span>&quot;,</span></div>
                                <div className="pl-12"><span className="text-[#3b9eff]">&quot;spans&quot;</span><span>: [[142, 198]],</span></div>
                                <div className="pl-12"><span className="text-[#3b9eff]">&quot;properties&quot;</span><span>: </span><span className="text-cyan-400">{'{'}</span></div>
                                <div className="pl-16"><span className="text-[#3b9eff]">&quot;description&quot;</span><span>: &quot;</span><span className="text-amber-300">Cloud Hosting — Q1</span><span>&quot;,</span></div>
                                <div className="pl-16"><span className="text-[#3b9eff]">&quot;amount&quot;</span><span>: </span><span className="text-amber-300">4800</span><span>,</span></div>
                                <div className="pl-16"><span className="text-[#3b9eff]">&quot;currency&quot;</span><span>: &quot;</span><span className="text-amber-300">EUR</span><span>&quot;</span></div>
                                <div className="pl-12"><span className="text-cyan-400">{'}'}</span></div>
                                <div className="pl-8"><span className="text-cyan-400">{'}'}</span></div>
                                <div className="pl-4"><span>]</span></div>
                                <div><span className="text-cyan-400">{'}'}</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Comparison ── */}
                <section id="comparison" className="bg-slate-50/60 px-6 py-24" aria-labelledby="comparison-heading">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <Badge>Why Makroly</Badge>
                            <h2 id="comparison-heading" className="mt-4 text-4xl font-black tracking-tight text-[#0f2d5e]">
                                Built for AI, not for manual review
                            </h2>
                            <p className="mx-auto mt-3 max-w-xl text-slate-500">
                                Traditional tools were designed for human review workflows — not for producing machine-readable training data for generative AI.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                        <th className="py-4 pl-6 text-left text-sm font-semibold text-slate-500">Capability</th>
                                        <th className="py-4 text-center text-sm font-semibold text-slate-500">Traditional Tools</th>
                                        <th className="py-4 pr-6 text-center text-sm font-semibold">
                                            <span className="bg-gradient-to-r from-[#1a6fc4] to-cyan-500 bg-clip-text text-transparent">Makroly</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CompRow feature="Schema-driven entity types" traditional="❌ Free-form" makroly="✅ Structured schemas" />
                                    <CompRow feature="Typed properties on entities" traditional="❌ Not supported" makroly="✅ Text, number, date, enum" />
                                    <CompRow feature="Implicit / inferred entities" traditional="❌ Span-only" makroly="✅ Full implicit object support" />
                                    <CompRow feature="JSON export for AI pipelines" traditional="⚠️ Requires conversion" makroly="✅ Native structured JSON" />
                                    <CompRow feature="Schema reuse across documents" traditional="❌ Manual duplication" makroly="✅ Import / export schemas" />
                                    <CompRow feature="Data privacy" traditional="⚠️ Cloud upload required" makroly="✅ 100% local — no uploads" />
                                    <CompRow feature="Setup complexity" traditional="⚠️ Account + configuration" makroly="✅ Open browser and go" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ── Use cases ── */}
                <section className="px-6 py-24" aria-labelledby="usecases-heading">
                    <div className="mx-auto max-w-5xl text-center">
                        <Badge>Use Cases</Badge>
                        <h2 id="usecases-heading" className="mt-4 text-4xl font-black tracking-tight text-[#0f2d5e]">
                            What teams use Makroly for
                        </h2>
                        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
                            {[
                                { emoji: '📄', title: 'Invoice & Receipt Processing', desc: 'Annotate line items, totals, vendors, and dates for document extraction model training.' },
                                { emoji: '⚖️', title: 'Legal Contract Analysis', desc: 'Tag clauses, parties, obligations, and dates to build contract review AI.' },
                                { emoji: '🏥', title: 'Medical Report Extraction', desc: 'Label diagnoses, medications, and patient data from clinical PDFs for healthcare AI.' },
                                { emoji: '🔬', title: 'Scientific Literature Mining', desc: 'Extract methods, findings, and citations from research papers for knowledge graphs.' },
                            ].map(({ emoji, title, desc }) => (
                                <div key={title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-cyan-200 hover:-translate-y-1 hover:shadow-md duration-200">
                                    <div className="mb-3 text-3xl">{emoji}</div>
                                    <h3 className="mb-2 font-bold text-[#0f2d5e]">{title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="px-6 py-24" aria-labelledby="cta-heading">
                    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2d5e] to-[#1a4a8a] p-12 text-center shadow-2xl shadow-blue-900/20">
                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-transparent to-cyan-400/10" />

                        <div className="relative mb-6 flex justify-center">
                            <Image src="/logo.png" alt="Makroly" width={180} height={50} className="h-12 w-auto object-contain brightness-200 invert" />
                        </div>

                        <h2 id="cta-heading" className="relative text-4xl font-black tracking-tight text-white md:text-5xl">
                            Ready to build your{' '}
                            <span className="bg-gradient-to-r from-[#3b9eff] to-cyan-400 bg-clip-text text-transparent">
                                AI training dataset?
                            </span>
                        </h2>
                        <p className="relative mx-auto mt-4 max-w-lg text-blue-200">
                            No sign-up. No cloud uploads. Open Makroly in your browser right now and start annotating in seconds.
                        </p>
                        <Link
                            href="/app"
                            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3b9eff] to-cyan-400 px-10 py-4 text-base font-bold text-white shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-400/50"
                        >
                            Open the Annotator — it&apos;s free →
                        </Link>
                    </div>
                </section>

            </main>

            {/* ── Footer ── */}
            <footer className="border-t border-slate-100 bg-slate-50 px-6 py-10">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center text-sm text-slate-400">
                    <Image src="/logo.png" alt="Makroly" width={120} height={36} className="h-8 w-auto object-contain opacity-70" />
                    <p>Smart PDF Annotation for Generative AI Training Data</p>
                    <a
                        href="https://github.com/hatmimoha/makroly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-600 transition-all hover:border-slate-300 hover:text-[#1a6fc4] hover:shadow-sm"
                    >
                        <Github className="h-4 w-4" />
                        <span className="text-sm font-medium">hatmimoha/makroly</span>
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-400">
                        <span>© {new Date().getFullYear()} Makroly</span>
                        <span className="hidden sm:inline text-slate-200">·</span>
                        <Link href="/privacy" className="transition-colors hover:text-[#1a6fc4]">Privacy Policy</Link>
                        <span className="hidden sm:inline text-slate-200">·</span>
                        <Link href="/terms" className="transition-colors hover:text-[#1a6fc4]">Terms of Service</Link>
                        <span className="hidden sm:inline text-slate-200">·</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}
