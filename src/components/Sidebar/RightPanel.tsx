'use client';

import React, { useState } from 'react';
import { Layers, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnnotationList } from './AnnotationList';
import { SchemaEditor } from './SchemaEditor';
import { ObjectEditor } from './ObjectEditor';
import { useAnnotation } from '@/context/AnnotationContext';
import { v4 as uuidv4 } from 'uuid';

export function RightPanel() {
    const [activeTab, setActiveTab] = useState<'annotations' | 'schema'>('annotations');
    const { state, dispatch } = useAnnotation();

    const handleAddImplicit = () => {
        // Just add the first object type as default for now, or prompt
        if (state.schema.objectTypes.length === 0) return;

        const defaultType = state.schema.objectTypes[0];

        dispatch({
            type: 'ADD_ANNOTATION',
            payload: {
                id: uuidv4(),
                objectTypeId: defaultType.id,
                spans: [],
                isImplicit: true,
                properties: []
            }
        });
    };

    return (
        <div className="w-80 flex flex-col h-full bg-white border-l shadow-xl z-20">
            <div className="flex border-b">
                <button
                    onClick={() => setActiveTab('annotations')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors hover:bg-slate-50",
                        activeTab === 'annotations' ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500"
                    )}
                >
                    <Layers className="w-4 h-4" />
                    Annotations
                </button>
                <button
                    onClick={() => setActiveTab('schema')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors hover:bg-slate-50",
                        activeTab === 'schema' ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-500"
                    )}
                >
                    <Settings className="w-4 h-4" />
                    Schema
                </button>
            </div>

            <div className="flex-1 overflow-auto flex flex-col">
                {activeTab === 'annotations' ? (
                    <>
                        <div className="p-2 border-b flex justify-between items-center bg-slate-50">
                            <span className="text-xs font-semibold text-slate-500 uppercase px-2">List</span>
                            <button
                                onClick={handleAddImplicit}
                                className="text-xs bg-white border border-slate-300 rounded px-2 py-1 text-slate-600 hover:border-blue-500 hover:text-blue-500 flex items-center gap-1 transition-colors"
                                title="Add Implicit Object"
                            >
                                <Plus className="w-3 h-3" /> Implicit
                            </button>
                        </div>
                        <AnnotationList />
                    </>
                ) : (
                    <SchemaEditor />
                )}
            </div>

            {activeTab === 'annotations' && state.activeAnnotationId && (
                <ObjectEditor />
            )}
        </div>
    );
}
