import React, { useState } from 'react';
import DatePickerField from '../../UI/DatePickerField/DatePickerField';
import RadioButton from '../../UI/RadioButton/RadioButton';
import Input from '../../UI/Input/Input';
import { NotificationActions } from '../../slices/notification-slice';
import { usePlannerDispatch } from '../../Store';

import { MessageType, ValidationResType } from '../../constants';

import { validateMemberFirstName, validateEmail, 
    validateMemberLastName, validatePhoneNumber, validateUserPassword, 
    validateConfirmPassword } from '../../helper';

import Classes from './Signup.module.css';
import AppClasses from "../../App.module.css";

const Signup: React.FC = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedGender, setSelectedGender] = useState('male');
    const [dob, setDOB] = useState(Date.now());

    const dispatch = usePlannerDispatch();

    const displayValidationError = (errMsg: string) => {
        dispatch(NotificationActions.showNotification({
            message: errMsg,
            notificationType: MessageType.Error,
            isNotification: true
        }));
    }

    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name) {
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'phone':
                setPhone(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value);
                break;
        }
    }

    const validateUserInput = (e: React.FocusEvent<HTMLInputElement>) => {

        let validationResult: ValidationResType = {
            isValid: true,
            message: '',
            value: ''
        };

        switch(e.target.name) {
            case 'firstName':
                validationResult = validateMemberFirstName(firstName);
                break;
            case 'lastName':
                validationResult = validateMemberLastName(lastName);
                break;
            case 'email':
                validationResult = validateEmail(email);
                break;
            case 'phone':
                validationResult = validatePhoneNumber(phone);
                break;
            case 'password':
                validationResult = validateUserPassword(e.target.value);
                break;
            case 'confirmPassword':
                validationResult = validateConfirmPassword(e.target.value);
                break;
        }

        if(validationResult && ! validationResult.isValid) {
            displayValidationError(validationResult.message);
        } else {
            return;
        }
    }

    const selectDOBHandler = (dob: string) => {
        const selectedDOB = new Date(dob);
        setDOB(selectedDOB.getTime());
    }

    const submitFormHandler = (e: any) => {
        e.preventDefault();
        const firstNameValid = validateMemberFirstName(firstName);
        if(! firstNameValid.isValid) {
            displayValidationError(firstNameValid.message);
            return;
        } else {
            const emailValid = validateEmail(email);
            if(! emailValid.isValid) {
                displayValidationError(emailValid.message);
                return;
            } else {
                const phoneNoValid = validatePhoneNumber(phone);
                if(! phoneNoValid.isValid) {
                    displayValidationError(phoneNoValid.message);
                    return;
                } else {
                    const passwordValid = validateUserPassword(password);
                    if(! passwordValid.isValid) {
                        displayValidationError(passwordValid.message);
                        return;
                    } else {
                        const confirmPasswordValid = validateConfirmPassword(confirmPassword);
                        if(! confirmPasswordValid.isValid) {
                            displayValidationError(confirmPasswordValid.message);
                            return;
                        } else {
                            console.log('Send add member request');
                            const memberData = {
                                firstName,
                                lastName,
                                email,
                                phone,
                                password,
                                selectedGender,
                                dob
                            };

                            console.log('Member data saved is', memberData);
                        }
                    }
                }
            }
        }
    }

    const selectGenderListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(e.target.value);
    }

    return (
        <>
            <div className={Classes.overlay}>
                <div className={Classes.formWrapper}>
                    <form onSubmit={submitFormHandler}>
                        <div className={Classes.nameFieldWrapper}>
                            <div className={Classes.nameField}>
                                <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                    <label htmlFor='firstName'>First Name</label>
                                </div>
                                <div className={Classes.field}>
                                    <Input  type='text' id='firstName' name='firstName'
                                            value={firstName} onChange={changeInputHandler} 
                                            onBlur={validateUserInput} />
                                </div>
                            </div>
                            <div className={Classes.nameField}>
                                <div className={Classes.fieldLabel}>
                                    <label htmlFor='lastName'>Last Name</label>
                                </div>
                                <div className={Classes.field}>
                                    <Input type='text' id='lastName' name='lastName'
                                            value={lastName} onChange={changeInputHandler}
                                            onBlur={validateUserInput} />
                                </div>
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className={Classes.field}>
                                <Input type='email' id='email'  name='email'
                                    value={email}  onChange={changeInputHandler} 
                                    onBlur={validateUserInput} />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='phone'>Phone</label>
                            </div>
                            <div className={Classes.field}>
                                <Input type='tel' id='phone' name='phone'
                                    value={phone} onChange={changeInputHandler}
                                    onBlur={validateUserInput} />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='password'>Password</label>
                            </div>
                            <div className={Classes.field}>
                                <Input type='password' id='password' name='password'
                                        value={password} onChange={changeInputHandler} 
                                        onBlur={validateUserInput} />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='confirmPassword'>Re-enter Password</label>
                            </div>
                            <div className={Classes.field}>
                                <Input type='password' id='confirmPassword' name='confirmPassword'
                                    value={confirmPassword} onChange={changeInputHandler} 
                                    onBlur={validateUserInput} />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor='gender'>Gender</label>
                            </div>
                            <div className={Classes.field}>
                                <RadioButton name='gender' id='male' value='male' label='Male' checked={selectedGender === 'male'} 
                                    handleChange={selectGenderListener} />
                                <RadioButton name='gender' id='female' value='female' label='Female' checked={selectedGender === 'female'} 
                                    handleChange={selectGenderListener} />
                            </div>                            
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='dob'>Date of birth</label>
                            </div>
                            <div className={Classes.field}>
                                <DatePickerField selectedDate={new Date(dob)} selectDateListener={selectDOBHandler} />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.submitButton}>
                                <button className={AppClasses.primaryBtn} type="submit">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;