import { createElement, generateHash } from "../../service";
import { Tags } from "../../interface/tags";
import "./checkBox.css";

export class Checkbox {
  text;
  container;
  checkbox;
  label;
  hash;
  constructor(text: string, className: string) {
    this.text = text;
    this.container = createElement(Tags.div, "checkBox");
    this.label = createElement(Tags.label, `${className}-trigger`) as HTMLLabelElement;
    this.checkbox = createElement(Tags.input, className) as HTMLInputElement;
    this.hash = generateHash(text);
  }

  private setAtribute() {
    this.checkbox.type = "checkbox";
    this.checkbox.name = this.text;
    this.checkbox.id = this.hash;
    this.label.htmlFor = this.hash;
    this.label.textContent = this.text;
    this.label.id = `label_${this.hash}`;
  }

  public render() {
    this.setAtribute();
    this.container.appendChild(this.checkbox);
    this.container.appendChild(this.label);
    return this.container;
  }
}
