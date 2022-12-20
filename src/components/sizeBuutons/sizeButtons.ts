import "./sizeButtons.css";
import { IComponent } from "../../interface/component";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import { FilterObserver } from "../../service/filterObserver";

export class SizeButtons implements IComponent {
  container;
  private buttonSmallIcons;
  private buttonBigIcons;

  constructor() {
    this.container = createElement(Tags.div, "size-bar");
    this.buttonBigIcons = createElement(Tags.button, "size-bar__button size-bar__button_big");
    this.buttonSmallIcons = createElement(Tags.button, "size-bar__button size-bar__button_small");
  }

  private addListeners() {
    this.container.addEventListener("click", this.changeIconsSize);
  }

  public changeIconsSize = (e: Event) => {
    const element = e.target as HTMLButtonElement;
    const observer = FilterObserver.getInstance();
    if (element.classList.contains("size-bar__button_big")) observer.setIconsSize("big");
    if (element.classList.contains("size-bar__button_small")) observer.setIconsSize("small");
  };

  public render() {
    this.addListeners();
    this.container.append(this.buttonBigIcons, this.buttonSmallIcons);
    return this.container;
  }
}
