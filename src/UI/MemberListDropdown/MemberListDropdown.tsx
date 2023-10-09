import Member from './Member';
import { IFacepilePersona } from "@fluentui/react";
import Classes from "./MemberListDropdown.module.css";

const MemberListDropdown: React.FunctionComponent<{ toggleDropdownHandler: (personDetails: IFacepilePersona) => void, members: IFacepilePersona[] }> = (props) => {
    
    const addMemberListener = (personDetails: IFacepilePersona) => {
        props.toggleDropdownHandler(personDetails);
    }

    return (
        <>
            <div className={Classes.dropdownContent}>
                <div className={Classes.searchField}>
                    <div className={Classes.fieldGroup}>
                        <input type="text" className={Classes.textField} placeholder="Type a name or email address" />
                    </div>
                </div>
                <div className={Classes.userListSection}>
                    <div className={Classes.sectionTitle}>Suggestions</div>
                    <div className={Classes.userList}>
                        {props.members.map(people => {
                            return <Member key={people.personaName} addMemberListener={addMemberListener} personDetails={people} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberListDropdown;