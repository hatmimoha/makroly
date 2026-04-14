export type PropertyType = 'string' | 'number' | 'date' | 'boolean' | 'enum';

export interface PropertyDefinition {
    id: string;
    name: string;
    type: PropertyType;
    required: boolean;
    acceptedValues?: string[]; // for enum
}

export interface ObjectType {
    id: string;
    name: string;
    color: string; // Hex code
    properties: PropertyDefinition[];
}

export interface Schema {
    objectTypes: ObjectType[];
}

export interface Span {
    start: number;
    end: number;
    text: string;
    pageIndex: number;
    rect: { x: number; y: number; width: number; height: number };
}

export interface PropertyValue {
    propertyId: string;
    value: any;
    spans: Span[]; // Empty if inferred
    isInferred: boolean;
    inferenceNote?: string;
}

export interface AnnotationObject {
    id: string;
    objectTypeId: string;
    spans: Span[]; // Empty if implicit object
    isImplicit: boolean;
    properties: PropertyValue[];
}

export interface DocumentAnnotations {
    documentId: string;
    documentName: string;
    annotations: AnnotationObject[];
}
