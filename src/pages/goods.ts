import "./goods.css";
import "./home.css";
import goodsList from "../components/goods-list";
import { Header } from "../components/header/header";
import { createElement } from "../service";

class GoodsCart {
  body;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
  }
  append(node: HTMLElement) {
    this.body.appendChild(node);
  }

  fill(): void {
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
      } else if (i === 2) {
        breadCrumb.textContent = goodsList[2].category.toUpperCase();
        breadCrumb.style.cursor = "pointer";
        breadCrumb.onclick = () => {
          window.location.href = "#";
        };
      } else if (i === 4) {
        breadCrumb.textContent = goodsList[2].brand.toUpperCase();
        breadCrumb.style.cursor = "pointer";
        breadCrumb.onclick = () => {
          window.location.href = "#";
        };
      } else if (i === 6) {
        breadCrumb.textContent = goodsList[2].name.toUpperCase();
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
    goodsName.textContent = goodsList[2].name;
    const goodsPhotoBLock: HTMLElement = createElement("div", "goods__photo-block");
    const goodsPhotoMain: HTMLElement = createElement("div", "goods__photo-main");
    goodsPhotoMain.style.backgroundImage = goodsList[2].picture;
    const goodsPhotoList: HTMLElement = createElement("div", "goods__photo-list");
    goodsPhotoBLock.append(goodsPhotoMain, goodsPhotoList);
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
      if (charField === goodsDescriptionBLock.children[0] && upperField !== null && lowerField !== null) {
        upperField.textContent = "Description";
        lowerField.textContent = goodsList[2].description;
      } else if (charField === goodsDescriptionBLock.children[1] && upperField !== null && lowerField !== null) {
        upperField.textContent = "Discount";
        lowerField.textContent = goodsList[2].discount.toString();
      } else if (charField === goodsDescriptionBLock.children[2] && upperField !== null && lowerField !== null) {
        upperField.textContent = "Rating";
        lowerField.textContent = goodsList[2].rating.toString();
      } else if (charField === goodsDescriptionBLock.children[3] && upperField !== null && lowerField !== null) {
        upperField.textContent = "Stock";
        lowerField.textContent = goodsList[2].stock.toString();
      } else if (charField === goodsDescriptionBLock.children[4] && upperField !== null && lowerField !== null) {
        upperField.textContent = "Brand";
        lowerField.textContent = goodsList[2].brand;
      } else if (charField === goodsDescriptionBLock.children[5] && upperField !== null && lowerField !== null) {
        upperField.textContent = "Category";
        lowerField.textContent = goodsList[2].category;
      }
    }

    const goodsPrice: HTMLElement = createElement("div", "goods__price");
    goodsPrice.textContent = goodsList[2].price.toString() + " $";
    const chartButton: HTMLElement = createElement("button", "chart__button");
    chartButton.textContent = "ADD TO CHART";
    const buyButton: HTMLElement = createElement("button", "buy__button");
    buyButton.textContent = "BUY NOW";
    goodsPurchaseBLock.append(goodsPrice, chartButton, buyButton);
  }
}

const goodsCart = new GoodsCart();
goodsCart.fill();
