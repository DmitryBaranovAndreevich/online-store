import "./goods.css";
import "./home.css";
import { goods } from "../service";
import { IGood } from "../interface/good";
import { Header } from "../components/header/header";
import { createElement } from "../service";
import { UrlHandler } from "../service/urlHandler";
import { Tags } from "../interface/tags";

const urlHandler = new UrlHandler();
const id = urlHandler.searchParams("id") as string;
const goodsArr: IGood[] = goods.products;
const selectedItem = goodsArr.find((item) => item.id === +id) as IGood;

export class GoodsCart {
  body;
  state: { [key: string]: number } = {};
  private chartButton: HTMLElement;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
    this.state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
    this.chartButton = createElement(Tags.button, "chart__button");
    this.chartButton.textContent = "ADD TO CHART";
  }
  append(node: HTMLElement) {
    this.body.appendChild(node);
  }

  public fill(): void {
    this.append(Header.getInstance().render());
    const main: HTMLElement = createElement(Tags.div, "main");
    this.append(main);
    const goodsWay: HTMLElement = createElement(Tags.section, "goods__way");

    for (let i = 0; i < 7; i++) {
      const breadCrumb: HTMLElement = createElement(Tags.a, "bread__crumb");
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
    const goodsContainer: HTMLElement = createElement(Tags.section, "goods__container");
    main.append(goodsWay, goodsContainer);
    const goodsName: HTMLElement = createElement(Tags.h1, "goods__name");
    const goodsInfo: HTMLElement = createElement(Tags.div, "goods__info");
    goodsContainer.append(goodsName, goodsInfo);
    goodsName.textContent = selectedItem.title;
    const goodsPhotoBLock: HTMLElement = createElement(Tags.div, "goods__photo-block");
    const goodsPhotoMain: HTMLElement = createElement(Tags.div, "goods__photo-main");
    if (selectedItem !== undefined) {
      goodsPhotoMain.style.backgroundImage = `url(${selectedItem.images[0]})`;
    }
    const goodsPhotoList: HTMLElement = createElement(Tags.div, "goods__photo-list");
    goodsPhotoBLock.append(goodsPhotoMain, goodsPhotoList);
    if (selectedItem !== undefined) {
      for (let i = 0; i < selectedItem.images.length; i++) {
        const goodsPhotoListElem: HTMLElement = createElement(Tags.div, "goods__photo-list__elem");
        goodsPhotoList.append(goodsPhotoListElem);
        goodsPhotoListElem.style.backgroundImage = `url(${selectedItem.images[i]})`;
        goodsPhotoListElem.style.cursor = "pointer";
        goodsPhotoListElem.addEventListener("click", function (): void {
          goodsPhotoMain.style.backgroundImage = `url(${selectedItem.images[i]})`;
        });
      }
    }
    const goodsDescriptionBLock: HTMLElement = createElement(Tags.div, "goods__description-block");

    const buyButton: HTMLElement = createElement(Tags.button, "buy__button");
    buyButton.textContent = "BUY NOW";
    const goodsPurchaseBLock: HTMLElement = createElement(Tags.div, "goods__purchase-block");
    const goodsPrice: HTMLElement = createElement(Tags.div, "goods__price");
    goodsPrice.textContent = selectedItem.price.toString() + " $";
    goodsPurchaseBLock.append(goodsPrice, this.chartButton, buyButton);
    goodsInfo.append(goodsPhotoBLock, goodsDescriptionBLock, goodsPurchaseBLock);

    for (let i = 0; i < 6; i++) {
      const charField: HTMLElement = createElement(Tags.div, "char__field");
      const charFieldName: HTMLElement = createElement(Tags.div, "char__field-name");
      const charFieldContent: HTMLElement = createElement(Tags.div, "char__field-content");
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

    if (this.state && String(selectedItem.id) in this.state) {
      this.updateChartButton();
    }

    buyButton.addEventListener("click", () => {
      if (this.state && !(String(selectedItem.id) in this.state)) this.goodToCart();
      window.location.href = "/cart?popup=open";
    });
  }

  private updateChartButton() {
    this.chartButton.textContent = "ALREADY IN THE CART";
    this.chartButton.classList.add("chart__button__added");
  }

  private goodToCart = () => {
    const selectedItem: IGood | undefined = goodsArr.find((item) => item.id === +id);
    if (selectedItem) {
      this.state = { ...this.state, [selectedItem.id]: 1 };
      localStorage.setItem("item", JSON.stringify(this.state));
    }
    Header.getInstance().clearUpdateIcon();
    this.updateChartButton();
  };

  public goodListener() {
    this.chartButton.addEventListener("click", this.goodToCart);
  }
}

const goodsCart = new GoodsCart();
goodsCart.fill();
goodsCart.goodListener();
