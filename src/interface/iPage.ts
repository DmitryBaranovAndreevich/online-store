export interface IPage {
  body: HTMLElement;
  append: (node: HTMLElement) => void;
  render: () => void;
}
