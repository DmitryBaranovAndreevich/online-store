export interface IComponent {
  readonly container: HTMLElement
  render: () => HTMLElement;
}