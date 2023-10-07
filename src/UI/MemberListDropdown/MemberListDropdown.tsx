import { useContext } from 'react';
import TaskContext from '../../components/Tasklist/Task/task-context';
import Member from './Member';
import { IFacepilePersona } from "@fluentui/react";
import Classes from "./MemberListDropdown.module.css";

const MemberListDropdown: React.FunctionComponent<{ toggleDropdownHandler: (personDetails: IFacepilePersona) => void, people: IFacepilePersona[] }> = (props) => {

    const tskContext = useContext(TaskContext);
    
    const addMemberListener = (personDetails: IFacepilePersona) => {

        console.log('Added psersona', personDetails);
        props.toggleDropdownHandler(personDetails);
        console.log('TaskContext', tskContext);
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
                        {props.people.map(people => {
                            return <Member key={people.personaName} addMemberListener={addMemberListener} personDetails={people} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberListDropdown;