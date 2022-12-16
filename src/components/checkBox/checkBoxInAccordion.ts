import "./checkBoxInAccordion.css";
import { Checkbox } from "./checkBox";

export class CheckBoxInAccordion extends Checkbox {
  constructor(name: string) {
    super(name, "accordion-item__input");
  }
}
