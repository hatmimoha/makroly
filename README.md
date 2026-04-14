# Makroly — Schema-Driven PDF Annotation for Generative AI Training Data

<p align="center">
  <img src="public/logo.png" alt="Makroly Logo" width="320" />
</p>

<p align="center">
  <strong>The open-source PDF annotation tool built for AI teams preparing training datasets.</strong><br/>
  Define schemas · Annotate documents · Export structured JSON · Fine-tune your models.
</p>

<p align="center">
  <a href="https://makroly.com">🌐 Try it live at makroly.com</a> ·
  <a href="#-getting-started">Quick Start</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-output-format">Output Format</a> ·
  <a href="#-use-cases">Use Cases</a> ·
  <a href="#-contributing">Contributing</a>
</p>

---

## What is Makroly?

**Makroly** is a free, open-source, browser-based PDF annotation tool designed specifically for **preparing training data for generative AI models**, large language models (LLMs), and document AI pipelines.

Unlike general-purpose annotation tools, Makroly is built around a **schema-first philosophy**: before you annotate a single word, you define what your entities are, what properties they carry, and what types those properties must be. Every annotation is then validated against that schema — producing clean, consistent, machine-readable JSON output that you can feed directly into your fine-tuning or RAG (Retrieval-Augmented Generation) pipelines.

Everything runs **100% in your browser**. No account required. No server uploads. Your documents never leave your machine.

