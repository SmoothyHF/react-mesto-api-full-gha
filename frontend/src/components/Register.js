import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
   
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister({ email, password })
        .then(resetForm)
        .then(() => {
            navigate('/sign-in', {replace: true});
        })
    }

    function handleClickLogIn() {
        navigate('/sign-in', {replace: true});
    }

    return (
        <form onSubmit={handleSubmit} className="auth auth_type_register">
            <h2 className="auth__title">Регистрация</h2>
            <input id="email-input" value={email} onChange={({target: {value}}) => setEmail(value)} className="auth__input auth__input_type_email" type="email" name="email" required placeholder="Email" />
            <input id="password-input" value={password} onChange={({target: {value}}) => setPassword(value)} className="auth__input auth__input_type_password" type="password" name="password" required placeholder="Пароль" />
            <button type="submit" className="auth__button">Зарегистрироваться</button>
            <p className="auth__button_text">Уже зарегистрированы? <button onClick={handleClickLogIn} className="auth__button_login">Войти</button></p>
        </form>
    )
}