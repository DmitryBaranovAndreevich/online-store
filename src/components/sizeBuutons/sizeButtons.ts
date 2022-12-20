import "./sizeButtons.css";
import { IComponent } from "../../interface/component";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";

export class SizeButtons implements IComponent {
  container;
  buttonSmallIcons;
  buttonBigIcons;

  constructor() {
    this.container = createElement(Tags.div, "size-bar");
    this.buttonBigIcons = createElement(Tags.button, "size-bar__button size-bar__button_big");
    this.buttonSmallIcons = createElement(Tags.button, "size-bar__button size-bar__button_small");
  }

  render() {
    this.container.append(this.buttonBigIcons, this.buttonSmallIcons);
    return this.container;
  }
}
