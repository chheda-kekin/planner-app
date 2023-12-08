import React, { ChangeEvent, useEffect, useState } from 'react';
import Member from './Member';
import { TaskMember, baseUrl } from '../../constants';
import { getTaskMembers } from '../../helper';
import Classes from "./MemberListDropdown.module.css";
import axios from 'axios';

type MemberListDropdownPropsType = {
    selectMemberHandler: (member: TaskMember) => void
}

const MemberListDropdown: React.FC<MemberListDropdownPropsType> = ({ selectMemberHandler }) => {

    const [searchKey, setSearchKey]  = useState('');
    const [allMembers, setAllMembers] = useState<Array<TaskMember>>([]);

    useEffect(() => {

        const timer = setTimeout(async () => {
            // Sending request to search members API
            const { data } = await axios.get(`${baseUrl}/members?key=${searchKey}`);
            setAllMembers(getTaskMembers(data));    
        }, 1000);

        return () => {
            if(timer) {
                clearTimeout(timer);
            }
        }
    }, [searchKey]);

    const searchKeyChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
    }

    return (
        <>
            <div className={Classes.dropdownContent}>
                <div className={Classes.searchField}>
                    <div className={Classes.fieldGroup}>
                        <input type="text" 
                            value={searchKey} 
                            onChange={searchKeyChangeHandler}
                            className={Classes.textField} 
                            placeholder="Type a name or email address" />
                    </div>
                </div>
                <div className={Classes.userListSection}>
                    <div className={Classes.sectionTitle}>Suggestions</div>
                    <div className={Classes.userList}>
                        {allMembers.map(m => {
                            return <Member key={m.id}  
                                        selectMemberHandler={selectMemberHandler} 
                                        personDetails={m} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberListDropdown;