import "./filters.css";
import { CheckBoxInAccordion } from "../checkBox/checkBoxInAccordion";
import { createElement } from "../../service";
import { Tags } from "../../interface/tags";
import { CheckBoxInFilter } from "../checkBox/checkBoxInFilter";
import { SliderFilter } from "../sliderFilter/sliderFilter";

function openMenu(e: Event) {
  const elem = e.target as HTMLInputElement;
  if (elem.classList.contains("accordion-item__input-trigger")) {
    const parent = elem.closest(".accordion-item");
    const menu = parent?.querySelector(".menu-item");
    menu?.classList.toggle("menu-item_active");
  }
}

class HeaderInFilter {
  private container;

  constructor() {
    this.container = createElement(Tags.div, "accordion-item__title-container");
  }

  append() {
    const title = createElement(Tags.p, "accordion-item__title", "Фильтры");
    const resetButton = createElement(Tags.button, "accordion-item__button", "Очистить") as HTMLButtonElement;
    resetButton.type = "reset";
    resetButton.ariaLabel = "Очистить";
    this.container.appendChild(title);
    this.container.appendChild(resetButton);
  }

  public render() {
    this.append();
    return this.container;
  }
}

export class Filter {
  private name;
  private container;
  private menu;
  private checkBox;
  constructor(name: string, position = "static") {
    this.name = name;
    this.container = createElement(Tags.div, "accordion-item");
    this.menu = createElement(Tags.div, `menu-item menu-item_position_${position}`);
    this.checkBox = new CheckBoxInAccordion(this.name);
  }

  private handeleClick() {
    this.container.addEventListener("click", openMenu);
  }

  get root() {
    return this.container as HTMLDivElement;
  }

  get title() {
    return this.checkBox;
  }

  private append() {
    const checkBox = this.checkBox.render();
    this.container.appendChild(checkBox);
    this.container.appendChild(this.menu);
  }
  public addElement(...node: Array<HTMLElement>) {
    this.menu.append(...node);
    return this;
  }

  public render() {
    this.append();
    this.handeleClick();
    return this.container;
  }
}

export class Filters {
  private container;
  private data;

  constructor(data: Array<{ name: string; items: { [key: string]: number } }>) {
    this.container = createElement(Tags.div, "accordion");
    this.data = data;
  }

  private append() {
    const container = createElement(Tags.div, "accordion__container");
    const wrapper = createElement(Tags.div, "accordion__wrapper");
    const priceSlider = new SliderFilter("Цена", "price", "0", "1500").render();
    const scoreSlider = new SliderFilter("На складе", "stock", "0", "500").render();
    wrapper.appendChild(new HeaderInFilter().render());
    const filterArr = this.data.map(({ name, items }) => {
      const filter = new Filter(name);
      const checkBoxArr = Array.from(Object.keys(items)).map((key) => {
        return new CheckBoxInFilter(key, items[key], name).render();
      });
      checkBoxArr.forEach((elem) => filter.addElement(elem));
      return filter.render();
    });
    filterArr.forEach((filter) => wrapper.appendChild(filter));
    container.appendChild(wrapper);
    this.container.append(container, priceSlider, scoreSlider);
  }

  public render() {
    this.append();
    return this.container;
  }
}