> 🚀 **[Try Makroly now at https://makroly.com](https://makroly.com)** — no sign-up, open right in the browser.

---

## ✨ Features

### 🗂️ Schema-Driven Annotation
Define custom entity types with named, typed properties before you start annotating. Supported property types:

| Type | Description |
|------|-------------|
| `string` | Free text values |
| `number` | Numeric values (integers or decimals) |
| `date` | Date values |
| `boolean` | True/false flags |
| `enum` | A fixed set of accepted values you define |

Each property can be marked as **required** or optional, and enum types enforce a whitelist of accepted values.

### 🖊️ Precise Text Span Selection
Select exact text fragments directly from the rendered PDF. Annotations are linked to the precise character positions (`start`, `end`) and visual bounding boxes (`rect`) of the selected text — across any page of the document.

Multi-span support means a single entity can reference **discontinuous pieces of text** — perfect for entities that span across table cells, columns, or non-contiguous paragraphs.

### 🏗️ Implicit / Inferred Object Support
Some entities are implied by the document but not explicitly stated. Makroly supports **implicit annotations** — entities that carry structured property data without a text span. This is critical for training models that need to understand document-level context, not just surface-level extraction.

### 📤 One-Click JSON Export
Export your complete annotation session as a structured JSON file. The output schema mirrors your defined entity schema exactly — no post-processing, no format conversion needed. Directly ingestible by most fine-tuning frameworks.

### 🔄 Schema Import / Export
Save your schema as a JSON file and reload it in future sessions or share it with your team. Guarantees annotation consistency across multiple annotators and document batches.

### 🔒 100% Local & Private
Makroly is entirely browser-based. PDFs are loaded via the FileReader API and rendered locally using `react-pdf`. **No data is uploaded to any server.** This makes it suitable for annotating sensitive documents — medical records, legal contracts, financial reports — without any compliance concerns.

---

## 🚀 Getting Started

### Try it online (no setup needed)

👉 **[https://makroly.com](https://makroly.com)**

Open the link, load a PDF, and start annotating in seconds.

---

### Run it locally

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/hatmimoha/makroly.git
cd makroly

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000/app](http://localhost:3000/app) in your browser.

---

## 🛠️ How It Works

### Step 1 — Load a PDF

Click **Load PDF** in the top bar and select any PDF file from your machine. The document renders page by page in the main viewer.

### Step 2 — Define Your Schema

Switch to the **Schema** tab in the right panel. Click **+** to add a new entity type. For each entity type, you can:

- Set a name (e.g. `Invoice`, `LineItem`, `Party`, `Clause`)
- Choose a highlight color for visual distinction
- Add typed properties (e.g. `amount: number`, `currency: enum[EUR, USD, GBP]`, `date: date`)
- Mark properties as required

Example schema for invoice annotation:

```json
{
  "objectTypes": [
    {
      "name": "Invoice",
      "color": "#3b82f6",
      "properties": [
        { "name": "invoice_number", "type": "string", "required": true },
        { "name": "issue_date", "type": "date", "required": true },
        { "name": "total_amount", "type": "number", "required": true },
        { "name": "currency", "type": "enum", "required": true, "acceptedValues": ["EUR", "USD", "GBP"] }
      ]
    },
    {
      "name": "LineItem",
      "color": "#10b981",
      "properties": [
        { "name": "description", "type": "string", "required": true },
        { "name": "quantity", "type": "number", "required": false },
        { "name": "unit_price", "type": "number", "required": true }
      ]
    }
  ]
}
```

Save and reuse this schema across all invoice documents by clicking **Export** in the Schema tab.

### Step 3 — Annotate

Select text in the PDF → a selection menu appears → choose the entity type → the annotation is created and linked to your selection.

For entities that are implied but not written (e.g. "the total VAT amount is 20% of the subtotal"), use the **+ Implicit** button to create an entity without a text span, then fill in its properties manually.

### Step 4 — Export JSON

Click **Export JSON** in the top bar. The file downloads immediately.

---

## 📄 Output Format

The exported JSON file follows this structure:

```json
{
  "documentId": "a3f9c2",
  "documentName": "invoice_2024_001.pdf",
  "annotations": [
    {
      "id": "b1d4e8f2",
      "objectTypeId": "type-uuid-here",
      "isImplicit": false,
      "spans": [
        {
          "start": 142,
          "end": 198,
          "text": "Cloud Hosting Services — Q1 2024",
          "pageIndex": 0,
          "rect": { "x": 72, "y": 310, "width": 340, "height": 14 }
        }
      ],
      "properties": [
        {
          "propertyId": "prop-uuid-description",
          "value": "Cloud Hosting Services — Q1 2024",
          "spans": [],
          "isInferred": false
        },
        {
          "propertyId": "prop-uuid-unit-price",
          "value": 4800,
          "spans": [],
          "isInferred": false
        }
      ]
    },
    {
      "id": "c2e5f9a3",
      "objectTypeId": "type-uuid-invoice",
      "isImplicit": true,
      "spans": [],
      "properties": [
        {
          "propertyId": "prop-uuid-total",
          "value": 5760,
          "spans": [],
          "isInferred": true,
          "inferenceNote": "Total including 20% VAT"
        }
      ]
    }
  ]
}
```

This format is designed to be:
- **Self-contained** — includes text, position, and metadata in one object
- **LLM-ready** — easily serializable as training examples for instruction fine-tuning
- **Pipeline-friendly** — maps directly to common NLP/NER dataset formats

---

## 🎯 Use Cases

### 📑 Invoice & Receipt Information Extraction
Annotate line items, vendor names, totals, tax amounts, and dates across thousands of invoice PDFs to train document extraction models. Define a schema once, reuse it across your entire document batch.

### ⚖️ Legal Contract Analysis
Tag key clauses, named parties, obligations, effective dates, and jurisdiction references in contracts. Train AI models to automatically review, summarize, or flag risk in legal documents.

### 🏥 Medical & Clinical Document Processing
Label diagnoses, prescribed medications, dosages, patient identifiers, and lab results in clinical reports. The fully local architecture means no PHI (Protected Health Information) leaves your machine — critical for HIPAA-adjacent workflows.

### 🔬 Scientific Literature Mining
Extract methods, datasets, model names, performance metrics, and citations from academic papers. Build knowledge graphs or fine-tune models for scientific question answering and literature review.

### 🏦 Financial Report Parsing
Annotate earnings figures, KPIs, segment data, and forward-looking statements in annual reports and earnings calls transcripts. Train models for automated financial analysis.

### 🏗️ Any Custom Information Extraction Task
The schema editor is fully flexible. If you need to extract structured information from PDF documents — Makroly can handle it, regardless of domain.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| PDF Rendering | [react-pdf](https://github.com/wojtekmaj/react-pdf) |
| Icons | [lucide-react](https://lucide.dev) |
| State Management | React Context + useReducer |
| ID Generation | [uuid](https://github.com/uuidjs/uuid) |

Makroly has **zero backend dependencies**. All logic runs client-side.

---

## 📁 Project Structure

```
makroly/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Landing page (https://makroly.com)
│   │   ├── app/page.tsx      # Annotation workspace (/app)
│   │   ├── layout.tsx        # Root layout with SEO metadata
│   │   └── sitemap.ts        # Auto-generated sitemap
│   ├── components/
│   │   ├── LandingPage.tsx   # Landing page component
│   │   ├── App.tsx           # Annotation workspace root
│   │   ├── PDFViewer/        # PDF rendering and text selection
│   │   │   ├── Viewer.tsx    # Multi-page PDF viewer
│   │   │   ├── PDFPage.tsx   # Single page renderer
│   │   │   └── SelectionMenu.tsx  # Text selection → annotation menu
│   │   ├── Sidebar/          # Right panel
│   │   │   ├── RightPanel.tsx     # Panel container (tabs)
│   │   │   ├── AnnotationList.tsx # List of created annotations
│   │   │   ├── ObjectEditor.tsx   # Edit annotation properties
│   │   │   └── SchemaEditor.tsx   # Define entity types
│   │   └── Toolbar/
│   │       └── TopBar.tsx    # Load PDF / Export JSON toolbar
│   ├── context/
│   │   └── AnnotationContext.tsx  # Global state (schema + annotations)
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── lib/
│       └── utils.ts          # Utility functions (cn, etc.)
└── public/                   # Static assets (logo, favicon, OG image)
```

---

## 🤝 Contributing

Contributions are welcome — bug reports, feature requests, UI improvements, new export formats, and more.

### Development workflow

```bash
# Fork and clone
git clone https://github.com/hatmimoha/makroly.git
cd makroly
npm install
npm run dev

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes, then submit a pull request
```

### Ideas for contributions

- **Additional export formats** — JSONL, CoNLL, spaCy, Hugging Face datasets format
- **Multi-page annotation support** — span annotations that cross page boundaries
- **Annotation import** — reload previously exported JSON annotations over the same PDF
- **Keyboard shortcuts** — speed up the annotation workflow
- **Dark mode** — for long annotation sessions
- **Annotation statistics** — count by entity type, coverage, completeness metrics

---

## 📜 License

Makroly is open source and released under the [Apache 2.0 License](LICENSE).

---

## 🌐 Links

- **Live tool:** [https://makroly.com](https://makroly.com)
- **Annotator workspace:** [https://makroly.com/app](https://makroly.com/app)
- **Issues & feature requests:** [GitHub Issues](https://github.com/hatmimoha/makroly/issues)

---

<p align="center">
  Built for AI teams who care about data quality.<br/>
  <strong><a href="https://makroly.com">Start annotating at makroly.com →</a></strong>
</p>
