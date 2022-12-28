import "./cart.css";
import "./home.css";
import { goods } from "../service";
import { Header } from "../components/header/header";
import { createElement } from "../service";
import { IGood } from "../interface/good";
import { CartObserver } from "../service/cartObserver";

const goodsArr: IGood[] = goods.products;

interface IArray {
  id: number;
  volume: number;
}

class CartGood {
  private chosenItem;
  public cartItems;
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

  constructor(chosenItem: IGood, cartItems: IArray[]) {
    //chosenItem прилетает из goods.products, а cartItems из localStorage ???
    this.chosenItem = chosenItem;
    this.cartItems = cartItems; //JSON.parse(localStorage.getItem("item") as string) as IArray[];
    this.price = chosenItem.price;
    this.productsItem = createElement("div", "products__item");
    this.itemNumber = createElement("div", "item__number");
    this.itemPhoto = createElement("div", "item__photo");
    this.itemInfo = createElement("div", "item__info");
    this.itemPrice = createElement("div", "item__price");
    this.itemAmount = createElement("div", "item__amount");
    this.itemAmountNumber = createElement("div", "item__amount-number");
    this.itemAmountButtons = createElement("div", "item__amount-buttons");
    this.itemPlus = createElement("button", "item__amount-plus");
    this.itemMinus = createElement("button", "item__amount-minus");
    this.observer = new CartObserver();
  }

  private append() {
    const num: IArray | undefined = this.cartItems.find((item) => item.id === this.chosenItem.id);
    this.itemNumber.textContent = num !== undefined ? this.cartItems.indexOf(num).toString() : "";
    this.itemPhoto.style.backgroundImage = `url(${this.chosenItem.images[0]})`;
    const amount: number = num !== undefined ? this.cartItems[this.cartItems.indexOf(num)].volume : 0;
    this.itemPrice.textContent = (this.price * amount).toString();
    this.productsItem.append(this.itemNumber, this.itemPhoto, this.itemInfo, this.itemPrice, this.itemAmount);
    this.itemAmountNumber.textContent = amount.toString();
    this.itemAmount.append(this.itemAmountNumber, this.itemAmountButtons);
    this.itemAmountButtons.append(this.itemPlus, this.itemMinus);
  }

  private updateProductsItem() {
    this.productsItem.innerHTML = "";
    this.append();
  }

  public cartListeners() {
    this.itemPlus.addEventListener("click", this.increaseAmount()); // не понятно, почему ошибка
    this.itemMinus.addEventListener("click", this.decreaseAmount());
  }

  private increaseAmount() {
    const num: IArray | undefined = this.cartItems.find((item) => item.id === this.chosenItem.id);
    if (num) {
      this.observer.increase(this.cartItems[this.cartItems.indexOf(num)].id);
    }
    this.updateProductsItem();
  }

  private decreaseAmount() {
    const num: IArray | undefined = this.cartItems.find((item) => item.id === this.chosenItem.id);
    if (num) {
      this.observer.decrease(this.cartItems[this.cartItems.indexOf(num)].id);
    }
    this.updateProductsItem();
    //не понял, можем ли мы обойтись только chosenItem: IGood, как ты говорил. Мне понятно, как использовать cartItems: IArray[]
    //вместе с chosenItem или только cartItem, так как информацию мы берем из массива в локал сторадж и потом уже соотносим с общим
    //массивом объектов. В остальном вроде логика понятна.
  }
}

