import React, { useState } from 'react';
import { usePlannerDispatch } from '../../Store';
import { NotificationActions } from '../../slices/notification-slice';
import { MessageType } from '../../constants';

type InputPropsType = {
    type: string;
    name: string;
    id: string;
    value?: any;
    validateUserInput: (userInput: any) => boolean
}

const Input: React.FC<InputPropsType> = (props) => {

    const defaultValue = props.value? props.value: '';

    const [value, setValue] = useState(defaultValue);

    const [isClicked, setIsClicked] = useState(false);

    const dispatch = usePlannerDispatch();

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const inputClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        setIsClicked(true);
    }

    const validateInput = (e: React.FocusEvent<HTMLInputElement>) => {
        if(! props.validateUserInput(e.target.value)) {
            dispatch(NotificationActions.showNotification({
                message: 'Name cant be empty',
                notificationType: MessageType.Error,
                isNotification: true 
            }));
        }
    }

    return (
        <>
            <input {...props}  value={value} 
                    onChange={changeInputHandler} 
                    onClick={inputClickHandler} 
                    onBlur={validateInput} />
        </>
    )
}

export default Input;