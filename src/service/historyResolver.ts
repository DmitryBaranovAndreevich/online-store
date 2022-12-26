// import { Popup } from "../components/popup/popup";
import { Cart } from "../pages/cart";
import { GoodsCart } from "../pages/goods";
import { MainPage } from "../pages/home";

export const historyResolver = (title: string, location: string, params = "?") => {
  history.pushState({}, title, location + params);
  console.log(location);
  switch (location) {
    case "/online-store/main":
      new MainPage().render();
      break;

    case "/online-store/goods":
      new GoodsCart().fill();
      break;

    case "/online-store/cart":
      new Cart().construct();
      break;
  }
};
