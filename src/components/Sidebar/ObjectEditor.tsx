'use client';

import React from 'react';
import { useAnnotation } from '@/context/AnnotationContext';
import { PropertyValue } from '@/types';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

export function ObjectEditor() {
    const { state, dispatch } = useAnnotation();
    const activeId = state.activeAnnotationId;

    const annotation = state.documentAnnotations.annotations.find(a => a.id === activeId);
    const objectType = state.schema.objectTypes.find(t => t.id === annotation?.objectTypeId);

    if (!annotation || !objectType) return null;

    const handleUpdateProperty = (propId: string, value: any) => {
        const existingPropIndex = annotation.properties.findIndex(p => p.propertyId === propId);
        let newProperties = [...annotation.properties];

        if (existingPropIndex >= 0) {
            newProperties[existingPropIndex] = {
                ...newProperties[existingPropIndex],
                value
            };
        } else {
            newProperties.push({
                propertyId: propId,
                value,
                spans: [],
                isInferred: true // Default to inferred if adding manually here without text select flow
            });
        }

        dispatch({
            type: 'UPDATE_ANNOTATION',
            payload: {
                ...annotation,
                properties: newProperties
            }
        });
    };

    const handleToggleInferred = (propId: string) => {
        const existingPropIndex = annotation.properties.findIndex(p => p.propertyId === propId);
        if (existingPropIndex < 0) return;

        const prop = annotation.properties[existingPropIndex];
        const newProperties = [...annotation.properties];
        newProperties[existingPropIndex] = {
            ...prop,
            isInferred: !prop.isInferred
        };

        dispatch({
            type: 'UPDATE_ANNOTATION',
            payload: {
                ...annotation,
                properties: newProperties
            }
        });
    };

    return (
        <div className="border-t bg-slate-50 p-4 sticky bottom-0 border-l border-slate-200 shadow-inner">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                Editing <span style={{ color: objectType.color }}>{objectType.name}</span>
            </h3>

            <div className="space-y-3">
                {objectType.properties.map(def => {
                    const currentVal = annotation.properties.find(p => p.propertyId === def.id);
                    const value = currentVal?.value ?? '';

                    return (
                        <div key={def.id} className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-medium text-slate-700">{def.name}</label>
                                {currentVal && (
                                    <button
                                        onClick={() => handleToggleInferred(def.id)}
                                        className={cn(
                                            "text-[10px] px-1 rounded cursor-pointer border",
                                            currentVal.isInferred
                                                ? "bg-purple-100 text-purple-700 border-purple-200"
                                                : "bg-white text-slate-400 border-slate-200"
                                        )}
                                        title="Toggle Inferred/Explicit"
                                    >
                                        {currentVal.isInferred ? "Inferred" : "Text"}
                                    </button>
                                )}
                            </div>

                            {def.type === 'enum' ? (
                                <select
                                    className="w-full text-sm border rounded p-1.5 focus:ring-2 ring-blue-500 outline-none bg-white text-slate-900"
                                    value={value}
                                    onChange={(e) => handleUpdateProperty(def.id, e.target.value)}
                                >
                                    <option value="">Select...</option>
                                    {def.acceptedValues?.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            ) : def.type === 'boolean' ? (
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-1 text-sm text-slate-700">
                                        <input type="radio" checked={value === true} onChange={() => handleUpdateProperty(def.id, true)} /> Yes
                                    </label>
                                    <label className="flex items-center gap-1 text-sm text-slate-700">
                                        <input type="radio" checked={value === false} onChange={() => handleUpdateProperty(def.id, false)} /> No
                                    </label>
                                </div>
                            ) : (
                                <input
                                    type={def.type === 'number' ? 'number' : 'text'}
                                    className="w-full text-sm border rounded p-1.5 focus:ring-2 ring-blue-500 outline-none bg-white text-slate-900"
                                    value={value}
                                    onChange={(e) => handleUpdateProperty(def.id, def.type === 'number' ? Number(e.target.value) : e.target.value)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
