import {Routes, Route, Link} from "react-router-dom";
import React, {useState} from "react";

import './Auth.css';

import {AuthOptions} from "../../components/Auth/AuthOptions/AuthOptions";
import {EmailLogin} from "../../components/Auth/EmailAuth/EmailLogin";
import {EmailRegister} from "../../components/Auth/EmailAuth/EmailRegister";

export const Auth = ({isAuthenticated, setIsAuthenticated}: AuthProps) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [alert, setAlert] = useState(null);

    const switchMode = () => {
        setIsSignIn((prevIsSignIn) => !prevIsSignIn);
    };

    return (
        <section id="auth" className="section auth__section">
            <Routes>
                <Route path={"/"} element={<AuthOptions />} />
                <Route path={'email'} element={<div className="auth__container container">
                    {alert ? alert : ''}

                    <h2 className="section__title">{isSignIn ? 'Connexion' : 'Inscription'}</h2>
                    <span className="section__subtitle">Remplissez le formulaire</span>

                    <div className="auth__form-container">
                        {isSignIn ? <EmailLogin setAlert={setAlert} /> : <EmailRegister setAlert={setAlert} />}

                        <div className="auth__switch">
                            <div className="auth__switch-button" onClick={switchMode}>
                                    {isSignIn ? 'Vous n\'avez pas de compte ?' : 'Vous avez déjà un compte ?'}
                                    <span>{isSignIn ? 'Inscrivez-vous !' : 'Connectez-vous !'}</span>
                            </div>
                            <div className="auth__switch-button">
                                <Link to="/auth">Revenir en arrière</Link>
                            </div>
                        </div>
                    </div>
                </div>} />
            </Routes>
        </section>
    );
};

interface AuthProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}
