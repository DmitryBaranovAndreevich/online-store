import { IComponent } from "../../interface/component";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import { CvtInputDecoration } from "../input/cvtInputDecoration";
import { DateInputMonthDecorator, DateInputYearDecorator } from "../input/dateInputDecorator";
import { Input } from "../input/input";
import { NumberCardInputDecorator } from "../input/numberCardInput";
import maestroIcon from "../../images/bank/maestro.png";
import visaIcon from "../../images/bank/visa.png";
import masterIcon from "../../images/bank/masterCard.png";
import paypal from "../../images/bank/paypal.png";
import union from "../../images/bank/unionpay.png";
import "./creditCardDetails.css";

export class CreditCardDetails implements IComponent {
  container;
  private name;
  private wrapper;
  private icon;
  private numberInput;
  private iconContainer;
  inputs;
  constructor(inputsContainer: Array<Input>) {
    this.container = createElement(Tags.div, "credit-card");
    this.name = createElement(Tags.p, "credit-card__title", "Введите данные банковской карты");
    this.wrapper = createElement(Tags.div, "credit-card__wrapper");
    this.icon = createElement(Tags.img, "credit-card__icon") as HTMLImageElement;
    this.numberInput = new NumberCardInputDecorator(new Input("Номер:", "number", 16, 1), this.setIcon);
    this.iconContainer = createElement(Tags.div, "credit-card__container");
    this.inputs = inputsContainer;
  }

  private updateImage(url: string) {
    this.iconContainer.firstChild?.remove();
    const img = createElement(Tags.img, "credit-card__icon") as HTMLImageElement;
    img.src = url;
    this.iconContainer.prepend(img);
  }

  private setIcon = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length < 2) {
      switch (value[0]) {
        case "1":
          this.updateImage(union as string);
          break;
        case "2":
          this.updateImage(paypal as string);
          break;
        case "3":
          this.updateImage(maestroIcon as string);
          break;
        case "4":
          this.updateImage(visaIcon as string);
          break;
        case "5":
          this.updateImage(masterIcon as string);
          break;
      }
    }
  };

  private addInput() {
    const container2 = createElement(Tags.div, "credit-card__container2");
    const dateInput = new DateInputMonthDecorator(new Input("Окончание действия:", "text", 2, 1));
    const dateInput2 = new DateInputYearDecorator(new Input("/", "text", 2, 1));
    const cvtInput = new CvtInputDecoration(new Input("CVT:", "number", 3, 1));
    this.inputs.push(dateInput.input);
    this.inputs.push(dateInput2.input);
    this.inputs.push(cvtInput.input);
    this.inputs.push(this.numberInput.input);
    container2.append(dateInput.render(), dateInput2.render());
    this.iconContainer.append(this.icon, this.numberInput.render());
    this.wrapper.append(this.iconContainer, container2, cvtInput.render());
  }

  public render() {
    this.addInput();
    this.container.append(this.name, this.wrapper);
    return this.container;
  }
}
