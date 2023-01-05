import { historyResolver } from "../service/historyResolver";

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
