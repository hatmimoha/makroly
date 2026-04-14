'use client';

import React, { useRef, useEffect } from 'react';
import { Page } from 'react-pdf';
import { useAnnotation } from '@/context/AnnotationContext';
import { Span } from '@/types';
import { SelectionMenu } from './SelectionMenu';

interface PDFPageProps {
    pageNumber: number;
}

export function PDFPage({ pageNumber }: PDFPageProps) {
    const { state, dispatch } = useAnnotation();
    const pageRef = useRef<HTMLDivElement>(null);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            return;
        }

        const range = selection.getRangeAt(0);
        const text = selection.toString();

        // Check if selection is within this page
        if (!pageRef.current?.contains(range.commonAncestorContainer)) {
            return;
        }

        // This is a simplified extraction of rects. 
        // In a real robust implementation, we'd need to map these client rects 
        // to PDF coordinates properly, accounting for scale. 
        // For now, let's assume valid selection and just store the text and rects relative to viewport
        // We need to Normalize these to be relative to the Page container.

        const pageRect = pageRef.current.getBoundingClientRect();
        const clientRects = Array.from(range.getClientRects());

        const spans: Span[] = clientRects.map(rect => ({
            start: 0, // We need to calculate char offsets properly later
            end: 0,
            text: '', // Simplification
            pageIndex: pageNumber - 1,
            rect: {
                x: rect.left - pageRect.left,
                y: rect.top - pageRect.top,
                width: rect.width,
                height: rect.height
            }
        }));

        dispatch({
            type: 'SET_SELECTION',
            payload: {
                text,
                spans
            }
        });
    };

    return (
        <div
            ref={pageRef}
            className="relative mb-4 shadow-md"
            onMouseUp={handleMouseUp}
        >
            <Page
                pageNumber={pageNumber}
                renderTextLayer={true}
                renderAnnotationLayer={false}
                className="bg-white"
                width={800}
            />
            {/* Highlight Layer for Annotations */}
            {state.documentAnnotations.annotations
                .flatMap(a => a.spans)
                .filter(s => s.pageIndex === pageNumber - 1)
                .map((span, idx) => (
                    <div
                        key={`annot_${idx}`}
                        className="absolute bg-yellow-300 opacity-30 mix-blend-multiply pointer-events-none"
                        style={{
                            left: span.rect.x,
                            top: span.rect.y,
                            width: span.rect.width,
                            height: span.rect.height
                        }}
                    />
                ))
            }
            {/* Highlight Layer for Current Selection */}
            {state.selection?.spans
                .filter(s => s.pageIndex === pageNumber - 1)
                .map((span, idx) => (
                    <div
                        key={`sel_${idx}`}
                        className="absolute bg-blue-300 opacity-40 mix-blend-multiply pointer-events-none"
                        style={{
                            left: span.rect.x,
                            top: span.rect.y,
                            width: span.rect.width,
                            height: span.rect.height
                        }}
                    />
                ))
            }
            <SelectionMenu pageIndex={pageNumber - 1} />
        </div>
    );
}
