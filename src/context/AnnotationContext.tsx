'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AnnotationObject, DocumentAnnotations, Schema, ObjectType } from '@/types';

// State Definition
interface AnnotationState {
    document: File | null;
    documentAnnotations: DocumentAnnotations;
    schema: Schema;
    selection: {
        text: string;
        spans: any[]; // refine later
    } | null;
    activeAnnotationId: string | null; // Currently selected annotation for editing
}

// Initial Data
export const INITIAL_SCHEMA: Schema = {
    objectTypes: [
        {
            id: 'person',
            name: 'Person',
            color: '#ef4444', // red-500
            properties: [
                { id: 'p_name', name: 'Name', type: 'string', required: true },
                { id: 'p_text', name: 'Text', type: 'string', required: false }, // Auto-populated
                { id: 'p_role', name: 'Role', type: 'enum', required: false, acceptedValues: ['CEO', 'CTO', 'Employee'] }
            ]
        },
        {
            id: 'org',
            name: 'Organization',
            color: '#3b82f6', // blue-500
            properties: [
                { id: 'o_name', name: 'Name', type: 'string', required: true },
                { id: 'o_text', name: 'Text', type: 'string', required: false }, // Auto-populated
                { id: 'o_address', name: 'Address', type: 'string', required: false }
            ]
        }
    ]
};

const initialState: AnnotationState = {
    document: null,
    documentAnnotations: {
        documentId: '',
        documentName: '',
        annotations: []
    },
    schema: INITIAL_SCHEMA,
    selection: null,
    activeAnnotationId: null,
};

// Actions
type Action =
    | { type: 'LOAD_DOCUMENT'; payload: { file: File; id: string; name: string } }
    | { type: 'ADD_ANNOTATION'; payload: AnnotationObject }
    | { type: 'UPDATE_ANNOTATION'; payload: AnnotationObject }
    | { type: 'DELETE_ANNOTATION'; payload: string }
    | { type: 'SET_SELECTION'; payload: AnnotationState['selection'] }
    | { type: 'SET_ACTIVE_ANNOTATION'; payload: string | null }
    | { type: 'UPDATE_SCHEMA'; payload: Schema }
    | { type: 'DELETE_OBJECT_TYPE'; payload: string };

// Reducer
function annotationReducer(state: AnnotationState, action: Action): AnnotationState {
    switch (action.type) {
        case 'LOAD_DOCUMENT':
            return {
                ...state,
                document: action.payload.file,
                documentAnnotations: {
                    documentId: action.payload.id,
                    documentName: action.payload.name,
                    annotations: []
                },
                selection: null,
                activeAnnotationId: null,
            };
        case 'ADD_ANNOTATION':
            return {
                ...state,
                documentAnnotations: {
                    ...state.documentAnnotations,
                    annotations: [...state.documentAnnotations.annotations, action.payload]
                },
                activeAnnotationId: action.payload.id // Auto-select newly created
            };
        case 'UPDATE_ANNOTATION':
            return {
                ...state,
                documentAnnotations: {
                    ...state.documentAnnotations,
                    annotations: state.documentAnnotations.annotations.map(a =>
                        a.id === action.payload.id ? action.payload : a
                    )
                }
            };
        case 'DELETE_ANNOTATION':
            return {
                ...state,
                documentAnnotations: {
                    ...state.documentAnnotations,
                    annotations: state.documentAnnotations.annotations.filter(a => a.id !== action.payload)
                },
                activeAnnotationId: state.activeAnnotationId === action.payload ? null : state.activeAnnotationId
            };
        case 'SET_SELECTION':
            return { ...state, selection: action.payload };
        case 'SET_ACTIVE_ANNOTATION':
            return { ...state, activeAnnotationId: action.payload };
        case 'UPDATE_SCHEMA':
            return { ...state, schema: action.payload };
        case 'DELETE_OBJECT_TYPE':
            return {
                ...state,
                schema: {
                    ...state.schema,
                    objectTypes: state.schema.objectTypes.filter(t => t.id !== action.payload)
                },
                documentAnnotations: {
                    ...state.documentAnnotations,
                    annotations: state.documentAnnotations.annotations.filter(a => a.objectTypeId !== action.payload)
                },
                activeAnnotationId: state.activeAnnotationId // If active was of this type, we might want to deselect, but filtering is safe
            };
        default:
            return state;
    }
}

// Context
const AnnotationContext = createContext<{
    state: AnnotationState;
    dispatch: React.Dispatch<Action>;
} | null>(null);

export function AnnotationProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(annotationReducer, initialState);

    return (
        <AnnotationContext.Provider value={{ state, dispatch }}>
            {children}
        </AnnotationContext.Provider>
    );
}

export function useAnnotation() {
    const context = useContext(AnnotationContext);
    if (!context) {
        throw new Error('useAnnotation must be used within an AnnotationProvider');
    }
    return context;
}
