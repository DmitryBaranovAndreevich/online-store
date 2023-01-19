import { IComponent } from "../../interface/component";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import "./popup.css";

export class Popup implements IComponent {
  container;
  title;
  closeButton;
  constructor(name: string) {
    this.container = createElement(Tags.form, "popup") as HTMLFormElement;
    this.container.noValidate = true;
    this.container.onsubmit = (e) => e.preventDefault();
    this.closeButton = createElement(Tags.button, "popup__close-button");
    this.title = createElement(Tags.p, "popup__title", name);
  }

  public append(...node: Array<HTMLElement>) {
    this.container.prepend(...node);
  }

  render() {
    this.container.append(this.closeButton, this.title);
    return this.container;
  }
}
