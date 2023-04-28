import React, { useState } from 'react';
import { Facepile } from '@fluentui/react/lib/Facepile';
import MemberListDropdown from '../MemberListDropdown/MemberListDropdown';
import { FacepilePersona } from './FacepilePersona';
import { people, mru, facepilePersonas } from '@fluentui/example-data';
import {  PersonaSize, IPersonaProps, PersonaInitialsColor } from '@fluentui/react/lib/Persona';
import { PersonAdd20Regular } from "@fluentui/react-icons";
import { initializeIcons } from '@fluentui/react';
import Classes from './PersonPicker.module.css';
import { IFacepilePersona } from '@fluentui/react/lib/Facepile';

initializeIcons();
const PersonPicker: React.FC = () => {

    console.log('PersonPicker rendered !!');
    const members = FacepilePersona;
    const [persons, setPersons] = useState<IFacepilePersona[]>([]);
    const [showMemberListDropdown, setShowMemberListDropdown] = useState(false);

    const addButtonProps = {
        ariaLabel: 'Add member to the task',
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        }
    };

    const toggleMemberListHandler = (personDetails: IFacepilePersona): void => {
        if (persons.findIndex(person => person.personaName === personDetails.personaName) === -1) {
            setPersons([...persons, personDetails]);
        } else {
            setPersons(persons.filter(person => person.personaName !== personDetails.personaName));
        }
    }

    return (
        <>
            <div className={Classes.dropdown}>
                <div className={Classes.addMember} onClick={() => setShowMemberListDropdown(prevVal => ! prevVal)}>
                    <PersonAdd20Regular className='addMemberBtn'  color="rgb(50, 49, 48)" />
                    <Facepile
                        personas={persons}
                        addButtonProps={addButtonProps}
                        maxDisplayablePersonas={5}
                        personaSize={PersonaSize.size24}
                    />
                </div>
                {showMemberListDropdown && <MemberListDropdown people={members} toggleDropdownHandler={toggleMemberListHandler} />}
            </div>
        </>
    )
}

export default PersonPicker;