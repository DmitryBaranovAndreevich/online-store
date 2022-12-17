import "./goodsList.css";
import { IGood } from "../../interface/good";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";
import { Checkbox } from "../checkBox/checkBox";

export class Good {
  private params;
  private container;
  constructor(params: IGood) {
    this.params = params;
    this.container = createElement(Tags.div, "good-card");
  }

  private append() {
    const nodeArr = [];
    const image = createElement(Tags.img, "good-card__image") as HTMLImageElement;
    image.src = this.params.thumbnail;
    image.alt = this.params.title;
    nodeArr.push(image);
    const price = createElement(Tags.p, "good-card__price", `от ${this.params.price} руб.`);
    nodeArr.push(price);
    const name = createElement(Tags.p, "good-card__title", this.params.title);
    nodeArr.push(name);
    const buyButton = createElement(Tags.button, "good-card__button", "Купить");
    nodeArr.push(buyButton);
    const descriptionButton = createElement(Tags.button, "good-card__button", "Описание");
    nodeArr.push(descriptionButton);
    nodeArr.forEach((node) => this.container.appendChild(node));
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
  public subscribers: Array<Checkbox> = [];
  constructor() {
    this.container = createElement(Tags.div, "home__good-list");
    this.state = [];
  }

  get getState() {
    return this.state;
  }

  public setSubscribers(subscriber: Checkbox) {
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
    // this.notifySubscribers();
  }

  // private notifySubscribers() {}

  private fill() {
    this.state.forEach((elem) => this.container.appendChild(new Good(elem).render()));
  }

  private clear() {
    this.container.innerHTML = "";
  }

  public render() {
    return this.container;
  }
}
