/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import logo from '../images/logo.svg';
import { useLocation } from "react-router-dom";

function Header(props) {

    const [buttonText, setButtonText] = React.useState('');

    const location = useLocation();

    const isSignIn = location.pathname === '/sign-in'
    const isSignUp = location.pathname === '/sign-up'
    const isLogin = location.pathname === '/'

    useEffect(() => {
        if (isSignIn) {
            setButtonText("Зарегистрироваться")
        } if (isSignUp) {
            setButtonText("Войти")
        } if (isLogin) {
            setButtonText("Выйти")
        }
    }, [isLogin, isSignIn, isSignUp, location]);

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <div className="header__text-container">
                <p className="header__email">{props.email}</p>
                <a className="header__link" onClick={props.handleClickLog}>{buttonText}</a>
            </div>
        </header>
    )
}

export default Header