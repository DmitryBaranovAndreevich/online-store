import "./checkBoxInFilter.css";
import { Checkbox } from "./checkBox";

export class CheckBoxInFilter extends Checkbox {
  constructor(text: string) {
    super(text, "checkBox__input");
  }
}
