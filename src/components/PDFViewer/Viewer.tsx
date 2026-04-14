'use client';

import React, { useState } from 'react';
import { Document, pdfjs } from 'react-pdf';
import { useAnnotation } from '@/context/AnnotationContext';
import { PDFPage } from './PDFPage';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
// Using CDN for simplicity and reliability in this environment
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function Viewer() {
    const { state } = useAnnotation();
    const [numPages, setNumPages] = useState<number>(0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    if (!state.document) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-100 text-slate-500">
                <div className="text-center">
                    <p className="mb-2">No PDF loaded</p>
                    <p className="text-sm">Click "Load PDF" to start annotating</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-slate-100 overflow-auto p-8 flex justify-center">
            <div className="shadow-lg">
                <Document
                    file={state.document}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col gap-4"
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <PDFPage key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            </div>
        </div>
    );
}
