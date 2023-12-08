import React, { useState, useEffect } from 'react';
import MemberListDropdown from '../MemberListDropdown/MemberListDropdown';
import { TaskMember } from '../../constants';
import {  PersonaSize } from '@fluentui/react/lib/Persona';
import { PersonAdd20Regular } from "@fluentui/react-icons";
import { initializeIcons } from '@fluentui/react';
import { Facepile, IFacepilePersona } from '@fluentui/react/lib/Facepile';

import Classes from './PersonPicker.module.css';

initializeIcons();

type PersonPickerProps = {
    selectedMembers: TaskMember[],
    selectMemberHandler: (member: TaskMember) => void
};

const PersonPicker: React.FC<PersonPickerProps> = (props) => {
    
    const [showMemberListDropdown, setShowMemberListDropdown] = useState(false);

    useEffect(() => {
        return () => {
            setShowMemberListDropdown(false);
        };
    }, []);

    const addButtonProps = {
        ariaLabel: 'Add member to the task',
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        }
    };

    const members = props.selectedMembers.map(m => {
        return {
            personaName: m.personaName,
            imageInitials: m.imageInitials,
            initialsColor: m.initialsColor
        } as IFacepilePersona;
    });

    return (
        <>
            <div className={Classes.dropdown}>
                <div className={Classes.addMember} onClick={() => setShowMemberListDropdown(prevVal => ! prevVal)}>
                    <div className={Classes.addMemberBtn}>
                        <PersonAdd20Regular  color="rgb(50, 49, 48)" />
                    </div>
                    <Facepile
                        personas={members}
                        addButtonProps={addButtonProps}
                        maxDisplayablePersonas={5}
                        personaSize={PersonaSize.size24}
                    />
                </div>
                {showMemberListDropdown && 
                    <MemberListDropdown selectMemberHandler={props.selectMemberHandler} />}
            </div>
        </>
    )
}

export default PersonPicker;