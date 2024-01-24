import React from 'react';
import Classes from './RadioButton.module.css';

type RadioButtonProps = {
    name: string;
    id: string;
    value: string;
    label: string;
    checked?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {

    // const isChecked = props.checked ? props.checked : false; 
    return (
        <>
            <div className={Classes.radioBtnWrapper}>
                <label htmlFor={props.id}>
                    <input checked={props.checked} type='radio' name={props.name} 
                        id={props.id} value={props.value} onChange={props.handleChange} />
                    {props.label}
                </label>
            </div>
        </>
    )
}

export default RadioButton;