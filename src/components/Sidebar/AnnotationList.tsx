'use client';

import React from 'react';
import { useAnnotation } from '@/context/AnnotationContext';
import { Trash2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnnotationList() {
    const { state, dispatch } = useAnnotation();

    const activeId = state.activeAnnotationId;

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        dispatch({ type: 'DELETE_ANNOTATION', payload: id });
    };

    const handleSelect = (id: string) => {
        dispatch({ type: 'SET_ACTIVE_ANNOTATION', payload: id });
    };

    if (state.documentAnnotations.annotations.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500 text-sm">
                <p>No annotations yet.</p>
                <p className="mt-2 text-xs">Select text in the PDF to create an object.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 p-2">
            {state.documentAnnotations.annotations.map(annot => {
                const objType = state.schema.objectTypes.find(t => t.id === annot.objectTypeId);
                const nameProp = annot.properties.find(p => p.propertyId === objType?.properties[0]?.id)?.value; // Heuristic: first property is usually name

                return (
                    <div
                        key={annot.id}
                        onClick={() => handleSelect(annot.id)}
                        className={cn(
                            "p-3 rounded-lg border cursor-pointer hover:bg-slate-50 transition-colors flex flex-col gap-1 relative group",
                            activeId === annot.id ? "border-blue-500 bg-blue-50/30 ring-1 ring-blue-500" : "border-slate-200"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: objType?.color || '#ccc' }} />
                                <span className="text-sm font-semibold text-slate-700">{objType?.name || 'Unknown'}</span>
                                {annot.isImplicit && (
                                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-full border border-dashed border-slate-300">
                                        Implicit
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={(e) => handleDelete(e, annot.id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="text-xs text-slate-600 truncate pl-4">
                            {nameProp ? String(nameProp) : <span className="text-slate-400 italic">No name</span>}
                        </div>

                        {/* Spans preview */}
                        {!annot.isImplicit && annot.spans.length > 0 && (
                            <div className="mt-1 pl-4 text-[10px] text-slate-400 truncate">
                                "{annot.spans[0].text}"
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
