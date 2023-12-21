import React from "react";
import { useNavigate } from "react-router-dom";
import Classes from "./Login.module.css";
import AppClasses from "../../App.module.css";

const Login: React.FC = () => {

    const navigate = useNavigate();

    const navigateToSignupPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(`/signup`);
    }

    return (
        <>
            <div className={Classes.overlay}>
                <div className={Classes.loginWrapper}>
                    <form>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor="userId">Email</label>
                            </div>
                            <div className={Classes.field}>
                                <input type="text" id="userId" />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.fieldLabel}>
                                <label htmlFor="userPassword">Password</label>
                            </div>
                            <div className={Classes.field}>
                                <input type="password" id="userPassword" />
                            </div>
                        </div>
                        <div className={Classes.fieldWrapper}>
                            <div className={Classes.submitButton}>
                                <button className={AppClasses.primaryBtn} type="submit">
                                    Sign In
                                </button>
                            </div>
                        </div>
                        <div className={Classes.signupDiv}>
                            Need an account? <a onClick={navigateToSignupPage}>SIGN UP</a> 
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;