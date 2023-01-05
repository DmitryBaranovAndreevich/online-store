import { historyResolver } from "../service/historyResolver";
// import Router from "../service/router";
console.log("start");
// localStorage.removeItem("item");
// console.log(localStorage.getItem("item"));
// window.location.href = "./online-store/main";
//не забудь закоментировать перд деплоем вызовы рендера страниц на каждой странице
window.addEventListener("load", () => {
  const location = window.location.pathname;
  const params = window.location.search;
  console.log(`${location}${params}`);
  const head = document.querySelector("title") as HTMLHeadElement;

  if (location) {
    head.textContent = "Главная";
    historyResolver("Главная", location, params);
  }
});
