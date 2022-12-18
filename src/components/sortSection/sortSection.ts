import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import { Filter } from "../filters/filters";
import { GoodList } from "../goodsList/goodsList";
import "./sortSection.css";

export class SortSection {
  private buttonsNames = ["По возрастанию цены", "По убыванию цены", "По возрастанию рейтинга", "По убыванию рейтинга"];
  private goodsList;
  private container;
  private filter;
  private label;
  private buttons: Array<HTMLButtonElement> = [];
  constructor(goodsList = GoodList.getInstance()) {
    this.container = createElement(Tags.div, "home__sort-section");
    this.filter = new Filter("Сортировка", "absolute");
    this.goodsList = goodsList;
    this.label = this.filter.title.title;
    goodsList.setSubscribers({ obj: this, visit: false, type: "sort" });
  }

  get title() {
    return this.label;
  }

  private addListener() {
    this.filter.root.addEventListener("click", this.handelClick);
  }

  private handelClick = (e: Event) => {
    const element = e.target as HTMLButtonElement;
    if (element) {
      this.updateText(element.textContent as string);
    }
  };

  public updateText(text: string) {
    switch (text) {
      case "По возрастанию цены":
        this.sort("price", "down");
        this.label.textContent = "По возрастанию цены";
        break;

      case "По убыванию цены":
        this.sort("price", "up");
        this.label.textContent = "По убыванию цены";
        break;

      case "По возрастанию рейтинга":
        this.sort("rating", "down");
        this.label.textContent = "По возрастанию рейтинга";
        break;

      case "По убыванию рейтинга":
        this.sort("rating", "up");
        this.label.textContent = "По убыванию рейтинга";
        break;

      case "Сортировка":
        break;
    }
  }

  private sort(type: "price" | "rating", direction: "up" | "down") {
    const goods = this.goodsList.getState;
    const sortArr = goods.sort((a, b) => a[type] - b[type]);
    if (direction === "up") this.goodsList.setState(sortArr.reverse());
    this.goodsList.setState(sortArr);
  }

  public render() {
    this.buttons = this.buttonsNames.map((name) => {
      const button = createElement(Tags.button, "home__sort-buttons", name) as HTMLButtonElement;
      button.type = "button";
      return button;
    });
    this.filter.addElement(...this.buttons);
    this.container.appendChild(this.filter.render());
    this.addListener();
    return this.container;
  }
}
