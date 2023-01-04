import "./goodsList.css";
import { IGood } from "../../interface/good";
import { Tags } from "../../interface/tags";
import { createElement, goods } from "../../service";
import { UrlHandler } from "../../service/urlHandler";
import { CartObserver } from "../../service/cartObserver";
import { Header } from "../header/header";

// interface IArray {
//   id: number;
//   volume: number;
// }

// let cartArray: IArray[] = [];

export class Good {
  private params;
  private container;
  private size;
  private buyButton;
  private descriptionButton;
  private addClass;
  private cartObserver;

  constructor(params: IGood, size: string, observer: CartObserver, add = false) {
    if (add) this.addClass = "good-card_disabled";
    else this.addClass = "good-card";
    this.params = params;
    this.container = createElement(Tags.div, `good-card_${size} ${this.addClass}`);
    this.size = size;
    this.buyButton = createElement(Tags.button, `good-card__button`, "Купить") as HTMLButtonElement;
    if (add) {
      this.buyButton.disabled = true;
      this.buyButton.classList.add("good-card__button_disabled");
    }
    this.descriptionButton = createElement(Tags.button, `good-card__button`, "Описание");
    this.cartObserver = observer;
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
    this.buyButton.addEventListener("click", this.handelClickToCart);
    this.descriptionButton.addEventListener("click", this.handelClickToDescription);
  }

  private handelClickToCart = () => {
    this.cartObserver.addElement(this.params.id);
    Header.getInstance().clearUpdateIcon();
  };

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
  private text;
  private size = "small";
  private urlHandler = new UrlHandler();
  private parmName = "iconsSize";
  private renderArr: Good[] = [];
  private cartObserver = new CartObserver();
  constructor() {
    this.container = createElement(Tags.div, "home__good-list") as HTMLDivElement;
    this.text = createElement(Tags.p, "home__good-list-text");
    this.state = [];
    this.cartObserver = new CartObserver();
    this.cartObserver.subscribe(this);
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

  public updateRender(data = this.getState) {
    this.clear();
    this.fill(data);
  }

  private fill(data: Array<IGood> | []) {
    this.state = data;
    this.container.append(this.text);
    this.text.textContent = data.length ? `Всего: ${data.length}` : "Товаров не найдено";
    data.forEach((elem) => {
      const element =
        this.cartObserver.state && this.cartObserver.state[elem.id]
          ? new Good(elem, this.size, this.cartObserver, true)
          : new Good(elem, this.size, this.cartObserver);
      element.addListeners();
      this.renderArr.push(element);
      this.container.appendChild(element.render());
    });
  }

  private clear() {
    this.renderArr.forEach((element) => element.removeListeners());
    this.container.innerHTML = "";
  }

  private setContent() {
    this.container.style.setProperty("--text", `Всего: ${this.renderArr.length}`);
  }

  public render() {
    const size = this.urlHandler.searchParams(this.parmName);
    if (size) this.setSize(size);
    this.updateRender(goods.products);
    this.setContent();
    return this.container;
  }
}
