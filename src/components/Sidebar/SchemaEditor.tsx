'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useAnnotation } from '@/context/AnnotationContext';
import { ObjectType, PropertyDefinition } from '@/types';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

export function SchemaEditor() {
    const { state, dispatch } = useAnnotation();
    const [expandedStart, setExpandedStart] = useState<string | null>(null);

    const handleAddObjectType = () => {
        const newType: ObjectType = {
            id: uuidv4(),
            name: 'New Object',
            color: '#10b981', // green-500
            properties: [
                {
                    id: uuidv4(),
                    name: 'Text',
                    type: 'string',
                    required: false
                }
            ]
        };
        dispatch({
            type: 'UPDATE_SCHEMA',
            payload: {
                ...state.schema,
                objectTypes: [...state.schema.objectTypes, newType]
            }
        });
        setExpandedStart(newType.id);
    };

    const handleUpdateObjectType = (id: string, updates: Partial<ObjectType>) => {
        dispatch({
            type: 'UPDATE_SCHEMA',
            payload: {
                ...state.schema,
                objectTypes: state.schema.objectTypes.map(t => t.id === id ? { ...t, ...updates } : t)
            }
        });
    };

    const [deletingTypeId, setDeletingTypeId] = useState<string | null>(null);

    const handleDeleteObjectType = (id: string) => {
        // Check for existing annotations of this type
        const hasAnnotations = state.documentAnnotations.annotations.some(a => a.objectTypeId === id);

        if (hasAnnotations) {
            setDeletingTypeId(id);
        } else {
            dispatch({ type: 'DELETE_OBJECT_TYPE', payload: id });
        }
    };

    const confirmDelete = () => {
        if (deletingTypeId) {
            dispatch({ type: 'DELETE_OBJECT_TYPE', payload: deletingTypeId });
            setDeletingTypeId(null);
        }
    };

    const cancelDelete = () => {
        setDeletingTypeId(null);
    };

    const handleAddProperty = (typeId: string) => {
        const newProp: PropertyDefinition = {
            id: uuidv4(),
            name: 'New Property',
            type: 'string',
            required: false
        };
        const objType = state.schema.objectTypes.find(t => t.id === typeId);
        if (!objType) return;

        handleUpdateObjectType(typeId, {
            properties: [...objType.properties, newProp]
        });
    };

    // Simplified property update
    const handleUpdateProperty = (typeId: string, propId: string, updates: Partial<PropertyDefinition>) => {
        const objType = state.schema.objectTypes.find(t => t.id === typeId);
        if (!objType) return;

        handleUpdateObjectType(typeId, {
            properties: objType.properties.map(p => p.id === propId ? { ...p, ...updates } : p)
        });
    };

    const handleDeleteProperty = (typeId: string, propId: string) => {
        const objType = state.schema.objectTypes.find(t => t.id === typeId);
        if (!objType) return;

        handleUpdateObjectType(typeId, {
            properties: objType.properties.filter(p => p.id !== propId)
        });
    };


    const handleImportSchema = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target?.result as string);
                if (imported.objectTypes && Array.isArray(imported.objectTypes)) {
                    dispatch({ type: 'UPDATE_SCHEMA', payload: imported });
                } else {
                    alert('Invalid schema format');
                }
            } catch (err) {
                alert('Failed to parse JSON');
            }
        };
        reader.readAsText(file);
    };

    const handleExportSchema = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.schema, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `schema_${new Date().toISOString()}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <h3 className="font-semibold text-sm uppercase text-slate-500">Schema</h3>
                <div className="flex items-center gap-1">
                    <label className="text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded cursor-pointer">
                        Import
                        <input type="file" accept=".json" className="hidden" onChange={handleImportSchema} />
                    </label>
                    <button onClick={handleExportSchema} className="text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                        Export
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1" />
                    <button onClick={handleAddObjectType} className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
                {state.schema.objectTypes.map(obj => (
                    <div key={obj.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                        <div className="flex items-center gap-2 p-3 bg-slate-50 border-b">
                            <button onClick={() => setExpandedStart(expandedStart === obj.id ? null : obj.id)}>
                                {expandedStart === obj.id ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                            </button>
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: obj.color }}
                            />
                            <input
                                className="flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={obj.name}
                                onChange={(e) => handleUpdateObjectType(obj.id, { name: e.target.value })}
                            />
                            <input
                                type="color"
                                className="w-6 h-6 rounded cursor-pointer border border-slate-200 p-0.5 bg-white"
                                value={obj.color}
                                onChange={(e) => handleUpdateObjectType(obj.id, { color: e.target.value })}
                            />
                            <button onClick={() => handleDeleteObjectType(obj.id)} className="flex-shrink-0 text-slate-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors" title="Delete Object Type">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {expandedStart === obj.id && (
                            <div className="p-3 space-y-3">
                                <div className="text-xs font-semibold text-slate-500 flex justify-between items-center">
                                    PROPERTIES
                                    <button onClick={() => handleAddProperty(obj.id)} className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                {obj.properties.map(prop => (
                                    <div key={prop.id} className="flex flex-col gap-2 p-2 border rounded bg-white shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <input
                                                className="flex-1 text-sm border-b border-slate-200 text-slate-900 focus:border-blue-500 focus:outline-none px-1 py-0.5 placeholder:text-slate-400"
                                                value={prop.name}
                                                onChange={(e) => handleUpdateProperty(obj.id, prop.id, { name: e.target.value })}
                                                placeholder="Prop Name"
                                            />
                                            <button onClick={() => handleDeleteProperty(obj.id, prop.id)} className="flex-shrink-0 text-slate-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors" title="Delete Property">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    className="text-xs bg-white border border-slate-200 rounded px-1 py-1 w-full text-slate-900 font-medium"
                                                    value={prop.type}
                                                    onChange={(e) => handleUpdateProperty(obj.id, prop.id, { type: e.target.value as any })}
                                                >
                                                    <option value="string">Text</option>
                                                    <option value="number">Number</option>
                                                    <option value="date">Date</option>
                                                    <option value="boolean">Boolean</option>
                                                    <option value="enum">Enum</option>
                                                </select>
                                                <label className="flex items-center gap-1 text-xs text-slate-600">
                                                    <input
                                                        type="checkbox"
                                                        checked={prop.required}
                                                        onChange={(e) => handleUpdateProperty(obj.id, prop.id, { required: e.target.checked })}
                                                    />
                                                    Req
                                                </label>
                                            </div>
                                            {prop.type === 'enum' && (
                                                <input
                                                    className="text-xs w-full border border-slate-200 rounded px-2 py-1 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                                                    placeholder="Values (comma-separated)..."
                                                    value={prop.acceptedValues?.join(', ') || ''}
                                                    onChange={(e) => handleUpdateProperty(obj.id, prop.id, { acceptedValues: e.target.value.split(',').map(s => s.trim()) })}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-2 border-t border-slate-100 flex justify-end">
                                    <button
                                        onClick={() => handleDeleteObjectType(obj.id)}
                                        className="text-xs flex items-center gap-1 text-red-600 hover:bg-red-50 px-2 py-1.5 rounded transition-colors"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        Delete {obj.name}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Deletion Confirmation Modal */}
            {deletingTypeId && (
                <div className="absolute inset-0 bg-black/20 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]">
                    <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-w-sm w-full space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900">Delete Object Type?</h3>
                            <p className="text-sm text-slate-600">
                                This will remove the object type and <strong className="text-red-600">permanently delete all associated annotations</strong>.
                            </p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={cancelDelete}
                                className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded font-medium"
                            >
                                Delete Everything
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
