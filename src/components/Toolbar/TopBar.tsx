'use client';

import React, { useRef } from 'react';
import { Upload, Download, Trash2 } from 'lucide-react';
import { useAnnotation } from '@/context/AnnotationContext';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid'; // I might need uuid, or just use random string

export function TopBar() {
    const { state, dispatch } = useAnnotation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            dispatch({
                type: 'LOAD_DOCUMENT',
                payload: {
                    file,
                    id: Math.random().toString(36).substring(7), // Simple ID for now
                    name: file.name
                }
            });
        }
    };

    const handleDownload = () => {
        if (!state.documentAnnotations) return;

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.documentAnnotations, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${state.documentAnnotations.documentName}_annotations_${new Date().toISOString()}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="h-14 border-b bg-white flex items-center px-4 justify-between shadow-sm z-50 relative">
            <div className="flex items-center gap-4">
                <h1 className="font-bold text-lg text-slate-800">PDF Annotator</h1>
                <div className="h-6 w-px bg-slate-200" />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    Load PDF
                </button>
                <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleDownload}
                    disabled={!state.document}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    Export JSON
                </button>
            </div>
        </div>
    );
}
