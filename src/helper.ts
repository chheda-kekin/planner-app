import { LabelColors, LabelFontColors, ValidationResType,
     Member, TaskMember } from "./constants";

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

export function escapeQuotes(str: string): string {
    let escapedStr = str.replaceAll(`'`, `\\'`);
    return escapedStr.replaceAll(`"`, `\\"`);
}

export function validateMemberFirstName(fname: string): ValidationResType {
    if(fname !== '') {
        return {
            value: fname,
            isValid: true, 
            message: ''
        };
    }

    return {
        value: fname,
        isValid: false, 
        message: 'Please enter first name'
    };
}

export function validateMemberLastName(lname: string): ValidationResType {
    return {
        value: lname,
        isValid: true, 
        message: ''
    };
}

export function validateEmail(email: string): ValidationResType {
    if(email.indexOf('@') !== -1) {
        return {
            value: email,
            isValid: true,
            message: ''
        };
    } else {
        return {
            value: email,
            isValid: false,
            message: 'Please enter valid email'
        };
    }
}

export function validatePhoneNumber(ph: string): ValidationResType {

    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    if(ph === '') {
        return {
            value: ph,
            isValid: false,
            message: 'Please enter phone no'
        }
    }

    if(regex.test(ph)) {
        return {
            value: ph,
            isValid: true,
            message: ''
        };
    }

    return {
        value: ph,
        isValid: false,
        message: 'Please enter valid phone no'
    };
}

export function validateUserPassword(password: string): ValidationResType {
    if(password === '') {
        return {
            value: password,
            isValid: false,
            message: 'Please enter password'
        };
    }

    return {
        value: password,
        isValid: true,
        message: ''
    };
}

export function validateConfirmPassword(password: string): ValidationResType {
    const passwordEle = document.getElementById('password') as HTMLInputElement;
    const enteredPassword = passwordEle!.value;

    if(password !== enteredPassword) {
        return {
            value: password,
            isValid: false,
            message: 'Password not matching'
        };
    }

    return {
        value: password,
        isValid: true,
        message: ''
    };
}