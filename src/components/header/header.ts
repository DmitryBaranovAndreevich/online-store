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
  // private basket = null;
  // private price = null;

  constructor(logo: Logo, ...elements: Array<HTMLElement>) {
    this.logo = logo;
    this.elements = elements;
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

  public render() {
    if (!this.isRender) {
      this.isRender = true;
      this.container.className = "header";
      this.logo.render(this.container);
      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "header__buttons-container";
      buttonsContainer.append(...this.elements);
      this.addElement(buttonsContainer, buttonsContainer);
    }
    return this.container;
  }

  public addElement(...element: HTMLElement[]) {
    this.container.append(...element);
  }
}
