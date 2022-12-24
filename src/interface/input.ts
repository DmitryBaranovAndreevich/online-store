export interface IInput {
  container: HTMLDivElement,
  label:HTMLLabelElement,
  input:HTMLInputElement,
  type: string,
  name: string,
  span: HTMLSpanElement,
  minWords: number,
  minLength: number,
  readonly isValid: () => void,
  addValid: () => boolean,
  render: () => HTMLElement
}