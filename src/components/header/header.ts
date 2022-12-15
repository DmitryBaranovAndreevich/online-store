import { Logo } from "../logo/logo";
import { buttonInHeader } from "../buttonInHeader/buttonInHeader";
import logoimage from "../../images/logo.png";
import basketUrl from "../../images/basket.png";
import ordersUrl from "../../images/orders.png";
import "./header.css";

export class Header {
  private static instance: Header | null = null;
  private htmlPattern = document.createElement("header");
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
      const logo = new Logo(logoimage as string);
      const buttonBasket = new buttonInHeader(basketUrl as string, "Корзина", "").render();
      const buttonOrders = new buttonInHeader(ordersUrl as string, "Заказы", "").render();
      Header.instance = new Header(logo, buttonBasket, buttonOrders);
    }

    return Header.instance;
  }

  public render() {
    if (!this.isRender) {
      this.isRender = true;
      this.htmlPattern.className = "header";
      this.logo.render(this.htmlPattern);
      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "header__buttons-container";
      // const basket = document.createElement("div");
      // basket.className = "header__basket";
      this.addElements(buttonsContainer);
      // buttonsContainer.appendChild(basket);
      this.addElement(buttonsContainer);
      this.addElement(buttonsContainer);
    }
    return this.htmlPattern;
  }

  public addElement(element: HTMLElement) {
    this.htmlPattern.appendChild(element);
  }

  private addElements(container: HTMLElement) {
    if (this.elements) {
      this.elements.forEach((element) => container.appendChild(element));
    }
  }
}
