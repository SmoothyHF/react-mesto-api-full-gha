import React from "react"


function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onClick={props.overlayClick}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose}/>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" onSubmit={props.onSubmit} name={`${props.name}`}>
                    {props.children}
                    <button className="popup__button-save" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;