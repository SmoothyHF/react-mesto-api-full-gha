import React from "react";

function ImagePopup(props) {

    return (
        <div className={`popup popup_type_modal ${props.isOpen ? "popup_opened" : ""}`} onClick={props.overlayClick}>
            <div className="popup__container popup__container_type_modal">
                <button className="popup__close" type="button" onClick={props.onClose}/>
                <img className="popup__modal-image" src={props.card.link} alt={props.card.name} />
                <p className="popup__modal-caption">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;