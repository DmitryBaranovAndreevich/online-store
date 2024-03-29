import "./searchBar.css";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import { IComponent } from "../../interface/component";
import { SortElements } from "../../service/sortElements";
import { FilterObserver } from "../../service/filterObserver";
import { UrlHandler } from "../../service/urlHandler";

export class SearchBar implements IComponent {
  container;
  private input;
  private button;
  private urlHandler = new UrlHandler();
  private paramName = "textInputElement";
  constructor() {
    this.container = createElement(Tags.form, "search-bar");
    this.input = createElement(Tags.input, "search-bar__input") as HTMLInputElement;
    this.input.type = "text";
    this.input.name = "searchText";
    this.button = createElement(Tags.button, "search-bar__button", "Поиск") as HTMLButtonElement;
    this.button.type = "submit";
    FilterObserver.getInstance().textInput = this.input;
  }

  private handelClick = (e: Event) => {
    e.preventDefault();
    const text = this.input.value;
    const sorter = SortElements.getInstance();
    if (text !== "") {
      sorter.search(text);
      this.urlHandler.insertParam(this.paramName, text);
    } else sorter.sort();
  };

  private addListeners() {
    this.container.addEventListener("submit", this.handelClick);
    this.input.addEventListener("input", this.handelClick);
  }

  public render() {
    const param = this.urlHandler.searchParams(this.paramName);
    this.container.append(this.input, this.button);
    this.addListeners();
    if (param) this.input.value = param;
    return this.container;
  }
}
