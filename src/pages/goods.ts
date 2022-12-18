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
    main.append(goodsWay);
    const goodsContainer: HTMLElement = createElement("section", "goods__container");
    main.append(goodsContainer);
    const goodsName: HTMLElement = createElement("h1", "goods__name");
    goodsContainer.append(goodsName);
    goodsName.textContent = goodsList[2].name;
    const goodsInfo: HTMLElement = createElement("div", "goods__info");
    goodsContainer.append(goodsInfo);
    const goodsPhotoBLock: HTMLElement = createElement("div", "goods__photo-block");
    goodsInfo.append(goodsPhotoBLock);
    const goodsPhotoMain: HTMLElement = createElement("div", "goods__photo-main");
    goodsPhotoBLock.append(goodsPhotoMain);
    goodsPhotoMain.style.backgroundImage = goodsList[2].picture;
    const goodsPhotoList: HTMLElement = createElement("div", "goods__photo-list");
    goodsPhotoBLock.append(goodsPhotoList);
    const goodsDescriptionBLock: HTMLElement = createElement("div", "goods__description-block");
    goodsInfo.append(goodsDescriptionBLock);

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

    const goodsPurchaseBLock: HTMLElement = createElement("div", "goods__purchase-block");
    goodsInfo.append(goodsPurchaseBLock);
    const goodsPrice: HTMLElement = createElement("div", "goods__price");
    goodsPurchaseBLock.append(goodsPrice);
    goodsPrice.textContent = goodsList[2].price.toString() + " $";
    const chartButton: HTMLElement = createElement("button", "chart__button");
    goodsPurchaseBLock.append(chartButton);
    chartButton.textContent = "ADD TO CHART";
    const buyButton: HTMLElement = createElement("button", "buy__button");
    goodsPurchaseBLock.append(buyButton);
    buyButton.textContent = "BUY NOW";
  }
}

const goodsCart = new GoodsCart();
goodsCart.fill();
