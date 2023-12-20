import React from "react";
import successImage from "../images/popup-auth-success.svg";
import errorImage from "../images/popup-auth-error.svg";

export default function InfoTooltip(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onClick={props.overlayClick}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose} />
                <img className="popup__auth-image" alt={props.isSuccess ? "галочка" : "крестик"} src={props.isSuccess ? successImage : errorImage} />
                <h2 className="popup__auth-title">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </div>
    )
}