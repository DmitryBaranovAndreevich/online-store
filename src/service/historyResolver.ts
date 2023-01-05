// import { Popup } from "../components/popup/popup";
import { Cart } from "../pages/cart";
import { GoodsCart } from "../pages/goods";
import { MainPage } from "../pages/home";

export const historyResolver = (title: string, location: string, params = "?") => {
  history.pushState({}, title, location + params);
  const body = document.querySelector("body") as HTMLBodyElement;
  console.log(location);
  switch (location) {
    case "/online-store/main":
      body.innerHTML = "";
      new MainPage().render();
      break;

    case "/online-store/goods":
      body.innerHTML = "";
      new GoodsCart().fill().goodListener();
      break;

    case "/online-store/cart":
      body.innerHTML = "";
      new Cart().construct();
      break;
  }
};
