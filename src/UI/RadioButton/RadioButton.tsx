import React from 'react';

type RadioButtonProps = {
    name: string;
    id: string;
    value: string;
    label: string;
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
    return (
        <>
            <label htmlFor="male">
                <input type='radio' name={props.name} id={props.id} value={props.value} />
                {props.label}
            </label>
        </>
    )
}

export default RadioButton;