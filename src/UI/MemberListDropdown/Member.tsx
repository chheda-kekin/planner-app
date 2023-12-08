import React from "react";
import { Persona, PersonaSize, IPersonaProps } from "@fluentui/react/lib/Persona";
import { Dismiss12Regular } from "@fluentui/react-icons";
import { TaskMember } from "../../constants";

import Classes from "./Member.module.css";

type MemberPropsType = {
    personDetails: TaskMember,
    selectMemberHandler: (member: TaskMember) => void
}

const Member: React.FC<MemberPropsType> = (props) => {

    const personaProps: IPersonaProps = {
        imageInitials: props.personDetails.imageInitials,
        text: props.personDetails.personaName
    };

    return (
        <>
            <div className={Classes.user} onClick={props.selectMemberHandler.bind(this, props.personDetails)}>
                <button role="option">
                    <Persona {...personaProps} 
                        size={PersonaSize.size32} 
                        initialsColor={props.personDetails.initialsColor} />
                </button>
                <div>
                    <Dismiss12Regular color="rgb(50, 49, 48)" />
                </div>
            </div>
        </>
    )
}

export default Member;