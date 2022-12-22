import { IInput } from "../../interface/input";
import { Tags } from "../../interface/tags";
import { createElement, generateHash } from "../../service";
import "./input.css";

export class Input implements IInput {
  container;
  label;
  input;
  type;
  name;
  span;
  minWords;
  minLength;
  constructor(name: string, type: string, minLength = 3, minWords = 1) {
    this.container = createElement(Tags.div, "form-element") as HTMLDivElement;
    this.label = createElement(Tags.label, "form-element__label", name) as HTMLLabelElement;
    this.input = createElement(Tags.input, "form-element__input") as HTMLInputElement;
    this.span = createElement(Tags.span, "form-element__span") as HTMLSpanElement;
    this.type = type;
    this.name = name;
    this.minWords = minWords;
    this.minLength = minLength;
    this.span.textContent = `Минимальное число слов: ${this.minWords}, минимальное кол-во букв в каждом слове: ${this.minLength}`;
  }

  private setAtribute() {
    this.input.type = this.type;
    this.input.id = `input__${generateHash(this.name)}`;
    this.input.required = true;
    this.label.htmlFor = `input__${generateHash(this.name)}`;
    this.label.id = `label__${generateHash(this.name)}`;
    this.container.append(this.label, this.input, this.span);
  }

  private showInputError() {
    this.input.classList.add("form-element__input_type_error");
    this.span.classList.add("form-element__span_visible");
  }

  private hideInputError = () => {
    this.input.classList.remove("form-element__input_type_error");
    this.span.classList.remove("form-element__span_visible");
  };

  private wordLengthValid(word: string) {
    return word.split(" ").some((el) => el.length < this.minLength);
  }

  private wordsCountValid(word: string) {
    return word.split(" ").length < this.minWords;
  }

  private validateName() {
    const name = this.input.value;
    if (this.wordsCountValid(name) || this.wordLengthValid(name)) return false;
    return true;
  }

  public addValid() {
    return false;
  }

  isValid = () => {
    if (!this.addValid() && !this.validateName()) {
      this.showInputError();
    } else {
      this.hideInputError();
    }
  };

  private addListeners() {
    this.input.addEventListener("input", this.isValid);
  }

  render() {
    this.setAtribute();
    this.addListeners();
    return this.container;
  }
}
