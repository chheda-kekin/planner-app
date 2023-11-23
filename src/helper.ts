import { LabelColors, LabelFontColors } from "./constants";


export function validateInputString(str: string): boolean {
    return str !== "";
}

export function getPersonaInitials(firstName: string, lastName: string): string {
    const firstNameInitials = firstName.slice(0, 1).toUpperCase();
    const lastNameInitials = lastName? lastName.slice(0, 1).toUpperCase(): '';

    return `${firstNameInitials}${lastNameInitials}`;
}

export function getLabelColorValue(color: string): string {

    let labelColorValue = '';
    for(const [colorKey, colorVal] of Object.entries(LabelColors)) {
        if(color === colorKey) {
            labelColorValue = colorVal;
        }
    }

    return labelColorValue;
}

export function getLabelFontColorValue(color: string): string {
    let labelFontColorValue = '';

    for(const [colorKey, colorVal] of Object.entries(LabelFontColors)) {
        if(color === colorKey) {
            labelFontColorValue = colorVal;
        }
    }

    return labelFontColorValue;
}