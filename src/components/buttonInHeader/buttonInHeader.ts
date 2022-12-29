import "./buttonInHeader.css";
import { createElement } from "../../service/createElement";

export class buttonInHeader {
  private htmlPatern;
  private imgUrl;
  private title;
  private isRender = false;

  constructor(img: string, title: string, className: string) {
    this.imgUrl = img;
    this.title = title;
    this.htmlPatern = createElement("div", className ? `${className} header__button` : "header__button");
  }

  public render() {
    if (!this.isRender) {
      const state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
      this.isRender = true;
      const myElement = this.htmlPatern;
      const icon = createElement("div", "header__button-icon");
      icon.style.setProperty("--url", `url("${this.imgUrl}")`);
      const number = createElement("p", "header__number", "0");
      icon.appendChild(number);
      const title = createElement("p", "header__button-title");
      title.textContent = this.title;
      myElement.appendChild(icon);
      myElement.appendChild(title);
      if (state && myElement.children[1].textContent === "Корзина") {
        number.textContent = String(Object.values(state).reduce((a, b) => a + b, 0));
      }
    }
    return this.htmlPatern;
  }
}
