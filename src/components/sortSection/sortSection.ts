import { Tags } from "../../interface/tags";
import { createElement, generateHash } from "../../service";
import { FilterObserver } from "../../service/filterObserver";
import { SortElements } from "../../service/sortElements";
import { Filter } from "../filters/filters";
// import { GoodList } from "../goodsList/goodsList";
import { SearchBar } from "../seachBar/searchBar";
import "./sortSection.css";

export class SortSection {
  private buttonsNames = ["По возрастанию цены", "По убыванию цены", "По возрастанию рейтинга", "По убыванию рейтинга"];
  private container;
  private filter;
  private label;

  private buttons: Array<HTMLButtonElement> = [];
  constructor(observer = FilterObserver.getInstance()) {
    this.container = createElement(Tags.div, "sort-section");
    this.filter = new Filter("Сортировка", "absolute");
    this.label = this.filter.title.title;
    observer.subscribe({ obj: this, visit: false, type: "sort" });
  }

  get title() {
    return this.label;
  }

  private handelClick = (e: Event) => {
    const element = e.target as HTMLButtonElement;
    if (element) {
      this.label.click();
      this.updateText(element.textContent as string);
      SortElements.getInstance().sort();
    }
  };

  public updateText(text: string) {
    switch (text) {
      case "По возрастанию цены":
        this.label.textContent = "По возрастанию цены";
        break;

      case "По убыванию цены":
        this.label.textContent = "По убыванию цены";
        break;

      case "По возрастанию рейтинга":
        this.label.textContent = "По возрастанию рейтинга";
        break;

      case "По убыванию рейтинга":
        this.label.textContent = "По убыванию рейтинга";
        break;

      case "Сортировка":
        break;
    }
  }

  public render() {
    const serchBar = new SearchBar();
    this.buttons = this.buttonsNames.map((name) => {
      const button = createElement(Tags.button, "home__sort-buttons", name) as HTMLButtonElement;
      button.type = "button";
      button.id = `sort-buttons__${generateHash(name)}`;
      button.addEventListener("click", this.handelClick);
      return button;
    });
    this.filter.addElement(...this.buttons);
    this.container.append(this.filter.render(), serchBar.render());
    return this.container;
  }
}
