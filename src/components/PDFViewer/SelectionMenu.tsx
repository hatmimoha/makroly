'use client';

import React from 'react';
import { useAnnotation } from '@/context/AnnotationContext';
import { v4 as uuidv4 } from 'uuid';
import { PropertyValue } from '@/types';

interface SelectionMenuProps {
    pageIndex: number; // 0-indexed
}

export function SelectionMenu({ pageIndex }: SelectionMenuProps) {
    const { state, dispatch } = useAnnotation();
    const selection = state.selection;

    if (!selection) return null;

    // Filter spans relevant to this page
    const pageSpans = selection.spans.filter(s => s.pageIndex === pageIndex);
    if (pageSpans.length === 0) return null;

    // Calculate position: Bottom-center of the last span on this page
    const lastSpan = pageSpans[pageSpans.length - 1];
    const top = lastSpan.rect.y + lastSpan.rect.height + 5;
    const left = lastSpan.rect.x;

    // Get active annotation details
    const activeAnnotation = state.activeAnnotationId
        ? state.documentAnnotations.annotations.find(a => a.id === state.activeAnnotationId)
        : null;

    const activeObjectType = activeAnnotation
        ? state.schema.objectTypes.find(t => t.id === activeAnnotation.objectTypeId)
        : null;

    const handleCreateAnnotation = (objectTypeId: string) => {
        const objType = state.schema.objectTypes.find(t => t.id === objectTypeId);
        const properties: PropertyValue[] = [];

        // Auto-populate 'Text' property if exists
        const textProp = objType?.properties.find(p => p.name.toLowerCase() === 'text');
        if (textProp) {
            properties.push({
                propertyId: textProp.id,
                value: selection.text,
                spans: selection.spans, // Share spans with the object
                isInferred: false
            });
        }

        dispatch({
            type: 'ADD_ANNOTATION',
            payload: {
                id: uuidv4(),
                objectTypeId: objectTypeId,
                spans: selection.spans,
                isImplicit: false,
                properties
            }
        });

        dispatch({ type: 'SET_SELECTION', payload: null });
        window.getSelection()?.removeAllRanges();
    };

    const handleAddToProperty = (propertyId: string) => {
        if (!activeAnnotation) return;

        const existingPropIndex = activeAnnotation.properties.findIndex(p => p.propertyId === propertyId);
        let newProperties = [...activeAnnotation.properties];

        // Create new property value
        const newPropValue: PropertyValue = {
            propertyId,
            value: selection.text, // Default to text content
            spans: selection.spans,
            isInferred: false
        };

        if (existingPropIndex >= 0) {
            // Overwrite existing property (simplification for now)
            // Ideally we might prompt or append if it's a list, but schema is simple types
            newProperties[existingPropIndex] = newPropValue;
        } else {
            newProperties.push(newPropValue);
        }

        dispatch({
            type: 'UPDATE_ANNOTATION',
            payload: {
                ...activeAnnotation,
                properties: newProperties
            }
        });

        dispatch({ type: 'SET_SELECTION', payload: null });
        window.getSelection()?.removeAllRanges();
    };

    return (
        <div
            className="absolute z-50 bg-white rounded-lg shadow-xl border border-slate-200 p-1 flex flex-col gap-1 min-w-[200px]"
            style={{ top, left }}
        >
            {/* 1. Add to Existing Object (if any active) */}
            {activeAnnotation && activeObjectType && (
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-1 mb-1">
                    <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase flex items-center justify-between">
                        <span>Add to {activeObjectType.name}</span>
                        <span className="text-[9px] bg-slate-100 px-1 rounded text-slate-500">Active</span>
                    </div>
                    {activeObjectType.properties.map(prop => (
                        <button
                            key={prop.id}
                            onClick={() => handleAddToProperty(prop.id)}
                            className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 text-sm text-left rounded"
                        >
                            <span className="text-slate-900 font-medium truncate w-full">{prop.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* 2. Create New Object */}
            <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase">
                Create New Object
            </div>
            {state.schema.objectTypes.map(objType => (
                <button
                    key={objType.id}
                    onClick={() => handleCreateAnnotation(objType.id)}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 text-sm text-left rounded"
                >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: objType.color }} />
                    <span className="text-slate-900 font-medium">{objType.name}</span>
                </button>
            ))}
        </div>
    );
}
