import { openModal } from "./modal";
const imagePopup = document.querySelector(".popup_type_image");
const cardTemplate = document.querySelector("#card-template").content;

export const addCardItem = (
  { name, link },
  deleteHandler,
  cardLikeHandler,
  openCardModalHandler
) => {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardItem.querySelector(".card__title").textContent = name;
  cardItem
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteHandler(cardItem);
    });
  cardItem
    .querySelector(".card__like-button")
    .addEventListener("click", (event) => {
      cardLikeHandler(event.target);
    });
  cardImage.addEventListener("click", (event) => {
    openModal(imagePopup);
    openCardModalHandler(name, link);
  });
  return cardItem;
};

export const cardLike = (likeIcon) => {
  likeIcon.classList.toggle("card__like-button_is-active");
};

export const removeCardItem = (cardItem) => {
  cardItem.remove();
};
