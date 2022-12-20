import "./goodsList.css";
import { IGood } from "../../interface/good";
import { Tags } from "../../interface/tags";
import { createElement, goods } from "../../service";
import { UrlHandler } from "../../service/urlHandler";

export class Good {
  private params;
  private container;
  private size;
  private buyButton;
  private descriptionButton;

  constructor(params: IGood, size: string) {
    this.params = params;
    this.container = createElement(Tags.div, `good-card_${size}`);
    this.size = size;
    this.buyButton = createElement(Tags.button, `good-card__button`, "Купить");
    this.descriptionButton = createElement(Tags.button, `good-card__button`, "Описание");
  }

  private append() {
    const image = createElement(Tags.img, `good-card__image_${this.size}`) as HTMLImageElement;
    image.src = this.params.thumbnail;
    image.alt = this.params.title;
    const price = createElement(Tags.p, `good-card__price_${this.size}`, `от ${this.params.price} руб.`);
    const name = createElement(Tags.p, `good-card__title_${this.size}`, this.params.title);
    this.container.append(image, price, name, this.buyButton, this.descriptionButton);
  }

  public addListeners() {
    this.descriptionButton.addEventListener("click", this.handelClickToDescription);
  }

  private handelClickToDescription = () => {
    window.location.href = `/goods?id=${this.params.id}`;
  };

  public removeListeners() {
    this.descriptionButton.removeEventListener("click", this.handelClickToDescription);
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
  private urlHandler = new UrlHandler();
  private parmName = "iconsSize";
  private renderArr: Good[] = [];
  constructor() {
    this.container = createElement(Tags.div, "home__good-list");
    this.state = [];
  }

  public setSize(params: string) {
    this.size = params;
    this.urlHandler.insertParam(this.parmName, params);
  }

  get getState() {
    return this.state;
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
    data.forEach((elem) => {
      const element = new Good(elem, this.size);
      element.addListeners();
      this.renderArr.push(element);
      this.container.appendChild(element.render());
    });
  }

  private clear() {
    this.renderArr.forEach((element) => element.removeListeners());
    this.container.innerHTML = "";
  }

  public render() {
    const size = this.urlHandler.searchParams(this.parmName);
    if (size) this.setSize(size);
    this.updateRender(goods.products);
    return this.container;
  }
}
