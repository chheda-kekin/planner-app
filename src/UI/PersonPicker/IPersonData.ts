import { IFacepilePersona } from "@fluentui/react";

export interface IPersonData {
    imageUrl?: string;
    imageInitials: string;
    initialsColor: number;
    personName: string;
    onClick?: (ev: unknown, persona: IPersonData) => void;
    data?: any;
}