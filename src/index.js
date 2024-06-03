import "./index.css";
import { addCardItem, removeCardItem, cardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
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
let useId = null;

const cardModal = (name, link) => {
  openModal(imagePopup);
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = link;
  popupImage.alt = name;
  imagePopupCaption.textContent = name;
};

addCardForm.addEventListener("submit", (event) => {
  const newCardData = {
    name: addCardForm.elements.place_name.value,
    link: addCardForm.elements.link.value,
  };
  renderLoading(true, addCardForm);
  postNewCard(newCardData)
    .then((newCard) => {
      cardsContainer.prepend(
        addCardItem(newCard, removeCardItem, cardLike, cardModal, useId)
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, addCardForm);
    });
  event.preventDefault();
  addCardForm.reset();
  clearValidation(addCardForm);
  closeModal(addCardPopup);
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, editProfileForm);
  const newData = {
    name: editProfileForm.elements.name.value,
    about: editProfileForm.elements.description.value,
  };
  patchProfileData(newData).finally(() => {
    renderLoading(false, editProfileForm);
  });
  displayProfileData(newData);
  closeModal(profilePopup);
});

editAvatarForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderLoading(true, editAvatarForm);
  const newAvatar = {
    avatar: editAvatarForm.elements.avatar.value,
  };
  patchProfileAvatar(newAvatar)
    .then((data) => {
      displayProfileAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editAvatarForm);
    });

  closeModal(profileAvatarPopup);
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
});

profileEditButton.addEventListener("click", () => {
  openModal(profilePopup);
  editProfileForm.elements.name.value = profileTitle.textContent;
  editProfileForm.elements.description.value = profileDescription.textContent;
  clearValidation(editProfileForm);
});

profileAvatar.addEventListener("click", () => {
  openModal(profileAvatarPopup);
  clearValidation(editAvatarForm);
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
      addCardItem(card, removeCardItem, cardLike, cardModal, userId)
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

enableValidation();

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
