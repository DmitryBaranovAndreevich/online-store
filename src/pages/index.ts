import { historyResolver } from "../service/historyResolver";

const myGrade = `Главная страница: 120
                 Корзина: 50(отсутствует промокод)
                 Модальное окно: 50
                 Страница с описанием товара: 40
                 Хедер: 20
                 Страница 404: 10
                 Итого: 290`;

console.log(myGrade);

window.addEventListener("load", () => {
  const location = window.location.pathname;
  const params = window.location.search;
  const head = document.querySelector("title") as HTMLHeadElement;

  if (location) {
    head.textContent = "Главная";
    historyResolver("Главная", location, params);
  }
});
