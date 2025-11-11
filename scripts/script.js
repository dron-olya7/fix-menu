
document.addEventListener("DOMContentLoaded", function () {
  const offerButton = document.getElementById("offerButton");
  const modalOffer = document.getElementById("get-fixed-offer");
  const modalClose = document.getElementById("modalClose");

  offerButton.addEventListener("click", function () {
    modalOffer.style.display = "block"; // показать окно
  });

  modalClose.addEventListener("click", function () {
    modalOffer.style.display = "none"; // закрыть по крестику
  });

  // закрытие при клике вне окна
  modalOffer.addEventListener("click", function (e) {
    if (e.target === modalOffer) {
      modalOffer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const menuPanel = document.getElementById("menuPanel");
  const menuClose = document.getElementById("menuClose");

  menuClose.addEventListener("click", function () {
    menuPanel.style.display = "none";  // ← исчезает всё: и меню, и кнопка
  });
});
