import { IPersonaSharedProps } from "@fluentui/react/lib/Persona";

export enum PersonaInitialsColor {
    lightBlue = 0,
    blue = 1,
    darkBlue = 2,
    teal = 3,
    lightGreen = 4,
    green = 5,
    darkGreen = 6,
    lightPink = 7,
    pink = 8,
    magenta = 9,
    purple = 10,
    black = 11, //Deprecated
    orange = 12,
    red = 13, //Deprecated
    darkRed = 14,
    transparent = 15,
    violet = 16,
    lightRed = 17,
    gold = 18,
    burgundy = 19,
    warmGray = 20,
    coolGray = 21,
    gray = 22,
    cyan = 23,
    rust = 24,
}

export const MonthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const TaskStatus = {
    'Not Started': '1',
    'In Progress': '2',
    'Completed': '3'
};

export enum TaskPriority {
    Urgent = 'Urgent',
    Important = 'Important',
    Medium = 'Medium',
    Low = 'Low'
}

export enum LabelColors  {
    Red = 'rgb(233, 199, 205)',
    Green = 'rgb(219, 235, 199)',
    Purple = 'rgb(216, 204, 231)',
    Bronze = 'rgb(241, 217, 204)',
    Lime = 'rgb(229, 242, 211)',
    Aqua = 'rgb(194, 231, 231)',
    Blue = 'rgb(208, 231, 248)',
    Yellow = 'rgb(245, 237, 206)'
}

export enum LabelFontColors {
    Red = 'rgb(117, 11, 28)',
    Green = 'rgb(56, 99, 4)',
    Blue = 'rgb(0, 91, 161)',
    Purple = 'rgb(64, 27, 108)',
    Bronze = 'rgb(167, 65, 9)',
    Lime = 'rgb(64, 96, 20)',
    Aqua = 'rgb(0, 102, 102)',
    Yellow = 'rgb(109, 87, 0)'
}

export type LabelProp = {
    backgroundColor: LabelColors,
    color: LabelFontColors,
    labelName: string,
    displayDialog: boolean
};

export type TaskComment = {
    id: number,
    memberId: number,
    commentText: string,
    personaProps: IPersonaSharedProps,
    commentDate: number,
    initialsColor: PersonaInitialsColor
};

export type Plan = {
    id: number,
    name: string,
    notStarted: number,
    inProgress: number,
    completed: number,
    due: number
};

export type Label = {
    color: string;
    value: string;
}

export type Member = {
    id: number,
    firstName: string,
    lastName: string
};

export type TaskType = {
    id: number,
    planId: number,
    planName: string
    name: string,
    status: string,
    due: number,
    members: Member[],
    labels: string
};

export type TaskMember = {
    id: number,
    personaName: string,
    initialsColor: number,
    imageInitials: string
};

export type ValidationResType = {
    value: string;
    isValid: boolean; 
    message: string;
}

export enum MessageType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning'
}

export const LabelProps: LabelProp[] = [
    {
        backgroundColor: LabelColors.Red,
        color: LabelFontColors.Red,
        labelName: 'Red',
        displayDialog: false
    },
    {
        backgroundColor: LabelColors.Green,
        color: LabelFontColors.Green,
        labelName: 'Green',
        displayDialog: false
    },
    {
        backgroundColor: LabelColors.Blue,
        color: LabelFontColors.Blue,
        labelName: 'Blue',
        displayDialog: false
    },
    {
        backgroundColor: LabelColors.Purple,
        color: LabelFontColors.Purple,
        labelName: 'Purple',
        displayDialog: false
    },
    {
        backgroundColor: LabelColors.Bronze,
        color: LabelFontColors.Bronze,
        labelName: 'Bronze',
        displayDialog: false
    },
    {
        backgroundColor: LabelColors.Aqua,
        color: LabelFontColors.Aqua,
        labelName: 'Aqua',
        displayDialog: false
    },
    {
        backgroundColor: LabelColors.Lime,
        color: LabelFontColors.Lime,
        labelName: 'Lime',
        displayDialog: false
    },
    {
        backgroundColor: LabelColors.Yellow,
        color: LabelFontColors.Yellow,
        labelName: 'Yellow',
        displayDialog: false
    }
];

export const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;