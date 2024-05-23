import "./index.css";
import { initialCards } from "./cards.js";
import { addCardItem, removeCardItem, cardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const profilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const addCardForm = document.forms.new_place;
const editProfileForm = document.forms.edit_profile;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".places__list");
const imagePopupCaption = document.querySelector(".popup__caption");

const cardModal = (name, link) => {
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = link;
  popupImage.alt = name;
  imagePopupCaption.textContent = name;
};

addCardForm.addEventListener("submit", (event) => {
  const placeName = addCardForm.elements.place_name;
  const placeLink = addCardForm.elements.link;
  event.preventDefault();
  cardsContainer.prepend(
    addCardItem(
      { name: placeName.value, link: placeLink.value },
      removeCardItem,
      cardLike,
      cardModal
    )
  );
  addCardForm.reset();
  closeModal(addCardPopup);
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = editProfileForm.elements.name.value;
  profileDescription.textContent = editProfileForm.elements.description.value;
  closeModal(profilePopup);
});

initialCards.forEach((card) => {
  cardsContainer.append(addCardItem(card, removeCardItem, cardLike, cardModal));
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
});
