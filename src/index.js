import "./index.css";
import { initialCards } from "./cards.js";
import { addCardItem } from "./components/addCardItem.js";
import {
  openModal,
  addCardModal,
  cardModal,
  editProfileHandler,
} from "./components/modal.js";

const page = document.querySelector(".page");

initialCards.forEach((card) => {
  document.querySelector(".places__list").append(addCardItem(card));
});

page.addEventListener("click", (event) => {
  if (event.target.classList.contains("profile__edit-button")) {
    openModal(document.querySelector(".popup_type_edit"));
    editProfileHandler();
  }
  if (event.target.classList.contains("profile__add-button")) {
    openModal(document.querySelector(".popup_type_new-card"));
    addCardModal();
  }
  if (event.target.classList.contains("card__image")) {
    openModal(document.querySelector(".popup_type_image"));
    cardModal(event.target.closest(".card"));
  }
});
