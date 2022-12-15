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
    }
    return this.htmlPatern;
  }
}
