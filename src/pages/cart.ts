import "./cart.css";
import "./home.css";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
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
  private cartUsage: Cart;

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
    this.cartUsage = new Cart();
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
    this.cartUsage.renewCurrent();
    this.cartUsage.updateRender();
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
  private summarySumDiscount;
  private appliedCodes: HTMLDivElement;
  private codesHeader: HTMLDivElement;
  private codesItemDima: HTMLDivElement;
  private codesItemTema: HTMLDivElement;
  private codesContentDima: HTMLDivElement;
  private codesContentTema: HTMLDivElement;
  private codesDropDima: HTMLDivElement;
  private codesDropTema: HTMLDivElement;
  private urlHandler;
  private pageLimitAmount: HTMLInputElement;

  private pageNumberAmount: HTMLDivElement;
  private pagesArr: number[];
  private currentPage;
  private cartPagesLength: number;

  private inputPromo: HTMLInputElement;
  private discount: string | null;

  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
    this.productsField = createElement(Tags.div, "products__field") as HTMLDivElement;
    this.summaryProducts = createElement(Tags.p, "summary__products", "Products: 0");
    this.summarySum = createElement(Tags.p, "summary__sum", "Total sum: 0");
    this.summarySumDiscount = createElement(Tags.p, "summary__sum-discount");
    this.observer = new CartObserver();
    this.urlHandler = new UrlHandler();
    this.pageLimitAmount = createElement(Tags.input, "page-limit__amount") as HTMLInputElement;
    this.pageNumberAmount = createElement(Tags.div, "page-number__amount") as HTMLDivElement;
    this.observer.subscribe(this);
    this.pagesArr = [];
    this.currentPage = localStorage.getItem("page") !== null ? localStorage.getItem("page") : "1";
    this.pageLimitAmount.value = String(localStorage.getItem("limit")) ? String(localStorage.getItem("limit")) : "3";
    this.cartPagesLength =
      this.observer.setState() !== null ? Math.floor(Object.keys(this.observer.state).length / +this.pageLimitAmount.value) : 0;
    this.inputPromo = createElement(Tags.input, "input__promo") as HTMLInputElement;
    this.discount = localStorage.getItem("discount") ? localStorage.getItem("discount") : "1";
    this.appliedCodes = createElement(Tags.div, "applied__codes") as HTMLDivElement;
    this.codesHeader = createElement(Tags.div, "codes__header") as HTMLDivElement;
    this.codesItemDima = createElement(Tags.div, "codes__item-dima") as HTMLDivElement;
    this.codesItemTema = createElement(Tags.div, "codes__item-tema") as HTMLDivElement;
    this.codesContentDima = createElement(Tags.div, "codes__content") as HTMLDivElement;
    this.codesContentTema = createElement(Tags.div, "codes__content") as HTMLDivElement;
    this.codesDropDima = createElement(Tags.div, "codes__drop") as HTMLDivElement;
    this.codesDropTema = createElement(Tags.div, "codes__drop") as HTMLDivElement;
  }

  append(...node: Array<HTMLElement>) {
    this.body.append(...node);
  }

  updateRender(data = this.observer.setState()) {
    this.discount = localStorage.getItem("discount") ? localStorage.getItem("discount") : "1";
    this.appliedCodes.classList.remove("applied__codes__display");
    this.summarySum.classList.remove("summary__sum-crossed");
    this.summarySumDiscount.textContent = "";
    this.clear();
    console.log(this.currentPage);
    this.productsField.classList.remove(".products__field-empty");
    if (data !== null) {
      for (let i = 1; i < this.cartPagesLength; i++) {
        this.pagesArr.push(i);
      }
      this.pageNumberAmount.textContent = String(this.currentPage);
      data.forEach((el, index) => {
        if (this.currentPage && +this.currentPage > 0) {
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
      this.appliedCodes.append(this.codesHeader);
      this.codesHeader.textContent = "Applied codes";
      const fullPrice = (data as Array<IGood>).reduce((priv, { price, volume }) => priv + price * (volume as number), 0);
      const fullAmount = (data as Array<IGood>).reduce((priv, { volume }) => priv + (volume as number), 0);
      if (this.discount && this.discount !== "0" && this.discount !== "1") {
        const discountPrice = Math.round(fullPrice * (1 - +this.discount / 100));
        this.summarySum.classList.add("summary__sum-crossed");
        this.summarySumDiscount.textContent = `Total sum: ${discountPrice}`;
        if (this.discount === "10") {
          this.appliedCodes.classList.add("applied__codes__display");
          this.addDima();
        }
        if (this.discount === "5") {
          this.appliedCodes.classList.add("applied__codes__display");
          this.addTema();
        }
        if (this.discount === "15") {
          this.appliedCodes.classList.add("applied__codes__display");
          this.addDima();
          this.addTema();
        }
      }
      this.setPrise(fullAmount, fullPrice);
    } else {
      this.productsField.innerHTML = "NO GOODS IN THE CART";
      this.productsField.classList.add("products__field-empty");
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
    this.pageLimitAmount.min = "1";
    this.pageLimitAmount.max = "5";
    this.pageLimitAmount.step = "1";
    if (+this.pageLimitAmount.value < 1) {
      this.pageLimitAmount.value = "1";
      localStorage.setItem("limit", this.pageLimitAmount.value);
    } else if (+this.pageLimitAmount.value > 5) {
      this.pageLimitAmount.value = "5";
      localStorage.setItem("limit", this.pageLimitAmount.value);
    }
    this.pageLimitAmount.addEventListener(
      "input",
      (() => {
        this.inputFunction();
      }).bind(this)
    );
    const pageNumber = createElement(Tags.div, "products__page-number");
    const pageNumberName = createElement(Tags.p, "page-number__name", "Page");
    const pageNumberContent = createElement(Tags.div, "page-number__content");
    const pageNumberLeft = createElement(Tags.button, "page-number__left");
    const moveLeft = () => {
      if (this.currentPage && this.currentPage !== "1") {
        this.currentPage = String(+this.currentPage - 1);
        this.pageNumberAmount.textContent = this.currentPage;
        localStorage.setItem("page", this.currentPage);
        this.updateRender();
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
        this.updateRender();
        pageNumberLeft.removeAttribute("disabled");
      } else {
        pageNumberRight.setAttribute("disabled", "true");
      }
    };
    pageNumberRight.addEventListener("click", moveRight);
    if (this.currentPage && +this.currentPage <= 1) {
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
    this.append(Header.getInstance().render(), cartMain, Footer.getInstanceFooter().footerRender());

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

    this.inputPromo.placeholder = "Enter promo code";
    this.inputPromo.type = "text";
    this.inputPromo.addEventListener("keydown", ({ key }) => {
      if (this.inputPromo.value === "dima" && key === "Enter" && this.discount !== "5") {
        localStorage.setItem("discount", "10");
        this.summarySum.classList.add("summary__sum-crossed");
      } else if (this.inputPromo.value === "dima" && key === "Enter" && this.discount === "5") {
        localStorage.setItem("discount", `${+this.discount + 10}`);
        this.summarySum.classList.add("summary__sum-crossed");
      } else if (this.inputPromo.value === "tema" && key === "Enter" && this.discount !== "10") {
        localStorage.setItem("discount", "5");
        this.summarySum.classList.add("summary__sum-crossed");
      } else if (this.inputPromo.value === "tema" && key === "Enter" && this.discount === "10") {
        localStorage.setItem("discount", `${+this.discount + 5}`);
        this.summarySum.classList.add("summary__sum-crossed");
      }
      this.updateRender();
    });

    this.codesDropDima.addEventListener("click", () => {
      if (this.discount) {
        this.discount = String(+this.discount - 10);
        localStorage.setItem("discount", this.discount);
      }
      this.appliedCodes.removeChild(this.codesItemDima);
      this.updateRender();
    });
    this.codesDropTema.addEventListener("click", () => {
      if (this.discount) {
        this.discount = String(+this.discount - 5);
        localStorage.setItem("discount", this.discount);
      }
      this.appliedCodes.removeChild(this.codesItemTema);
      this.updateRender();
    });
    const offerPromo: HTMLElement = createElement(Tags.div, "offer__promo", "Promo for test: 'dima', 'tema'.");

    summaryField.append(
      this.summaryProducts,
      this.summarySum,
      this.summarySumDiscount,
      this.appliedCodes,
      this.inputPromo,
      offerPromo,
      buyButton
    );
  }

  pagesLengthUpdate() {
    this.cartPagesLength =
      this.observer.setState() !== null ? Math.floor(Object.keys(this.observer.state).length / +this.pageLimitAmount.value) : 0;
  }

  renewCurrent() {
    if (this.currentPage && +this.currentPage >= 1) {
      this.currentPage = String(+this.currentPage - 1);
      if (+this.currentPage !== 0) {
        localStorage.setItem("page", this.currentPage);
      }
      this.currentPage = null;
      this.productsField.innerHTML = "NO GOODS IN THE CART";
      this.productsField.classList.add("products__field-empty");
    }
  }

  inputFunction() {
    if (+this.pageLimitAmount.value < 1) {
      this.pageLimitAmount.value = "1";
    } else if (+this.pageLimitAmount.value > 5) {
      this.pageLimitAmount.value = "5";
    }
    localStorage.setItem("limit", this.pageLimitAmount.value);
    this.pagesLengthUpdate();
    this.updateRender();
  }

  setDiscount() {
    if (this.inputPromo.value === "dima") {
      let disc = document.querySelector(".summary__sum")?.textContent?.slice(11);
      if (disc !== undefined) {
        disc = String(+disc * 0.9);
        return disc;
      }
    }
  }

  addDima() {
    this.codesItemDima.append(this.codesContentDima, this.codesDropDima);
    this.codesItemDima.children[0].textContent = "dima - 10%";
    this.codesItemDima.children[1].textContent = "DROP";
    this.appliedCodes.append(this.codesItemDima);
  }

  addTema() {
    this.codesItemTema.append(this.codesContentTema, this.codesDropTema);
    this.codesItemTema.children[0].textContent = "tema - 5%";
    this.codesItemTema.children[1].textContent = "DROP";
    this.appliedCodes.append(this.codesItemTema);
  }
}

const yyy = new Cart();
yyy.construct();
