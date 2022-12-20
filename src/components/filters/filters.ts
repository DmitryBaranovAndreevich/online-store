import "./filters.css";
import { CheckBoxInAccordion } from "../checkBox/checkBoxInAccordion";
import { createElement } from "../../service";
import { Tags } from "../../interface/tags";
import { SortElements } from "../../service/sortElements";
import { CheckBoxInFilter } from "../checkBox/checkBoxInFilter";
import { SliderFilter } from "../sliderFilter/sliderFilter";
import { UrlHandler } from "../../service/urlHandler";

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
  private urlHandler;
  constructor(name: string, urlHandler: UrlHandler, position = "static") {
    this.name = name;
    this.container = createElement(Tags.div, "accordion-item");
    this.menu = createElement(Tags.div, `menu-item menu-item_position_${position}`);
    this.checkBox = new CheckBoxInAccordion(this.name);
    this.urlHandler = urlHandler;
    SortElements.getInstance().addType(name);
  }

  private handeleClick() {
    this.checkBox.label.addEventListener("click", this.openMenu);
  }

  private openMenu = (e: Event) => {
    e.preventDefault();
    const elem = e.target as HTMLInputElement;
    const param = this.urlHandler.searchParams(this.checkBox.label.id);
    if (param) this.urlHandler.deleteParams(this.checkBox.label.id);
    else this.urlHandler.insertParam(this.checkBox.label.id, "checked");

    if (elem.classList.contains("accordion-item__input-trigger")) {
      const parent = elem.closest(".accordion-item");
      const menu = parent?.querySelector(".menu-item");
      menu?.classList.toggle("menu-item_active");
    }
  };

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

  private checkActive() {
    const param = this.urlHandler.searchParams(this.checkBox.label.id);
    if (param) this.checkBox.label.click();
  }

  public render() {
    this.append();
    this.handeleClick();
    this.checkActive();
    return this.container;
  }
}

export class Filters {
  private container;
  private data;
  private urlHandler;

  constructor(data: Array<{ name: string; items: { [key: string]: number } }>) {
    this.container = createElement(Tags.div, "accordion");
    this.data = data;
    this.urlHandler = new UrlHandler();
  }

  private append() {
    const container = createElement(Tags.div, "accordion__container");
    const wrapper = createElement(Tags.div, "accordion__wrapper");
    const priceSlider = new SliderFilter("Цена", "price", "0", "1500", this.urlHandler).render();
    const scoreSlider = new SliderFilter("На складе", "stock", "0", "500", this.urlHandler).render();
    wrapper.appendChild(new HeaderInFilter().render());

    const filterArr = this.data.map(({ name, items }) => {
      const filter = new Filter(name, this.urlHandler);
      const checkBoxArr = Array.from(Object.keys(items)).map((key) => {
        return new CheckBoxInFilter(key, items[key], this.urlHandler, name).addEventListener().render();
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
