import "./checkBoxInAccordion.css";
import { Checkbox } from "./checkBox";
import { UrlHandler } from "../../service/urlHandler";

export class CheckBoxInAccordion extends Checkbox {
  urlHandler;
  constructor(name: string, className = "accordion-item__input") {
    super(name, className);
    this.urlHandler = new UrlHandler();
  }

  // public addEventListener() {
  //   this.checkbox.addEventListener("change", this.handelClick);
  //   console.log(this.checkbox.checked);
  //   return this;
  // }

  // private handelClick = (e: Event) => {
  //   const checkbox = e.target as HTMLInputElement;
  //   const checked = checkbox.checked;
  //   if (checked) {
  //     this.urlHandler.insertParam(checkbox.id, String(checked));
  //   } else {
  //     this.urlHandler.deleteParams(checkbox.id);
  //   }
  // };
}