export class Cart {
  body;
  private cartItems: Array<IGood> | [];
  private observer: CartObserver;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
    this.observer = new CartObserver();
    this.cartItems = this.observer.state?.map((elem) => goods.products.find((good) => good.id == elem.id));
    console.log(this.cartItems);
  }
  append(node: HTMLElement) {
    this.body.appendChild(node);
  }

  updateRender(data: Array<IGood> | []) {
    console.log(data);

    this.body.innerHTML = "";
    this.construct(this.cartItems);
  }

  private clear() {
    //this.cartItems.forEach((element) => element.removeListeners());
    this.body.innerHTML = "";
  }

  construct(cartItems: IArray[]): void {
    this.cartItems = this.observer.state;
    this.append(Header.getInstance().render());
    const cartMain: HTMLElement = createElement("div", "cart__main");
    this.append(cartMain);
    const products: HTMLElement = createElement("section", "products");
    const summary: HTMLElement = createElement("section", "summary");
    cartMain.append(products, summary);
    const productsHeader: HTMLElement = createElement("div", "products__header");
    productsHeader.textContent = "Products in Cart";
    const productsField: HTMLElement = createElement("div", "products__field");
    products.append(productsHeader, productsField);
    for (let i = 0; i < this.cartItems.length; i++) {
      const choosenItem: IGood | undefined = goodsArr.find((item) => item.id === this.cartItems[i].id);
      const amount: number = this.cartItems[i].volume;
      if (choosenItem !== undefined) {
        const price = choosenItem.price;
        const productsItem: HTMLElement = createElement("div", "products__item");
        productsField.append(productsItem);
        const itemNumber: HTMLElement = createElement("div", "item__number");
        //const parent: ParentNode | null = productsItem.parentNode;
        //const index = Array.prototype.indexOf.call(parent?.children, productsItem);
        itemNumber.textContent = (i + 1).toString();
        const itemPhoto: HTMLElement = createElement("div", "item__photo");
        itemPhoto.style.backgroundImage = `url(${choosenItem.images[0]})`;
        const itemInfo: HTMLElement = createElement("div", "item__info");
        itemInfo.textContent = choosenItem.description;
        const itemPrice: HTMLElement = createElement("div", "item__price");
        itemPrice.textContent = (price * amount).toString();
        const itemAmount: HTMLElement = createElement("div", "item__amount");
        productsItem.append(itemNumber, itemPhoto, itemInfo, itemPrice, itemAmount);
        const itemAmountNumber: HTMLElement = createElement("div", "item__amount-number");
        const itemAmountButtons: HTMLElement = createElement("div", "item__amount-buttons");
        itemAmountNumber.textContent = amount.toString();
        itemAmount.append(itemAmountNumber, itemAmountButtons);
        const itemAmountPlus: HTMLElement = createElement("button", "item__amount-plus");
        const itemAmountMinus: HTMLElement = createElement("button", "item__amount-minus");
        itemAmountButtons.append(itemAmountPlus, itemAmountMinus);

        itemAmountPlus.addEventListener("click", () => {
          this.observer.increase(this.cartItems[i].id);
          this.updateRender();
          fullAmountDigit = 0;
          fullPriceDigit = 0;
          yyy();
        });
        itemAmountMinus.addEventListener("click", () => {
          this.observer.decrease(this.cartItems[i].id);
          this.updateRender();
          fullAmountDigit = 0;
          fullPriceDigit = 0;
          yyy();
        });
      }
    }
    const summaryHeader: HTMLElement = createElement("div", "summary__header");
    summaryHeader.textContent = "Summary";
    const summaryField: HTMLElement = createElement("div", "summary__field");
    summary.append(summaryHeader, summaryField);
    const summaryProducts: HTMLElement = createElement("div", "summary__products");
    let fullAmountDigit = 0;
    let fullPriceDigit = 0;
    summaryProducts.textContent = `Products: ${fullAmountDigit}`;
    const summarySum: HTMLElement = createElement("div", "summary__sum");
    const inputPromo: HTMLInputElement = createElement("input", "input__promo") as HTMLInputElement;
    inputPromo.placeholder = "Enter promo code";
    const buyButton: HTMLElement = createElement("button", "buy__button");
    buyButton.textContent = "BUY NOW";
    summaryField.append(summaryProducts, summarySum, inputPromo, buyButton);
    function yyy(): void {
      for (let k = 0; k < productsField.children.length; k++) {
        const fullAmount = productsField.children[k].children[4].children[0];
        const fullPrice = productsField.children[k].children[3];
        fullAmountDigit += Number(fullAmount.textContent);
        fullPriceDigit += Number(fullPrice.textContent);
        summaryProducts.textContent = `Products: ${fullAmountDigit}`;
        summarySum.textContent = `Total sum: ${fullPriceDigit}`;
      }
    }
    window.onload = () => yyy();
  }
}

const cart = new Cart();
cart.construct(this.cartItems);
