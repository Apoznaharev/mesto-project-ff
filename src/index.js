import "./index.css";
import { addCardItem, removeCardItem, toggleLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation, validationConfig } from "./components/validation.js";
import {
  getProfileData,
  getInitialCards,
  patchProfileData,
  postNewCard,
  patchProfileAvatar,
} from "./components/api.js";

const profilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAvatar = document.querySelector(".profile__image");
const profileAvatarPopup = document.querySelector(".popup_type_avatar");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const addCardForm = document.forms.new_place;
const editProfileForm = document.forms.edit_profile;
const editAvatarForm = document.forms.edit_avatar;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const cardsContainer = document.querySelector(".places__list");
const imagePopupCaption = document.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");
const imageOpened = document.querySelector(".popup__image");
let useId = null;

const openCardModal = (name, link) => {
  openModal(imagePopup);
  imageOpened.src = link;
  imageOpened.alt = name;
  imagePopupCaption.textContent = name;
};

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, addCardForm);
  postNewCard({
    name: addCardForm.elements.place_name.value,
    link: addCardForm.elements.link.value,
  })
    .then((newCard) => {
      cardsContainer.prepend(
        addCardItem(newCard, removeCardItem, toggleLike, openCardModal, useId)
      );
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(addCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, addCardForm);
    });
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, editProfileForm);
  patchProfileData({
    name: editProfileForm.elements.name.value,
    about: editProfileForm.elements.description.value,
  })
    .then((data) => {
      displayProfileData(data);
      closeModal(profilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, editProfileForm);
    });
});

editAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, editAvatarForm);
  patchProfileAvatar({
    avatar: editAvatarForm.elements.avatar.value,
  })
    .then((data) => {
      displayProfileAvatar(data);
      editAvatarForm.reset();
      closeModal(profileAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editAvatarForm);
    });
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closeModal(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
  clearValidation(addCardForm, validationConfig);
});

profileEditButton.addEventListener("click", () => {
  openModal(profilePopup);
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
});

profileAvatar.addEventListener("click", () => {
  openModal(profileAvatarPopup);
  clearValidation(editAvatarForm, validationConfig);
});

const displayProfileData = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
};

const displayProfileAvatar = (data) => {
  profileImage.style.backgroundImage = `url(${data.avatar})`;
};

const displayInitialCards = (data, userId) => {
  data.forEach((card) => {
    cardsContainer.append(
      addCardItem(card, removeCardItem, toggleLike, openCardModal, userId)
    );
  });
};

const renderLoading = (isLoading, form) => {
  if (isLoading) {
    form.querySelector(".popup__button").textContent = "Сохранение...";
  } else {
    form.querySelector(".popup__button").textContent = "Сохранить";
  }
};

enableValidation(validationConfig);

Promise.all([getProfileData(), getInitialCards()])
  .then(([profileData, initialCards]) => {
    useId = profileData._id;
    displayProfileData(profileData);
    displayProfileAvatar(profileData);
    displayInitialCards(initialCards, useId);
  })
  .catch((err) => {
    console.log(err);
  });
