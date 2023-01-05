import "./cart.css";
import "./home.css";
import { goods } from "../service";
import { Header } from "../components/header/header";
import { createElement } from "../service";
import { IGood } from "../interface/good";
import { CartObserver } from "../service/cartObserver";
import { PopupPage } from "./popup";
import { UrlHandler } from "../service/urlHandler";
import { Tags } from "../interface/tags";

class CartGood {
  private chosenItem;
  public index;
  private price;
  private productsItem;
  private itemNumber;
  private itemPhoto;
  private itemInfo;
  private itemPrice;
  private itemAmount;
  private itemAmountNumber;
  private itemAmountButtons;
  private itemPlus;
  private itemMinus;
  private observer: CartObserver;

  constructor(chosenItem: IGood, index: number, observer: CartObserver) {
    this.chosenItem = chosenItem;
    this.index = index;
    this.price = chosenItem.price;
    this.productsItem = createElement(Tags.div, "products__item");
    this.itemNumber = createElement(Tags.div, "item__number");
    this.itemPhoto = createElement(Tags.div, "item__photo");
    this.itemInfo = createElement(Tags.p, "item__info", chosenItem.title);
    this.itemPrice = createElement(Tags.p, "item__price", String(chosenItem.price));
    this.itemAmount = createElement(Tags.div, "item__amount");
    this.itemAmountNumber = createElement(Tags.p, "item__amount-number", String(chosenItem.volume));
    this.itemAmountButtons = createElement(Tags.div, "item__amount-buttons");
    this.itemPlus = createElement(Tags.button, "item__amount-plus");
    this.itemMinus = createElement(Tags.button, "item__amount-minus");
    this.observer = observer;
  }

  private append() {
    this.itemNumber.textContent = String(this.index);
    this.itemPhoto.style.backgroundImage = `url(${this.chosenItem.images[0]})`;
    const amount: number = this.chosenItem.volume as number;
    this.itemPrice.textContent = (this.price * amount).toString();
    this.productsItem.append(this.itemNumber, this.itemPhoto, this.itemInfo, this.itemPrice, this.itemAmount);
    this.itemAmountNumber.textContent = amount.toString();
    this.itemAmount.append(this.itemAmountNumber, this.itemAmountButtons);
    this.itemAmountButtons.append(this.itemPlus, this.itemMinus);
  }

  public cartListeners() {
    this.itemPlus.addEventListener("click", this.increaseAmount);
    this.itemMinus.addEventListener("click", this.decreaseAmount);
  }

  private increaseAmount = () => {
    this.observer.increase(this.chosenItem.id);
    Header.getInstance().clearUpdateIcon();
  };

  private decreaseAmount = () => {
    this.observer.decrease(this.chosenItem.id);
    Header.getInstance().clearUpdateIcon();
  };

  render() {
    this.cartListeners();
    this.append();
    return this.productsItem;
  }
}

export class Cart {
  body;
  private cartItems: Array<IGood> | [];
  private observer: CartObserver;
  private productsField;
  private products: Array<CartGood> = [];
  private summaryProducts;
  private summarySum;
  private urlHandler;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
    this.productsField = createElement(Tags.div, "products__field") as HTMLDivElement;
    this.summaryProducts = createElement(Tags.p, "summary__products", "Products: 0");
    this.summarySum = createElement(Tags.p, "summary__sum", "Total sum: 0");
    this.observer = new CartObserver();
    this.urlHandler = new UrlHandler();
    this.observer.subscribe(this);
    this.cartItems = this.observer.state
      ? Array.from(Object.keys(this.observer.state)).map((id) => {
          const good = goods.products.find((good) => good.id === Number(id)) as IGood;
          return { ...good, volume: this.observer.state[id] };
        })
      : [];
  }
  append(...node: Array<HTMLElement>) {
    this.body.append(...node);
  }

  updateRender(data = this.cartItems) {
    this.clear();
    data.forEach((el, index) => {
      const productsItem = new CartGood(el, index + 1, this.observer);
      this.products.push(productsItem); // чтобы поптом удалить обработчики
      this.productsField.append(productsItem.render());
    });
    const fullPrice = (data as Array<IGood>).reduce((priv, { price, volume }) => priv + price * (volume as number), 0);
    const fullAmount = (data as Array<IGood>).reduce((priv, { volume }) => priv + (volume as number), 0);
    this.setPrise(fullAmount, fullPrice);
  }

  private setPrise(count: number, price: number) {
    this.summaryProducts.textContent = `Products: ${count}`;
    this.summarySum.textContent = `Total sum: ${price}`;
  }

  private clear() {
    this.productsField.innerHTML = "";
    // удаляем обработчики
    this.products = [];
  }

  construct(): void {
    const cartMain = createElement(Tags.div, "cart__main");
    const productsHeader = createElement(Tags.p, "products__header", "Products in Cart");
    const summaryHeader = createElement(Tags.p, "summary__header", "Summary");
    const summaryField = createElement(Tags.div, "summary__field");
    const buyButton = createElement(Tags.button, "buy__button", "BUY NOW") as HTMLButtonElement;
    const openPopup = this.urlHandler.searchParams("popup") ? true : false;
    const popup = new PopupPage(buyButton, openPopup);
    buyButton.addEventListener("click", () => {
      popup.container.classList.add("popup-background_active");
    });

    popup.render();
    this.append(Header.getInstance().render(), cartMain);

    const products = createElement(Tags.section, "products");
    const summary = createElement(Tags.section, "summary");
    cartMain.append(products, summary);

    products.append(productsHeader, this.productsField);
    this.updateRender();

    summary.append(summaryHeader, summaryField);

    const inputPromo: HTMLInputElement = createElement(Tags.input, "input__promo") as HTMLInputElement;
    inputPromo.placeholder = "Enter promo code";

    summaryField.append(this.summaryProducts, this.summarySum, inputPromo, buyButton);
  }
}

const cart = new Cart();
cart.construct();
