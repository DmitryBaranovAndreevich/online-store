import { Input } from "./input";

export class NumberCardInputDecorator {
  constructor(private component: Input, setIcon: (e: Event) => void) {
    component.span.textContent = `Кол-во цыфр должно быть ${component.minLength}`;
    this.component.input.addEventListener("input", setIcon);
  }

  get input() {
    return this.component;
  }

  isValid() {
    this.component.addValid = function () {
      const number = this.input.value;
      if (number.length > 16) this.input.value = number.substring(0, 16);
      return true;
    };
  }

  render() {
    this.isValid();
    return this.component.render();
  }
}
