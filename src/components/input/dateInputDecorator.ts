import { Input } from "./input";

export class DateInputMonthDecorator {
  constructor(private component: Input) {
    component.span.textContent = `Введите месяц в формате "мм"`;
  }

  isValid() {
    this.component.addValid = function () {
      const text = this.input.value;
      if (text.length > 2) this.input.value = text.substring(0, 2);
      if (Number(text) > 0 && Number(text) < 13) return true;
      return false;
    };
  }

  render() {
    this.isValid();
    return this.component.render();
  }
}

export class DateInputYearDecorator {
  constructor(private component: Input) {
    component.span.textContent = `Мин. 2 цыфры`;
  }

  isValid() {
    this.component.addValid = function () {
      const text = this.input.value;
      if (text.length === 2) return true;
      return false;
    };
  }

  render() {
    this.isValid();
    return this.component.render();
  }
}
