import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        props.onLogin({ email, password })
            .then(resetForm)
            .then(() => {
                navigate('/', {replace: true});
            })
            .catch(console.error);
    }

    return (
        <form onSubmit={handleSubmit} className="auth auth_type_login">
            <h2 className="auth__title">Вход</h2>
            <input id="email-input" value={email} onChange={({ target: { value } }) => setEmail(value)} className="auth__input auth__input_type_email" type="email" name="email" required placeholder="Email" />
            <input id="password-input" value={password} onChange={({ target: { value } }) => setPassword(value)} className="auth__input auth__input_type_password" type="password" name="password" required placeholder="Пароль" />
            <button type="submit" className="auth__button">Войти</button>
        </form>
    )
}