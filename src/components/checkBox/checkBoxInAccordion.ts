import "./checkBoxInAccordion.css";
import { Checkbox } from "./checkBox";

export class CheckBoxInAccordion extends Checkbox {
  constructor(name: string, className = "accordion-item__input") {
    super(name, className);
  }
}
