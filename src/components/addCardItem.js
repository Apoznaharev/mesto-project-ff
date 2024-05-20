export const addCardItem = (
  { name, link },
  deleteHandler = removeCardItem,
  cardLikeHandler = cardLike
) => {
  const cardTemplate = document.querySelector("#card-template").content;
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
  return cardItem;
};

const cardLike = (likeIcon) => {
  likeIcon.classList.toggle("card__like-button_is-active");
};

const removeCardItem = (cardItem) => {
  cardItem.remove();
};
