import { useState } from 'react';
import { Facepile } from '@fluentui/react/lib/Facepile';
import MemberListDropdown from '../MemberListDropdown/MemberListDropdown';
import FacepilePersona from './FacepilePersona';
import { people, mru } from '@fluentui/example-data';
import {  PersonaSize, IPersonaProps, PersonaInitialsColor } from '@fluentui/react/lib/Persona';
import { PersonAdd24Regular } from "@fluentui/react-icons";
import { initializeIcons } from '@fluentui/react';
import Classes from './PersonPicker.module.css';


initializeIcons();
const PersonPicker: React.FC = () => {

    // const people: IPersonaProps[] = [];
    const [numberOfFaces, setNumberOfFaces] = useState(4);
    // const [peopleList, setPeopleList] = useState<IPersonaProps[]>(people);
    // const [mostRecentlyUsed, setMostRecentlyUsed] = useState<IPersonaProps[]>(mru);
    const [showMemberListDropdown, setShowMemberListDropdown] = useState(false);

    const persons = FacepilePersona.slice(0, numberOfFaces);

    const addButtonProps = {
        ariaLabel: 'Add member to the task',
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            console.log('Add memebr clicked!!!');
            setNumberOfFaces(prevVal => prevVal+1);
        }
    };

    const toggleMemberListHandler = (): void => {
        setShowMemberListDropdown(prevVal => ! prevVal);
    }

    return (
        <>
            <div className={Classes.dropdown}>
                <div className={Classes.addMember} onClick={toggleMemberListHandler}>
                    <PersonAdd24Regular className='addMemberBtn'  color="rgb(50, 49, 48)" />
                    <Facepile 
                        personas={persons}
                        addButtonProps={addButtonProps}
                        maxDisplayablePersonas={2}
                        personaSize={PersonaSize.size24}
                    />
                </div>
                {showMemberListDropdown && <MemberListDropdown toggleDropdownHandler={toggleMemberListHandler} />}
            </div>
        </>
    )
}

export default PersonPicker;