import { PersonaInitialsColor, TaskMember } from "../../constants";
import { getRandomId } from "../../helper";

export const FacepilePersona: TaskMember[] = [
    {id: getRandomId(), imageInitials: 'MS', personaName: 'Maor Sharett', initialsColor: PersonaInitialsColor.lightGreen},
    {id: getRandomId(), imageInitials: 'AL', personaName: 'Annie Lindqvist2', initialsColor: PersonaInitialsColor.lightPink},        
    {id: getRandomId(), imageInitials: 'VL', personaName: 'Valentina Lovric', initialsColor: PersonaInitialsColor.magenta},        
    {id: getRandomId(), imageInitials: 'CB', personaName: 'Christian Bergqvist', initialsColor: PersonaInitialsColor.burgundy},        
    {id: getRandomId(), imageInitials: 'ALB',personaName: 'Alex Barn', initialsColor: PersonaInitialsColor.violet},        
    {id: getRandomId(), imageInitials: 'RK', personaName: 'Roko Kolar', initialsColor: PersonaInitialsColor.darkGreen}        
];