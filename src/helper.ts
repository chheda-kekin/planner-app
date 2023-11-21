export function validateInputString(str: string): boolean {
    return str !== "";
}

export function getPersonaInitials(firstName: string, lastName: string): string {
    const firstNameInitials = firstName.slice(0, 1).toUpperCase();
    const lastNameInitials = lastName? lastName.slice(0, 1).toUpperCase(): '';

    return `${firstNameInitials}${lastNameInitials}`;
}