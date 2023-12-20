import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {

    const [buttonText, setButtonText] = React.useState('Сохранить');


    React.useEffect(() => {
        imageRef.current.value='';
    }, [props.isOpen])

    const imageRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: imageRef.current.value,
        }, setButtonText);
    }

    return (
        <PopupWithForm
            name={"avatar"}
            title={"Обновить аватар"}
            buttonText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            overlayClick={props.overlayClick}
            onSubmit={handleSubmit}
        >
            <input id="avatar-input" ref={imageRef} className="popup__input popup__input_type_description" name="avatar" placeholder="Ссылка на картинку" type="url" required />
            <span id="error-avatar-input" className="popup__error-message"></span>
        </PopupWithForm>
    )
}