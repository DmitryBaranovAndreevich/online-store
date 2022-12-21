import "./checkBoxInAccordion.css";
import { Checkbox } from "./checkBox";
import { UrlHandler } from "../../service/urlHandler";

export class CheckBoxInAccordion extends Checkbox {
  urlHandler;
  constructor(name: string, className = "accordion-item__input") {
    super(name, className);
    this.urlHandler = new UrlHandler();
  }
}
