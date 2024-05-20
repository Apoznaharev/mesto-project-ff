import { addCardItem } from "./addCardItem";

function closeModal(popup) {
  const closeButton = popup.querySelector(".popup__close");
  const page = document.querySelector(".page");

  const closePopupHandler = (event) => {
    if (
      (event.type === "click" &&
        (event.target === popup || event.target === closeButton)) ||
      (event.type === "keydown" && event.key === "Escape")
    ) {
      popup.classList.remove("popup_is-opened");
      page.removeEventListener("click", closePopupHandler);
      page.removeEventListener("keydown", closePopupHandler);
    }
  };
  page.addEventListener("click", closePopupHandler);
  page.addEventListener("keydown", closePopupHandler);
}
export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 10);
  closeModal(popup);
}
export function addCardModal() {
  const form = document.forms.new_place;

  form.addEventListener(
    "submit",
    (event) => {
      let placeName = form.elements.place_name.value;
      let placeLink = form.elements.link.value;
      event.preventDefault();
      if (placeLink && placeName) {
        document
          .querySelector(".places__list")
          .prepend(addCardItem({ name: placeName, link: placeLink }));
      }
      form.reset();
      document
        .querySelector(".popup_type_new-card")
        .classList.remove("popup_is-opened");
    },
    { once: true }
  );
}

export function cardModal(card) {
  const image = card.querySelector(".card__image");
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  document.querySelector(".popup__caption").textContent =
    card.querySelector(".card__title").textContent;
}

export const editProfileHandler = () => {
  const form = document.forms.edit_profile;
  form.elements.name.value =
    document.querySelector(".profile__title").textContent;
  form.elements.description.value = document.querySelector(
    ".profile__description"
  ).textContent;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector(".profile__title").textContent =
      form.elements.name.value;
    document.querySelector(".profile__description").textContent =
      form.elements.description.value;
    document
      .querySelector(".popup_type_edit")
      .classList.remove("popup_is-opened");
  });
};
