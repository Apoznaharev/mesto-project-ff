const cardTemplate = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

const removeCardItem = (cardItem) => {
  cardItem.remove();
};

const addCardItem = ({ name, link }) => {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__image").src = link;
  cardItem.querySelector(".card__title").textContent = name;
  cardItem.querySelector(".card__delete-button").addEventListener("click", () => {
    removeCardItem(cardItem);
  });
  cardList.append(cardItem);
};

initialCards.forEach(addCardItem);
