import "./cart.css";
import "./home.css";
import { Header } from "../components/header/header";
import { createElement } from "../service";
import { goodsArr } from "./goods";
import { IGood } from "../interface/good";

class Cart {
  body;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
  }
  append(node: HTMLElement) {
    this.body.appendChild(node);
  }

  construct(): void {
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
    const storageSet: string[] | undefined = localStorage.getItem("item")?.split(",");
    console.log(storageSet);
    if (storageSet !== undefined) {
      for (let i = 0; i < storageSet.length; i++) {
        const choosenItem: IGood | undefined = goodsArr.find((item) => item.id === +storageSet[i]);
        let amount = 1;
        if (choosenItem !== undefined) {
          let price = choosenItem.price;
          const productsItem: HTMLElement = createElement("div", "products__item");
          productsField.append(productsItem);
          const itemNumber: HTMLElement = createElement("div", "item__number");
          const parent: ParentNode | null = productsItem.parentNode;
          const index = Array.prototype.indexOf.call(parent?.children, productsItem);
          itemNumber.textContent = (index + 1).toString();
          const itemPhoto: HTMLElement = createElement("div", "item__photo");
          itemPhoto.style.backgroundImage = `url(${choosenItem.images[0]})`;
          const itemInfo: HTMLElement = createElement("div", "item__info");
          itemInfo.textContent = choosenItem.description;
          const itemPrice: HTMLElement = createElement("div", "item__price");
          itemPrice.textContent = price.toString();
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
            itemAmountNumber.textContent = (amount = amount + 1).toString();
            itemPrice.textContent = (price += choosenItem.price).toString();
            fullAmountDigit = 0;
            fullPriceDigit = 0;
            yyy();
          });
          itemAmountMinus.addEventListener("click", () => {
            itemAmountNumber.textContent = (amount = amount - 1).toString();
            itemPrice.textContent = (price -= choosenItem.price).toString();
            fullAmountDigit = 0;
            fullPriceDigit = 0;
            yyy();
            if (amount < 1) {
              productsField.removeChild(productsItem);
              const id = choosenItem.id;
              storageSet.splice(id, 1);
              localStorage.setItem("item", storageSet.toString());
              console.log(storageSet);
              for (let j = 0; j < productsField.children.length; j++) {
                productsField.children[j].children[0].textContent = (j + 1).toString();
              }
            }
          });
        }
      }
    }
    //const itemAmount: HTMLElement = document.querySelector(".item__amount") as HTMLElement;
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
cart.construct();