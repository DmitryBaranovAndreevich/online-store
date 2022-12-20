import "./goodsList.css";
import { IGood } from "../../interface/good";
import { Tags } from "../../interface/tags";
import { createElement, goods } from "../../service";
import { CheckBoxInFilter } from "../checkBox/checkBoxInFilter";
import { SliderFilter } from "../sliderFilter/sliderFilter";
import { SortSection } from "../sortSection/sortSection";
// import { SortElements } from "../../service/sortElements";
// import { FilterObserver } from "../../service/filtrObserver";

export class Good {
  private params;
  private container;
  private size;
  constructor(params: IGood, size: string) {
    this.params = params;
    this.container = createElement(Tags.div, `good-card_${size}`);
    this.size = size;
  }

  private append() {
    const image = createElement(Tags.img, `good-card__image_${this.size}`) as HTMLImageElement;
    image.src = this.params.thumbnail;
    image.alt = this.params.title;
    const price = createElement(Tags.p, `good-card__price_${this.size}`, `от ${this.params.price} руб.`);
    const name = createElement(Tags.p, `good-card__title_${this.size}`, this.params.title);
    const buyButton = createElement(Tags.button, `good-card__button`, "Купить");
    const descriptionButton = createElement(Tags.button, `good-card__button`, "Описание");
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
  private size = "small";
  public subscribers: Array<{ obj: CheckBoxInFilter | SliderFilter | SortSection; visit: boolean; type: string }> = [];
  constructor() {
    this.container = createElement(Tags.div, "home__good-list");
    this.state = [];
  }

  public setSize(params: string) {
    this.size = params;
  }

  get getState() {
    return this.state;
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

  public updateRender(data: Array<IGood> | []) {
    this.clear();
    this.fill(data);
  }

  private fill(data: Array<IGood> | []) {
    data.forEach((elem) => this.container.appendChild(new Good(elem, this.size).render()));
  }

  private clear() {
    this.container.innerHTML = "";
  }

  public render() {
    this.updateRender(goods.products);
    return this.container;
  }
}
