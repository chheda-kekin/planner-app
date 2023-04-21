import Member from './Member';
import Classes from "./MemberListDropdown.module.css";


const MemberListDropdown: React.FunctionComponent<{toggleDropdownHandler: () => void}> = (props) => {

    const addMemberListener = () => {
        props.toggleDropdownHandler();
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
                        <Member addMemberListener={addMemberListener} />
                        <Member addMemberListener={addMemberListener} />
                        <Member addMemberListener={addMemberListener} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberListDropdown;