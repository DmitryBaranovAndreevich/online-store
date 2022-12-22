import "./cart.css";
import "./home.css";
import goodsList from "../components/goods-list";
import { Header } from "../components/header/header";
import { createElement } from "../service";

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
    const main: HTMLElement = createElement("div", "main");
    this.append(main);
    const products: HTMLElement = createElement("section", "products");
    const summary: HTMLElement = createElement("section", "summary");
    main.append(products, summary);
    const productsHeader: HTMLElement = createElement("div", "products__header");
    productsHeader.textContent = "Products in Cart";
    const productsField: HTMLElement = createElement("div", "products__field");
    products.append(productsHeader, productsField);

    for (let i = 0; i < goodsList.length; i++) {
      const productsItem: HTMLElement = createElement("div", "products__item");
      productsField.append(productsItem);
      const itemNumber: HTMLElement = createElement("div", "item__number");
      itemNumber.textContent = (i + 1).toString();
      const itemPhoto: HTMLElement = createElement("div", "item__photo");
      itemPhoto.style.backgroundImage = goodsList[i].picture[0];
      const itemInfo: HTMLElement = createElement("div", "item__info");
      itemInfo.textContent = goodsList[i].description;
      const itemAmount: HTMLElement = createElement("div", "item__amount");
      itemAmount.textContent = "1";
      productsItem.append(itemNumber, itemPhoto, itemInfo, itemAmount);
    }
    const summaryHeader: HTMLElement = createElement("div", "summary__header");
    summaryHeader.textContent = "Summary";
    const summaryField: HTMLElement = createElement("div", "summary__field");
    summary.append(summaryHeader, summaryField);
  }
}

const cart = new Cart();
cart.construct();
