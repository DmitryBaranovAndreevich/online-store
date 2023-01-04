import { Logo } from "../logo/logo";
import { buttonInHeader } from "../buttonInHeader/buttonInHeader";
import basketUrl from "../../images/basket.png";
import ordersUrl from "../../images/orders.png";
import "./header.css";

export class Header {
  private static instance: Header | null = null;
  private container = document.createElement("header");
  private isRender = false;
  private logo;
  private elements;
  public buttonsContainer: HTMLElement;
  // private basket = null;
  // private price = null;

  constructor(logo: Logo, ...elements: Array<HTMLElement>) {
    this.logo = logo;
    this.elements = elements;
    this.buttonsContainer = document.createElement("div");
  }

  static getInstance() {
    if (Header.instance === null) {
      const logo = new Logo();
      const buttonBasket = new buttonInHeader(basketUrl as string, "Корзина", "").render();
      const buttonOrders = new buttonInHeader(ordersUrl as string, "Заказы", "").render();
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
    const state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
    if (number) {
      number.textContent = String(Object.values(state).reduce((a, b) => a + b, 0));
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
