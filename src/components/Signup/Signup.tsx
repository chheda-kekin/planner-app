import React from 'react';
import DatePickerField from '../../UI/DatePickerField/DatePickerField';
import RadioButton from '../../UI/RadioButton/RadioButton';
import Input from '../../UI/Input/Input';

import { validateMemberFirstName } from '../../helper';

import Classes from './Signup.module.css';
import AppClasses from "../../App.module.css";

const Signup: React.FC = () => {

    const selectDOBHandler = (dob: string) => {
        console.log('Selected date of birth is:', dob);
    }

    const submitFormHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }



    return (
        <>
            <div className={Classes.overlay}>
                <div className={Classes.formWrapper}>
                    <form>
                        <div className={Classes.nameFieldWrapper}>
                            <div className={Classes.nameField}>
                                <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                    <label htmlFor='firstName'>First Name</label>
                                </div>
                                <div className={Classes.field}>
                                    <Input type='text' id='firstName' name='firstName' 
                                            validateUserInput={validateMemberFirstName} />
                                    {/* <input type='text' id='firstName' name='firstName' /> */}
                                </div>
                            </div>
                            <div className={Classes.nameField}>
                                <div className={Classes.fieldLabel}>
                                    <label htmlFor='lastName'>Last Name</label>
                                </div>
                                <div className={Classes.field}>
                                    <input type='text' id='lastName' name='lastName' />
                                </div>
                            </div>
                        </div>
                        {/* <div className={Classes.errorDiv}>
                            <small>Valid name is required</small>
                        </div> */}
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className={Classes.field}>
                                <input type='text' id='email' name='email' />
                            </div>
                        </div>
                        {/* <div className={Classes.errorDiv}>
                            <small>Valid email is required</small>
                        </div> */}
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='phone'>Phone</label>
                            </div>
                            <div className={Classes.field}>
                                <input type='tel' id='phone' name='phone' />
                            </div>
                        </div>
                        {/* <div className={Classes.errorDiv}>
                            <small>Phone number is mandatory</small>
                        </div> */}
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='password'>Password</label>
                            </div>
                            <div className={Classes.field}>
                                <input type='password' id='password' name='password' />
                            </div>
                        </div>
                        {/* <div className={Classes.errorDiv}>
                            <small>Please enter valid password</small>
                        </div> */}
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='confirmPassword'>Re-enter Password</label>
                            </div>
                            <div className={Classes.field}>
                                <input type='password' id='confirmPassword' name='confirmPassword' />
                            </div>
                        </div>
                        {/* <div className={Classes.errorDiv}>
                            <small>Password is not martching</small>
                        </div> */}
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor='gender'>Gender</label>
                            </div>
                            <div className={Classes.field}>
                                <RadioButton name='gender' id='male' value='male' label='Male' />
                                <RadioButton name='gender' id='female' value='female' label='Female' />
                            </div>                            
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={`${Classes.fieldLabel} ${Classes.required}`}>
                                <label htmlFor='dob'>Date of birth</label>
                            </div>
                            <div className={Classes.field}>
                                <DatePickerField selectedDate={new Date()} selectDateListener={selectDOBHandler} />
                            </div>
                        </div>
                        {/* <div className={Classes.errorDiv}>
                            <small>Please select date of birth</small>
                        </div> */}
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.submitButton}>
                                <button className={AppClasses.primaryBtn} type="submit" onClick={submitFormHandler}>
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