import "./cart.css";
import "./home.css";
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
    yyy.renewCurrent();
    yyy.updateRender();
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
  private observer: CartObserver;
  private productsField;
  private products: Array<CartGood> = [];
  private summaryProducts;
  private summarySum;
  private urlHandler;
  private pageLimitAmount: HTMLInputElement;
  private pageNumberAmount: HTMLDivElement;
  private pagesArr: number[];
  private currentPage;
  private cartPagesLength: number;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
    this.productsField = createElement(Tags.div, "products__field") as HTMLDivElement;
    this.summaryProducts = createElement(Tags.p, "summary__products", "Products: 0");
    this.summarySum = createElement(Tags.p, "summary__sum", "Total sum: 0");
    this.observer = new CartObserver();
    this.urlHandler = new UrlHandler();
    this.pageLimitAmount = createElement(Tags.input, "page-limit__amount") as HTMLInputElement;
    this.pageNumberAmount = createElement(Tags.div, "page-number__amount") as HTMLDivElement;
    this.observer.subscribe(this);
    this.pagesArr = [];
    this.currentPage = localStorage.getItem("page") ? localStorage.getItem("page") : "1";
    this.pageLimitAmount.value = String(localStorage.getItem("limit")) ? String(localStorage.getItem("limit")) : "3";
    this.cartPagesLength =
      this.observer.setState() !== null ? Math.floor(Object.keys(this.observer.state).length / +this.pageLimitAmount.value) : 0;
  }

  append(...node: Array<HTMLElement>) {
    this.body.append(...node);
  }

  updateRender(data = this.observer.setState()) {
    this.clear();
    if (data !== null) {
      for (let i = 1; i < this.cartPagesLength; i++) {
        this.pagesArr.push(i);
      }
      this.pageNumberAmount.textContent = String(this.currentPage);
      data.forEach((el, index) => {
        if (this.currentPage) {
          const borderNumber = +this.pageLimitAmount.value * +this.currentPage;
          if (index < borderNumber && index > borderNumber - (+this.pageLimitAmount.value + 1)) {
            const productsItem = new CartGood(el, index + 1, this.observer);
            this.products.push(productsItem);
            this.productsField.append(productsItem.render());
            this.cartPagesLength =
              this.observer.setState() !== null ? Math.ceil(Object.keys(this.observer.state).length / +this.pageLimitAmount.value) : 0;
          }
        }
      });
      const fullPrice = (data as Array<IGood>).reduce((priv, { price, volume }) => priv + price * (volume as number), 0);
      const fullAmount = (data as Array<IGood>).reduce((priv, { volume }) => priv + (volume as number), 0);
      this.setPrise(fullAmount, fullPrice);
    } else {
      this.productsField.innerHTML = "NO GOODS IN THE CART";
    }
  }

  private setPrise(count: number, price: number) {
    this.summaryProducts.textContent = `Products: ${count}`;
    this.summarySum.textContent = `Total sum: ${price}`;
  }

  private clear() {
    this.productsField.innerHTML = "";
    this.products = [];
  }

  construct(): void {
    const cartMain = createElement(Tags.div, "cart__main");
    const productsHeader = createElement(Tags.p, "products__header");
    const productsHeaderName = createElement(Tags.p, "products__header-name", "Products in Cart");
    const productsHeaderControl = createElement(Tags.div, "products__header-control");
    const pageLimit = createElement(Tags.div, "products__page-limit");
    const pageLimitName = createElement(Tags.p, "page-limit__name", "Limit");
    const pageLimitContent = createElement(Tags.div, "page-limit__content");
    this.pageLimitAmount.type = "number";
    this.pageLimitAmount.min = "0";
    this.pageLimitAmount.max = "5";
    localStorage.setItem("limit", this.pageLimitAmount.value);
    this.pageLimitAmount.addEventListener("input", function () {
      localStorage.setItem("limit", this.value);
      yyy.pagesLengthUpdate();
      yyy.updateRender();
    });
    const pageNumber = createElement(Tags.div, "products__page-number");
    const pageNumberName = createElement(Tags.p, "page-number__name", "Page");
    const pageNumberContent = createElement(Tags.div, "page-number__content");
    const pageNumberLeft = createElement(Tags.button, "page-number__left");
    const moveLeft = () => {
      if (this.currentPage && this.currentPage !== "1") {
        this.currentPage = String(+this.currentPage - 1);
        this.pageNumberAmount.textContent = this.currentPage;
        localStorage.setItem("page", this.currentPage);
        yyy.updateRender();
        pageNumberRight.removeAttribute("disabled");
      } else {
        pageNumberLeft.setAttribute("disabled", "true");
      }
    };
    pageNumberLeft.addEventListener("click", moveLeft);
    const pageNumberRight = createElement(Tags.button, "page-number__right");
    const moveRight = () => {
      if (this.currentPage && +this.currentPage < this.cartPagesLength) {
        this.currentPage = String(+this.currentPage + 1);
        this.pageNumberAmount.textContent = this.currentPage;
        localStorage.setItem("page", this.currentPage);
        yyy.updateRender();
        pageNumberLeft.removeAttribute("disabled");
      } else {
        pageNumberRight.setAttribute("disabled", "true");
      }
    };
    pageNumberRight.addEventListener("click", moveRight);
    if (this.pageNumberAmount.textContent === "1") {
      pageNumberLeft.setAttribute("disabled", "true");
    }
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

    productsHeader.append(productsHeaderName, productsHeaderControl);
    productsHeaderControl.append(pageLimit, pageNumber);
    pageLimit.append(pageLimitName, pageLimitContent);
    pageLimitContent.append(this.pageLimitAmount);
    pageNumber.append(pageNumberName, pageNumberContent);
    pageNumberContent.append(pageNumberLeft, this.pageNumberAmount, pageNumberRight);
    products.append(productsHeader, this.productsField);
    this.updateRender();

    summary.append(summaryHeader, summaryField);

    const inputPromo: HTMLInputElement = createElement(Tags.input, "input__promo") as HTMLInputElement;
    inputPromo.placeholder = "Enter promo code";

    summaryField.append(this.summaryProducts, this.summarySum, inputPromo, buyButton);
  }

  pagesLengthUpdate() {
    this.cartPagesLength =
      this.observer.setState() !== null ? Math.floor(Object.keys(this.observer.state).length / +this.pageLimitAmount.value) : 0;
  }

  renewCurrent() {
    this.currentPage = localStorage.getItem("page") ? localStorage.getItem("page") : "1";
    if (this.currentPage) {
      this.currentPage = String(+this.currentPage - 1);
      localStorage.setItem("page", this.currentPage);
    }
  }
}

const yyy = new Cart();
yyy.construct();
