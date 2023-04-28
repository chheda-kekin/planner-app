import React from "react";
import { Persona, PersonaSize, IPersonaProps, PersonaInitialsColor } from "@fluentui/react/lib/Persona";
import { IFacepilePersona } from "@fluentui/react";
import { Dismiss12Regular } from "@fluentui/react-icons";

import Classes from "./Member.module.css";

const Member: React.FC<{addMemberListener: (personDetails: IFacepilePersona) => void, personDetails: IFacepilePersona}> = (props) => {


    console.log('props.personDetails', props.personDetails);

    const personaProps: IPersonaProps = {
        imageInitials: props.personDetails.imageInitials,
        text: props.personDetails.personaName
    };

    return (
        <>
            <div className={Classes.user} onClick={props.addMemberListener.bind(this, props.personDetails)}>
                <button role="option">
                    <Persona {...personaProps} size={PersonaSize.size32} initialsColor={props.personDetails.initialsColor} />
                </button>
                <div>
                    <Dismiss12Regular color="rgb(50, 49, 48)" />
                </div>
            </div>
        </>
    )
}

export default Member;