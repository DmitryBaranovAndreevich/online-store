import "./buttonInHeader.css";
import { createElement } from "../../service/createElement";
import { IGood } from "../../interface/good";
import { CartObserver } from "../../service/cartObserver";
import { goods } from "../../service";
import { Tags } from "../../interface/tags";

export class buttonInHeader {
  private htmlPatern;
  private imgUrl;
  private title;
  private isRender = false;
  private cartItems: Array<IGood> | [];
  private observer: CartObserver;

  constructor(img: string, title: string, className: string) {
    this.imgUrl = img;
    this.title = title;
    this.htmlPatern = createElement(Tags.div, className ? `${className} header__button` : "header__button");
    this.observer = new CartObserver();
    this.cartItems = this.observer.state
      ? Array.from(Object.keys(this.observer.state)).map((id) => {
          const good = goods.products.find((good) => good.id === Number(id)) as IGood;
          return { ...good, volume: this.observer.state[id] };
        })
      : [];
  }

  private clickToButton() {
    this.htmlPatern.addEventListener("click", () => {
      window.location.href = "/online-store/cart";
    });
  }

  public render(data = this.cartItems) {
    if (!this.isRender) {
      const state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
      this.isRender = true;
      const myElement = this.htmlPatern;
      const icon = createElement(Tags.div, "header__button-icon");
      icon.style.setProperty("--url", `url("${this.imgUrl}")`);
      const number = createElement(Tags.p, "header__number", "0");
      icon.appendChild(number);
      const title = createElement(Tags.p, "header__button-title");
      title.textContent = this.title;
      myElement.appendChild(icon);
      myElement.appendChild(title);
      if (state && myElement.children[1].textContent === "Корзина") {
        number.textContent = String(Object.values(state).reduce((a, b) => a + b, 0));
      }
      if (state && myElement.children[1].textContent === "Сумма") {
        const price = (data as Array<IGood>).reduce((priv, { price, volume }) => priv + price * (volume as number), 0);
        number.textContent = String(price);
      }
      this.clickToButton();
    }
    return this.htmlPatern;
  }
}
