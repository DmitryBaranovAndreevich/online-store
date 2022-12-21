import "./filters.css";
import { CheckBoxInAccordion } from "../checkBox/checkBoxInAccordion";
import { createElement } from "../../service";
import { Tags } from "../../interface/tags";
import { SortElements } from "../../service/sortElements";
import { CheckBoxInFilter } from "../checkBox/checkBoxInFilter";
import { SliderFilter } from "../sliderFilter/sliderFilter";
import { UrlHandler } from "../../service/urlHandler";
import { IComponent } from "../../interface/component";
import { FilterObserver } from "../../service/filterObserver";
import { SortSection } from "../sortSection/sortSection";

class HeaderInFilter implements IComponent {
  container;
  private resetButton;
  private urlHandler;

  constructor() {
    this.container = createElement(Tags.div, "accordion-item__title-container");
    this.resetButton = createElement(Tags.button, "accordion-item__button", "Очистить") as HTMLButtonElement;
    this.urlHandler = new UrlHandler();
  }

  append() {
    const title = createElement(Tags.p, "accordion-item__title", "Фильтры");
    this.resetButton.type = "reset";
    this.resetButton.ariaLabel = "Очистить";
    this.container.appendChild(title);
    this.container.appendChild(this.resetButton);
  }

  private addLlistener() {
    this.resetButton.addEventListener("click", this.reset);
  }

  private reset = () => {
    const allElements = FilterObserver.getInstance().getSubscribers;
    allElements.forEach(({ obj }) => {
      if (obj instanceof CheckBoxInFilter) {
        if (obj.checkbox.checked) {
          obj.checkbox.checked = false;
        }
      }
      if (obj instanceof SliderFilter) {
        obj.rightInput.value = obj.max;
        obj.leftInput.value = obj.min;
      }
      if (obj instanceof SortSection) {
        obj.label.textContent = "Сортировка";
      }
    });
    (document.querySelector(`[name="searchText"]`) as HTMLInputElement).value = "";
    window.history.pushState({ path: "?" }, "", "?");
    SortElements.getInstance().sort();
  };

  public render() {
    this.append();
    this.addLlistener();
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
    this.checkBox.checkbox.checked = !this.checkBox.checkbox.checked;
    const elem = e.target as HTMLInputElement;
    const param = this.urlHandler.searchParams(this.checkBox.checkbox.id);
    if (param) this.urlHandler.deleteParams(this.checkBox.checkbox.id);
    else this.urlHandler.insertParam(this.checkBox.checkbox.id, "checked");

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
    const param = this.urlHandler.searchParams(this.checkBox.checkbox.id);
    if (param) this.checkBox.label.closest(".accordion-item")?.querySelector(".menu-item")?.classList.add("menu-item_active");
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
