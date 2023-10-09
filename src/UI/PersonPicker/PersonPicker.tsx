import React, { useState, useEffect } from 'react';
import MemberListDropdown from '../MemberListDropdown/MemberListDropdown';
import {  PersonaSize } from '@fluentui/react/lib/Persona';
import { PersonAdd20Regular } from "@fluentui/react-icons";
import { initializeIcons } from '@fluentui/react';
import { Facepile, IFacepilePersona } from '@fluentui/react/lib/Facepile';

import Classes from './PersonPicker.module.css';

initializeIcons();

const PersonPicker: React.FC<{taskMembers: IFacepilePersona[], teamMembers: IFacepilePersona[], toggleMemberListHandler: (memberDetails: IFacepilePersona) => void}> = (props) => {
    
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

    return (
        <>
            <div className={Classes.dropdown} onBlur={() => setShowMemberListDropdown(false)}>
                <div className={Classes.addMember} onClick={() => setShowMemberListDropdown(prevVal => ! prevVal)}>
                    <div className={Classes.addMemberBtn}>
                        <PersonAdd20Regular  color="rgb(50, 49, 48)" />
                    </div>
                    <Facepile
                        personas={props.taskMembers}
                        addButtonProps={addButtonProps}
                        maxDisplayablePersonas={5}
                        personaSize={PersonaSize.size24}
                    />
                </div>
                {showMemberListDropdown && <MemberListDropdown members={props.teamMembers} toggleDropdownHandler={props.toggleMemberListHandler} />}
            </div>
        </>
    )
}

export default PersonPicker;