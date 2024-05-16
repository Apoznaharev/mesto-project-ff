const cardTemplate = document.querySelector("#card-template").content;

const cardsContainer = document.querySelector(".places__list");

const removeCardItem = (cardItem) => {
  cardItem.remove();
};

const addCardItem = ({ name, link }, deleteHandler) => {
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
  return cardItem;
};

initialCards.forEach((card) => {
  cardsContainer.append(addCardItem(card, removeCardItem));
});
