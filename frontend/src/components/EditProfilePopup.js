import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name ?? '');
        setDescription(currentUser.about ?? '');
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    function handleSetName(e) {
        setName(e.target.value);
    }

    function handleSetDescription(e) {
        setDescription(e.target.value);
    }


    return (
        <PopupWithForm
            name={"edit"}
            title={"Редактировать профиль"}
            buttonText={"Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            overlayClick={props.overlayClick}
            onSubmit={handleSubmit}
        >
            <input id="name-input" value={name} onChange={handleSetName} className="popup__input popup__input_type_name" placeholder="Имя" name="name" required minLength="2" maxLength="40" />
            <span id="error-name-input" className="popup__error-message"></span>
            <input id="about-input" value={description} onChange={handleSetDescription} className="popup__input popup__input_type_description" placeholder="О себе" name="about" required minLength="2" maxLength="200" />
            <span id="error-about-input" className="popup__error-message"></span>
        </PopupWithForm>
    )
}