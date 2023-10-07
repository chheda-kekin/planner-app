import React, { useState, useContext } from 'react';
import MemberListDropdown from '../MemberListDropdown/MemberListDropdown';
import { FacepilePersona } from './FacepilePersona';
import { people, mru, facepilePersonas } from '@fluentui/example-data';
import {  PersonaSize, IPersonaProps, PersonaInitialsColor } from '@fluentui/react/lib/Persona';
import { PersonAdd20Regular } from "@fluentui/react-icons";
import { initializeIcons } from '@fluentui/react';
import { Facepile, IFacepilePersona } from '@fluentui/react/lib/Facepile';

import TaskContext from '../../components/Tasklist/Task/task-context';
import Classes from './PersonPicker.module.css';

initializeIcons();

const PersonPicker: React.FC = () => {
    const members = FacepilePersona;
    // const [persons, setPersons] = useState<IFacepilePersona[]>([]);
    const [showMemberListDropdown, setShowMemberListDropdown] = useState(false);

    const tskCntxt = useContext(TaskContext);
    const persons = tskCntxt.members;

    const addButtonProps = {
        ariaLabel: 'Add member to the task',
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        }
    };

    const toggleMemberListHandler = (personDetails: IFacepilePersona): void => {
        if (persons.findIndex(person => person.personaName === personDetails.personaName) === -1) {
            console.log('PersonPicker toggleMemberListHandler called...');
            // setPersons([...persons, personDetails]);
            tskCntxt.onAddMember(personDetails);
        } else {
            // setPersons(persons.filter(person => person.personaName !== personDetails.personaName));
            tskCntxt.onRemoveMember(personDetails);
        }
    }

    return (
        <>
            <div className={Classes.dropdown}>
                <div className={Classes.addMember} onClick={() => setShowMemberListDropdown(prevVal => ! prevVal)}>
                    <div className={Classes.addMemberBtn}>
                        <PersonAdd20Regular  color="rgb(50, 49, 48)" />
                    </div>
                    <Facepile
                        personas={tskCntxt.members}
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