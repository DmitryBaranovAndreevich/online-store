import "./goodsList.css";
import { IGood } from "../../interface/good";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import { CheckBoxInFilter } from "../checkBox/checkBoxInFilter";
import { SliderFilter } from "../sliderFilter/sliderFilter";
import { SortSection } from "../sortSection/sortSection";

export class Good {
  private params;
  private container;
  constructor(params: IGood) {
    this.params = params;
    this.container = createElement(Tags.div, "good-card");
  }

  private append() {
    const image = createElement(Tags.img, "good-card__image") as HTMLImageElement;
    image.src = this.params.thumbnail;
    image.alt = this.params.title;
    const price = createElement(Tags.p, "good-card__price", `от ${this.params.price} руб.`);
    const name = createElement(Tags.p, "good-card__title", this.params.title);
    const buyButton = createElement(Tags.button, "good-card__button", "Купить");
    const descriptionButton = createElement(Tags.button, "good-card__button", "Описание");
    this.container.append(image, price, name, buyButton, descriptionButton);
  }

  public render() {
    this.append();
    return this.container;
  }
}

export class GoodList {
  private static instance: GoodList | null = null;
  private state: Array<IGood> | [];
  private container;
  public subscribers: Array<{ obj: CheckBoxInFilter | SliderFilter | SortSection; visit: boolean; type: string }> = [];
  constructor() {
    this.container = createElement(Tags.div, "home__good-list");
    this.state = [];
  }

  get getState() {
    return this.state;
  }

  public updateState() {
    (this.subscribers.find(({ obj }) => obj instanceof CheckBoxInFilter)?.obj as CheckBoxInFilter)?.addClick();
  }

  public setSubscribers(subscriber: { obj: CheckBoxInFilter | SliderFilter | SortSection; visit: boolean; type: string }) {
    this.subscribers.push(subscriber);
  }

  static getInstance() {
    if (GoodList.instance === null) {
      GoodList.instance = new GoodList();
    }

    return GoodList.instance;
  }

  public setState(value: Array<IGood> | []) {
    this.clear();
    this.state = value;
    this.fill();
    this.subscribers.forEach(({ obj }) => {
      if (!(obj instanceof SortSection)) obj.updateText();
    });
  }

  private fill() {
    this.state.forEach((elem) => this.container.appendChild(new Good(elem).render()));
  }

  private clear() {
    this.container.innerHTML = "";
  }

  public render() {
    this.subscribers.forEach(({ obj }) => {
      if (obj instanceof CheckBoxInFilter) obj.addEventListener();
    });
    return this.container;
  }
}
