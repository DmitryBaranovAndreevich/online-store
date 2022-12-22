// import Router from "../service/router";
// import { MainPage } from "./home";
window.location.href = "main";
// Router.modules
//   .Home()
//   .then(() => console.log("Hу"))
//   .catch((e) => console.log(e));
// Router.modules;

// const historyResolver = (title: string, location: string, params = "?") => {
//   history.pushState({}, title, location + params);
//   switch (location) {
//     case "/":
//       new MainPage().render();
//   }
// };

// window.addEventListener("load", () => {
//   const location = window.location.pathname;
//   const params = window.location.search;
//   console.log(`${location}${params}`);
//   const head = document.querySelector("title") as HTMLHeadElement;

//   if (location) {
//     head.textContent = "Главная";
//     historyResolver("Главная", location, params);
//   }
// });
