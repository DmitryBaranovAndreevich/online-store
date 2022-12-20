import "./searchBar.css";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import { IComponent } from "../../interface/component";
import { SortElements } from "../../service/sortElements";

export class SearchBar implements IComponent {
  container;
  private input;
  private button;
  constructor() {
    this.container = createElement(Tags.form, "search-bar");
    this.input = createElement(Tags.input, "search-bar__input") as HTMLInputElement;
    this.input.type = "text";
    this.button = createElement(Tags.button, "search-bar__button", "Поиск") as HTMLButtonElement;
    this.button.type = "submit";
  }

  private handelClick = (e: Event) => {
    e.preventDefault();
    const text = this.input.value;
    const sorter = SortElements.getInstance();
    if (text !== "") sorter.search(text);
    else sorter.sort();
  };

  private addListeners() {
    this.container.addEventListener("submit", (e) => e.preventDefault());
    this.input.addEventListener("input", this.handelClick);
  }

  public render() {
    this.container.append(this.input, this.button);
    this.addListeners();
    return this.container;
  }
}
