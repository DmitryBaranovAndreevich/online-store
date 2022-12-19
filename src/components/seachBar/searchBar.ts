import "./searchBar.css";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";

export class SearchBar {
  private container;
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
    console.log(text);
  };

  public render() {
    this.container.append(this.input, this.button);
    this.container.addEventListener("submit", this.handelClick);
    return this.container;
  }
}
