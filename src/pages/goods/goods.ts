import goodsList from "../../components/goods-list";

class goodsCart {
  fill(): void {
    const goodsName: HTMLElement = document.querySelector(".goods__name") as HTMLElement;
    const goodsImage: HTMLElement = document.querySelector(".goods__photo-main") as HTMLElement;

    goodsName.textContent = goodsList[2].name;
    goodsImage.style.backgroundImage = goodsList[2].picture;
  }
}

export default goodsCart;
