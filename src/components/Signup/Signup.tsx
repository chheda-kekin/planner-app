import React from 'react';
import DatePickerField from '../../UI/DatePickerField/DatePickerField';
import RadioButton from '../../UI/RadioButton/RadioButton';

import Classes from './Signup.module.css';

const Signup: React.FC = () => {

    console.log('Signup component loaded!');

    const selectDOBHandler = (dob: string) => {
        console.log('Selected date of birth is:', dob);
    }

    return (
        <>
            <div className={Classes.overlay}>
                <div className={Classes.formWrapper}>
                    <form>
                        <div className={Classes.nameFieldWrapper}>
                            <div className={Classes.nameField}>
                                <div className={Classes.fieldLabel}>
                                    <label htmlFor='firstName'>First Name</label>
                                </div>
                                <div className={Classes.field}>
                                    <input type='text' id='firstName' name='firstName' />
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
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className={Classes.field}>
                                <input type='text' id='email' name='email' />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor='password'>Password</label>
                            </div>
                            <div className={Classes.field}>
                                <input type='password' id='password' name='password' />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor='confirmPassword'>Re-enter Password</label>
                            </div>
                            <div className={Classes.field}>
                                <input type='password' id='confirmPassword' name='confirmPassword' />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor='gender'>Gender</label>
                            </div>
                            <div className={Classes.field}>
                                <RadioButton name='gender' id='gender' value='male' label='Male' />
                                <RadioButton name='gender' id='gender' value='female' label='Female' />
                                {/* <input type='radio' id='gender' name='gender' value='female' />Female */}
                            </div>                            
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor='dob'>Date of birth</label>
                            </div>
                            <div className={Classes.field}>
                                <DatePickerField selectedDate={new Date()} selectDateListener={selectDOBHandler} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;