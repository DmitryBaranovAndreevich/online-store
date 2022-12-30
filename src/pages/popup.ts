import "./popup.css";
import { IPage } from "../interface/iPage";
import { createElement } from "../service";
import { Tags } from "../interface/tags";
import { Popup } from "../components/popup/popup";
import { Input } from "../components/input/input";
import { NumberInputDecorator } from "../components/input/numberInput";
import { EmailInputDecorator } from "../components/input/emailInput";
import { CreditCardDetails } from "../components/creditCardDetails/creditCardDetails";

export class PopupPage implements IPage {
  body;
  container;

  constructor() {
    this.body = document.querySelector("body") as HTMLBodyElement;
    this.container = createElement(Tags.div, "popup-background");
  }

  append(...node: Array<HTMLElement>) {
    this.container.append(...node);
  }

  render() {
    const popup = new Popup("Оформите заказ");
    popup.closeButton.addEventListener("click", () => {
      this.container.classList.remove("popup-background_active");
    });
    const inputName = new Input("Ваше имя", "text", 3, 2);
    const inputPhoneNumber = new NumberInputDecorator(new Input("Номер телефона", "text", 9, 1));
    const inputAdress = new Input("Адрес доставки", "text", 5, 3);
    const emailInput = new EmailInputDecorator(new Input("E-mail", "text", 5, 1));
    const creditCard = new CreditCardDetails();
    const sendButton = createElement(Tags.button, "popup__button", "Оплатить");
    popup.append(sendButton, creditCard.render(), emailInput.render(), inputAdress.render(), inputPhoneNumber.render(), inputName.render());
    this.container.append(popup.render());
    this.body?.appendChild(this.container);
  }
}
