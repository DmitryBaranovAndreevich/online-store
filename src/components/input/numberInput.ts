import { Input } from "./input";

export class NumberInputDecorator {
  constructor(private component: Input) {
    component.span.textContent = `Номер должен начинаться с "+" и иметь не менее ${component.minLength}`;
  }

  isValid() {
    this.component.addValid = function () {
      const number = this.input.value;
      if (number[0] !== "+") return true;
      for (let i = 1; i < number.length; i++) {
        if (Number(i) < 0 || Number(i) > 9) return true;
      }
      return false;
    };
  }

  render() {
    this.isValid();
    return this.component.render();
  }
}
