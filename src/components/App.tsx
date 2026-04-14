'use client';

import React from 'react';

import { AnnotationProvider } from '@/context/AnnotationContext';
import { TopBar } from './Toolbar/TopBar';
import { RightPanel } from './Sidebar/RightPanel';
import dynamic from 'next/dynamic';

const Viewer = dynamic(() => import('./PDFViewer/Viewer').then(mod => mod.Viewer), {
    ssr: false,
    loading: () => <div className="flex-1 bg-slate-100 animate-pulse" />
});

export default function App() {
    return (
        <AnnotationProvider>
            <div className="h-screen flex flex-col overflow-hidden">
                <TopBar />
                <div className="flex-1 flex overflow-hidden">
                    <Viewer />
                    <RightPanel />
                </div>
            </div>
        </AnnotationProvider>
    );
}
