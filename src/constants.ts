
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
    black = 11,
    orange = 12,
    red = 13,
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

export const TaskStatus = {
    '0': 'Not started',
    '1': 'In progress',
    '2': 'Completed'
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
    labelName: string
};

export const LabelProps: LabelProp[] = [
    {
        backgroundColor: LabelColors.Red,
        color: LabelFontColors.Red,
        labelName: 'Red'    
    },
    {
        backgroundColor: LabelColors.Green,
        color: LabelFontColors.Green,
        labelName: 'Green'    
    },
    {
        backgroundColor: LabelColors.Blue,
        color: LabelFontColors.Blue,
        labelName: 'Blue'    
    },
    {
        backgroundColor: LabelColors.Purple,
        color: LabelFontColors.Purple,
        labelName: 'Purple'    
    },
    {
        backgroundColor: LabelColors.Bronze,
        color: LabelFontColors.Bronze,
        labelName: 'Bronze'    
    },
    {
        backgroundColor: LabelColors.Aqua,
        color: LabelFontColors.Aqua,
        labelName: 'Aqua'    
    },
    {
        backgroundColor: LabelColors.Lime,
        color: LabelFontColors.Lime,
        labelName: 'Lime'    
    },
    {
        backgroundColor: LabelColors.Yellow,
        color: LabelFontColors.Yellow,
        labelName: 'Yellow'    
    }
];