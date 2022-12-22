import { Input } from "./input";

export class EmailInputDecorator {
  constructor(private component: Input) {
    component.span.textContent = `Введите email, кол-во символов не менее ${component.minLength}`;
  }

  isValid() {
    this.component.addValid = function () {
      const email = this.input.value;
      return !!email.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
  }

  render() {
    this.isValid();
    return this.component.render();
  }
}
