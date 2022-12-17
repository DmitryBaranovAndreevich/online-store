import "./filters.css";
import { CheckBoxInAccordion } from "../checkBox/checkBoxInAccordion";
import { createElement } from "../../service";
import { Tags } from "../../interface/tags";
import { CheckBoxInFilter } from "../checkBox/checkBoxInFilter";

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

class Filter {
  private name;
  private container;
  private menu;
  constructor(name: string) {
    this.name = name;
    this.container = createElement(Tags.div, "accordion-item");
    this.menu = createElement(Tags.div, "menu-item");
  }

  private handeleClick() {
    this.container.addEventListener("click", openMenu);
  }

  private append() {
    const checkBox = new CheckBoxInAccordion(this.name).render();
    this.container.appendChild(checkBox);
    this.container.appendChild(this.menu);
  }
  public addElement(node: HTMLElement) {
    this.menu.appendChild(node);
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
    wrapper.appendChild(new HeaderInFilter().render());
    const filterArr = this.data.map(({ name, items }) => {
      const filter = new Filter(name);
      const checkBoxArr = Array.from(Object.keys(items)).map((key) => {
        return new CheckBoxInFilter(key, items[key]).render();
      });
      checkBoxArr.forEach((elem) => filter.addElement(elem));
      return filter.render();
    });
    filterArr.forEach((filter) => wrapper.appendChild(filter));
    container.appendChild(wrapper);
    this.container.appendChild(container);
  }

  public render() {
    this.append();
    return this.container;
  }
}
