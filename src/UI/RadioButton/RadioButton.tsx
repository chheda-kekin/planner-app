import React from 'react';
import Classes from './RadioButton.module.css';

type RadioButtonProps = {
    name: string;
    id: string;
    value: string;
    label: string;
    checked?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {

    const isChecked = props.checked ? props.checked : false; 
    return (
        <>
            <div className={Classes.radioBtnWrapper}>
                <label htmlFor={props.id}>
                    <input type='radio' name={props.name} 
                        id={props.id} value={props.value} />
                    {props.label}
                </label>
            </div>
        </>
    )
}

export default RadioButton;