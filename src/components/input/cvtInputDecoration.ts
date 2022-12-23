import { Input } from "./input";

export class CvtInputDecoration {
  constructor(private component: Input) {
    component.span.textContent = `Мин. ${this.component.minLength} цыфры`;
  }

  isValid() {
    this.component.addValid = function () {
      const number = this.input.value;
      if (number.length > 3) this.input.value = number.substring(0, 3);
      return true;
    };
  }

  render() {
    this.isValid();
    return this.component.render();
  }
}
