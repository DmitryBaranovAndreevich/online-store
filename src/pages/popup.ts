import "./popup.css";
import { IPage } from "../interface/iPage";
import { createElement } from "../service";
import { Tags } from "../interface/tags";
import { Popup } from "../components/popup/popup";
import { Input } from "../components/input/input";
import { NumberInputDecorator } from "../components/input/numberInput";

export class PopupPage implements IPage {
  body;
  private container;

  constructor() {
    this.body = document.querySelector("body") as HTMLBodyElement;
    this.container = createElement(Tags.form, "popup-background");
  }

  append(...node: Array<HTMLElement>) {
    this.container.append(...node);
  }

  render() {
    const popup = new Popup("Оформите заказ");
    const inputName = new Input("Ваше имя", "text", 3, 2);
    const inputPhoneNumber = new NumberInputDecorator(new Input("Номер телефона", "text", 9, 1));
    popup.append(inputPhoneNumber.render(), inputName.render());
    this.container.append(popup.render());
    this.body?.appendChild(this.container);
  }
}

const popup = new PopupPage();
popup.render();
