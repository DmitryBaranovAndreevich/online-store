import "./goods.css";
import "./home.css";
import { goods } from "../service";
import { IGood } from "../interface/good";
import { Header } from "../components/header/header";
import { createElement } from "../service";
import { UrlHandler } from "../service/urlHandler";

const urlHandler = new UrlHandler();
const id = urlHandler.searchParams("id") as string;
const goodsArr: IGood[] = goods.products;
const selectedItem: IGood | undefined = goodsArr.find((item) => item.id === +id);
console.log(id); // id товара
console.log("test");
export class GoodsCart {
  body;
  state: { [key: string]: number } = {};
  private chartButton: HTMLElement;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
    this.state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
    this.chartButton = createElement("button", "chart__button");
  }
  append(node: HTMLElement) {
    this.body.appendChild(node);
  }

  public fill(): void {
    this.append(Header.getInstance().render());
    const main: HTMLElement = createElement("div", "main");
    this.append(main);
    const goodsWay: HTMLElement = createElement("section", "goods__way");

    for (let i = 0; i < 7; i++) {
      const breadCrumb: HTMLElement = createElement("a", "bread__crumb");
      goodsWay.append(breadCrumb);
      if (i % 2 !== 0) {
        breadCrumb.textContent = ">>";
      } else if (i === 0) {
        breadCrumb.textContent = "MAIN";
        breadCrumb.style.cursor = "pointer";
        breadCrumb.onclick = () => {
          window.location.href = "./main";
        };
      } else if (i === 2 && selectedItem !== undefined) {
        breadCrumb.textContent = selectedItem.category.toUpperCase();
        breadCrumb.style.cursor = "pointer";
        breadCrumb.onclick = () => {
          window.location.href = "#";
        };
      } else if (i === 4 && selectedItem !== undefined) {
        breadCrumb.textContent = selectedItem.brand.toUpperCase();
        breadCrumb.style.cursor = "pointer";
        breadCrumb.onclick = () => {
          window.location.href = "#";
        };
      } else if (i === 6 && selectedItem !== undefined) {
        breadCrumb.textContent = selectedItem.title.toUpperCase();
        breadCrumb.style.cursor = "pointer";
        breadCrumb.onclick = () => {
          window.location.href = "#";
        };
      }
    }
    const goodsContainer: HTMLElement = createElement("section", "goods__container");
    main.append(goodsWay, goodsContainer);
    const goodsName: HTMLElement = createElement("h1", "goods__name");
    const goodsInfo: HTMLElement = createElement("div", "goods__info");
    goodsContainer.append(goodsName, goodsInfo);
    if (selectedItem !== undefined) {
      goodsName.textContent = selectedItem.title;
    }
    const goodsPhotoBLock: HTMLElement = createElement("div", "goods__photo-block");
    const goodsPhotoMain: HTMLElement = createElement("div", "goods__photo-main");
    if (selectedItem !== undefined) {
      goodsPhotoMain.style.backgroundImage = `url(${selectedItem.images[0]})`;
    }
    const goodsPhotoList: HTMLElement = createElement("div", "goods__photo-list");
    goodsPhotoBLock.append(goodsPhotoMain, goodsPhotoList);
    if (selectedItem !== undefined) {
      for (let i = 0; i < selectedItem.images.length; i++) {
        const goodsPhotoListElem: HTMLElement = createElement("div", "goods__photo-list__elem");
        goodsPhotoList.append(goodsPhotoListElem);
        goodsPhotoListElem.style.backgroundImage = `url(${selectedItem.images[i]})`;
        goodsPhotoListElem.style.cursor = "pointer";
        goodsPhotoListElem.addEventListener("click", function (): void {
          goodsPhotoMain.style.backgroundImage = `url(${selectedItem.images[i]})`;
        });
      }
    }
    const goodsDescriptionBLock: HTMLElement = createElement("div", "goods__description-block");
    const goodsPurchaseBLock: HTMLElement = createElement("div", "goods__purchase-block");
    goodsInfo.append(goodsPhotoBLock, goodsDescriptionBLock, goodsPurchaseBLock);

    for (let i = 0; i < 6; i++) {
      const charField: HTMLElement = createElement("div", "char__field");
      const charFieldName: HTMLElement = createElement("div", "char__field-name");
      const charFieldContent: HTMLElement = createElement("div", "char__field-content");
      charField.append(charFieldName, charFieldContent);
      goodsDescriptionBLock.append(charField);
      const upperField: ChildNode | null = charField.firstChild;
      const lowerField: ChildNode | null = charField.lastChild;
      if (charField === goodsDescriptionBLock.children[0] && upperField !== null && lowerField !== null && selectedItem !== undefined) {
        upperField.textContent = "Description";
        lowerField.textContent = selectedItem.description;
      } else if (
        charField === goodsDescriptionBLock.children[1] &&
        upperField !== null &&
        lowerField !== null &&
        selectedItem !== undefined
      ) {
        upperField.textContent = "Discount";
        lowerField.textContent = selectedItem.discountPercentage.toString();
      } else if (
        charField === goodsDescriptionBLock.children[2] &&
        upperField !== null &&
        lowerField !== null &&
        selectedItem !== undefined
      ) {
        upperField.textContent = "Rating";
        lowerField.textContent = selectedItem.rating.toString();
      } else if (
        charField === goodsDescriptionBLock.children[3] &&
        upperField !== null &&
        lowerField !== null &&
        selectedItem !== undefined
      ) {
        upperField.textContent = "Stock";
        lowerField.textContent = selectedItem.stock.toString();
      } else if (
        charField === goodsDescriptionBLock.children[4] &&
        upperField !== null &&
        lowerField !== null &&
        selectedItem !== undefined
      ) {
        upperField.textContent = "Brand";
        lowerField.textContent = selectedItem.brand;
      } else if (
        charField === goodsDescriptionBLock.children[5] &&
        upperField !== null &&
        lowerField !== null &&
        selectedItem !== undefined
      ) {
        upperField.textContent = "Category";
        lowerField.textContent = selectedItem.category;
      }
    }

    const goodsPrice: HTMLElement = createElement("div", "goods__price");
    if (selectedItem !== undefined) {
      goodsPrice.textContent = selectedItem.price.toString() + " $";
    }
    this.chartButton;
    this.chartButton.textContent = "ADD TO CHART";
    const buyButton: HTMLElement = createElement("button", "buy__button");
    buyButton.textContent = "BUY NOW";
    goodsPurchaseBLock.append(goodsPrice, this.chartButton, buyButton);
  }

  private goodToCart = () => {
    const selectedItem: IGood | undefined = goodsArr.find((item) => item.id === +id);
    if (selectedItem) {
      this.state = { ...this.state, [selectedItem.id]: 1 };
      console.log(this.state);
      localStorage.setItem("item", JSON.stringify(this.state));
    }
    Header.getInstance().clearUpdateIcon();
    this.chartButton.textContent = "ALREADY IN THE CART";
    this.chartButton.classList.remove("chart__button__added");
    this.chartButton.classList.add("chart__button__added");
    console.log(this.state);
  };

  public goodListener() {
    this.chartButton.addEventListener("click", this.goodToCart);
  }
}

const goodsCart = new GoodsCart();
goodsCart.fill();
goodsCart.goodListener();
