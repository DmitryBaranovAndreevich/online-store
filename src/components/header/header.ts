import { Logo } from "../logo/logo";
import { buttonInHeader } from "../buttonInHeader/buttonInHeader";
import basketUrl from "../../images/basket.png";
import ordersUrl from "../../images/orders.png";
import "./header.css";
import { IGood } from "../../interface/good";
import { CartObserver } from "../../service/cartObserver";
import { goods } from "../../service";
import { Tags } from "../../interface/tags";

export class Header {
  private static instance: Header | null = null;
  private container = document.createElement("header");
  private isRender = false;
  private logo;
  private elements;
  public buttonsContainer: HTMLElement;
  private cartItems: Array<IGood> | [];
  private observer: CartObserver;
  // private basket = null;
  // private price = null;

  constructor(logo: Logo, ...elements: Array<HTMLElement>) {
    this.logo = logo;
    this.elements = elements;
    this.buttonsContainer = document.createElement(Tags.div);
    this.observer = new CartObserver();
    this.cartItems = this.observer.state
      ? Array.from(Object.keys(this.observer.state)).map((id) => {
          const good = goods.products.find((good) => good.id === Number(id)) as IGood;
          return { ...good, volume: this.observer.state[id] };
        })
      : [];
  }

  static getInstance() {
    if (Header.instance === null) {
      const logo = new Logo();
      const buttonBasket = new buttonInHeader(basketUrl as string, "Корзина", "").render();
      const buttonOrders = new buttonInHeader(ordersUrl as string, "Сумма", "").render();
      Header.instance = new Header(logo, buttonBasket, buttonOrders);
    }

    return Header.instance;
  }

  public clearUpdateIcon() {
    this.buttonsContainer.innerHTML = "";
    this.buttonsContainer.className = "header__buttons-container";
    this.buttonsContainer.append(...this.elements);
    this.addElement(this.buttonsContainer, this.buttonsContainer);
    const number = document.querySelector(".header__number");
    const sum = document.querySelectorAll(".header__number")[1];
    const state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
    if (number && this.buttonsContainer.firstChild?.lastChild?.textContent === "Корзина") {
      number.textContent = String(Object.values(state).reduce((a, b) => a + b, 0));
      localStorage.setItem("item", JSON.stringify(state));
    }
    if (sum && this.buttonsContainer.lastChild?.lastChild?.textContent === "Сумма") {
      this.cartItems = state
        ? Array.from(Object.keys(state)).map((id) => {
            const good = goods.products.find((good) => good.id === Number(id)) as IGood;
            return { ...good, volume: state[id] };
          })
        : [];
      const priceData = this.cartItems;
      const price = priceData.reduce((priv, { price, volume }) => priv + price * (volume as number), 0);
      console.log(price);
      sum.textContent = String(price);
    }
  }

  public render() {
    if (!this.isRender) {
      this.isRender = true;
      this.container.className = "header";
      this.logo.render(this.container);
      this.buttonsContainer.className = "header__buttons-container";
      this.buttonsContainer.append(...this.elements);
      this.addElement(this.buttonsContainer, this.buttonsContainer);
    }
    return this.container;
  }

  public addElement(...element: HTMLElement[]) {
    this.container.append(...element);
  }
}
