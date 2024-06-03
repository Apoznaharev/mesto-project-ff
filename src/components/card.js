import { deleteCard, putLike, deleteLike } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

export const addCardItem = (
  card,
  deleteHandler,
  cardLikeHandler,
  openCardModalHandler,
  userId
) => {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const likeButton = cardItem.querySelector(".card__like-button");
  const likeCounter = cardItem.querySelector(".card__like-counter");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardItem.querySelector(".card__like-counter").textContent = card.likes.length;
  cardItem.querySelector(".card__title").textContent = card.name;
  if (card.owner._id !== userId) {
    cardItem.querySelector(".card__delete-button").remove();
  } else {
    cardItem
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        deleteHandler(cardItem, card._id);
      });
  }

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (event) => {
    cardLikeHandler(event.target, card, likeCounter);
  });
  cardImage.addEventListener("click", (event) => {
    openCardModalHandler(card.name, card.link);
  });
  return cardItem;
};

export const cardLike = (likeIcon, card, likeCounter) => {
  if (likeIcon.classList.contains("card__like-button_is-active")) {
    deleteLike(card._id).then((card) => {
      likeCounter.textContent = card.likes.length;
    });
  } else {
    putLike(card._id).then((card) => {
      likeCounter.textContent = card.likes.length;
    });
  }
  likeIcon.classList.toggle("card__like-button_is-active");
};

export const removeCardItem = (cardItem, cardId) => {
  deleteCard(cardId);
  cardItem.remove();
};
