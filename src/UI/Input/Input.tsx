import React from 'react';

type InputPropsType = {
    type: string;
    name: string;
    id: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputPropsType> = (props) => {
    return (
        <>
            <input {...props} />
        </>
    )
}

export default Input;