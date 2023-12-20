import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName(name ?? '');
        setLink(link ?? '');
    }, [link, name])

    function handleSetName(e) {
        setName(e.target.value);
    }

    function handleSetLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlaceSubmit({
            title: name,
            link: link,
        })
    }

    return(
        <PopupWithForm
          name={"add"}
          title={"Новое место"}
          buttonText={"Создать"}
          isOpen={props.isOpen}
          onClose={props.onClose}
          overlayClick={props.overlayClick}
          onSubmit={handleSubmit}
        >
          <input id="title-input" value={name} onChange={handleSetName} className="popup__input popup__input_type_name" name="title" placeholder="Название" required minLength="2" maxLength="30" />
          <span id="error-title-input" className="popup__error-message"></span>
          <input id="image-input" value={link} onChange={handleSetLink} className="popup__input popup__input_type_description" name="link" placeholder="Ссылка на картинку" type="url" required />
          <span id="error-image-input" className="popup__error-message"></span>
        </PopupWithForm>
    )
}