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
  message;
  sendButton;
  inputs: Array<Input> = [];
  openButton;

  constructor(openButton: HTMLButtonElement, open = false) {
    this.body = document.querySelector("body") as HTMLBodyElement;
    this.container = createElement(Tags.div, "popup-background");
    this.sendButton = createElement(Tags.button, "popup__button", "Оплатить");
    this.message = createElement(Tags.p, "popup__message", "Ваш заказ оплачен!");
    this.openButton = openButton;
    if (open) this.container.classList.add("popup-background_active");
  }

  append(...node: Array<HTMLElement>) {
    this.container.append(...node);
  }

  private handelClick = (e: Event) => {
    e.preventDefault();
    this.inputs.forEach((input) => {
      input.isValid();
    });
    const valid = !this.inputs.some((input) => input.valid === false);
    if (valid) {
      this.openButton.disabled = true;
      this.container.classList.remove("popup-background_active");
      this.message.classList.add("popup__message_visible");
      localStorage.removeItem("item");
      setTimeout(() => (window.location.href = "/online-store/main"), 3000);
    }
  };

  private click() {
    this.sendButton.addEventListener("click", this.handelClick);
  }

  render() {
    const popup = new Popup("Оформите заказ");
    popup.closeButton.addEventListener("click", () => {
      this.container.classList.remove("popup-background_active");
    });
    const inputName = new Input("Ваше имя", "text", 3, 2);
    this.inputs.push(inputName);
    const inputPhoneNumber = new NumberInputDecorator(new Input("Номер телефона", "text", 9, 1));
    this.inputs.push(inputPhoneNumber.input);
    const inputAdress = new Input("Адрес доставки", "text", 5, 3);
    this.inputs.push(inputAdress);
    const emailInput = new EmailInputDecorator(new Input("E-mail", "text", 5, 1));
    this.inputs.push(emailInput.input);
    const creditCard = new CreditCardDetails(this.inputs);
    this.click();
    popup.append(
      this.sendButton,
      creditCard.render(),
      emailInput.render(),
      inputAdress.render(),
      inputPhoneNumber.render(),
      inputName.render()
    );
    this.container.append(popup.render());
    this.body?.append(this.container, this.message);
  }
}
