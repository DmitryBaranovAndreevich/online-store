import "./notfound.css";
import "./home.css";
import { Header } from "../components/header/header";
import { createElement } from "../service";
import { Tags } from "../interface/tags";

export class NotFound {
  body;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
  }
  append(node: HTMLElement) {
    this.body.appendChild(node);
  }

  public errorState() {
    this.append(Header.getInstance().render());
    const main: HTMLElement = createElement(Tags.div, "main");
    this.append(main);
    const errorBlock: HTMLElement = createElement(Tags.div, "error__block");
    errorBlock.innerText = "PAGE NOT FOUND (404)";
    main.append(errorBlock);
  }
}

// const notfound = new NotFound();
// notfound.errorState();
