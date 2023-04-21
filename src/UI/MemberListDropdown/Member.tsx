import React from "react";
import { Persona, PersonaSize, IPersonaProps, PersonaInitialsColor } from "@fluentui/react/lib/Persona";

import Classes from "./Member.module.css";

const Member: React.FC<{addMemberListener: () => void}> = (props) => {

    const personaProps: IPersonaProps = {
        imageInitials: 'AL',
        text: 'Annie Lindqvist'
    };

    return (
        <>
            <div className={Classes.user} onClick={props.addMemberListener}>
                <button role="option">
                    <Persona {...personaProps} size={PersonaSize.size32} initialsColor={PersonaInitialsColor.magenta} />
                </button>
            </div>
        </>
    )
}

export default Member;