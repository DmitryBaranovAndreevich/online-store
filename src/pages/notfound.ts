import "./notfound.css";
import "./home.css";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
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
    const main: HTMLElement = createElement(Tags.div, "error__main");
    this.append(main);
    const errorBlock: HTMLElement = createElement(Tags.div, "error__block");
    errorBlock.innerText = "PAGE NOT FOUND (404)";
    main.append(errorBlock);
    this.append(Footer.getInstanceFooter().footerRender());
  }
}

//const rrr = new NotFound();
//rrr.errorState();
