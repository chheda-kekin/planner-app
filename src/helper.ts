import { LabelColors, LabelFontColors, Member, TaskMember } from "./constants";

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

export function getRandomId(): number {
    return Math.floor(Date.now()*Math.random()*23);
}

export function getTimeElapsed(date: number): string {
    const nowTime = Date.now();
    const diff = nowTime - date;

    const secondsElapsed = Math.round(diff/1000);

    if(secondsElapsed < 60) {
        return `${secondsElapsed} seconds`;
    }

    const minutesElapsed = Math.round(secondsElapsed/60)
    
    if(minutesElapsed < 60) {
        return `${minutesElapsed} minutes`;
    }

    const hoursElapsed = Math.round(minutesElapsed/60);

    if(hoursElapsed < 24) {
        return `${hoursElapsed} hours`;
    }

    const daysElapsed = Math.round(hoursElapsed/24);

    if(daysElapsed < 30) {
        return `${daysElapsed} days`;
    }

    const monthsElapsed = Math.round(daysElapsed / 30);

    if(monthsElapsed < 12) {
        return `${monthsElapsed} months`;
    }

    return `${Math.round(monthsElapsed / 12)} years`;
}

export function getPersonaColor(memberId: number): number {
    let colorCode: number;
    if(memberId < 25) {
        colorCode =  memberId;
    } else {
        colorCode = memberId - 25 < 25 ? memberId - 25 : memberId % 25;
    }

    if(colorCode === 11 || colorCode === 13 || colorCode === 15 || colorCode === 22) {
        colorCode = colorCode + 1;
    }

    return colorCode;
}

export function getTaskMembers(members: Array<Member>): Array<TaskMember> {
    return members.map(({id, firstName, lastName}) => {
        const memberLastName = lastName ? lastName: "";
        const personaName = `${firstName} ${memberLastName}`;
        const initialsColor = getPersonaColor(id);
        const imageInitials = getPersonaInitials(firstName, lastName);
        
        return {
            id,
            personaName,
            initialsColor,
            imageInitials
        };
    });    
}