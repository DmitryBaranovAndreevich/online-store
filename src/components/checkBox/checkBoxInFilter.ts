import "./checkBoxInFilter.css";
import { Checkbox } from "./checkBox";
import { createElement, goods } from "../../service";
import { Tags } from "../../interface/tags";
import { GoodList } from "../goodsList/goodsList";

export class CheckBoxInFilter extends Checkbox {
  private goodsList;
  constructor(text: string, count: number, goodsList: GoodList = GoodList.getInstance(), allgoods = goods) {
    super(text, "checkBox__input");
    const allCount = allgoods.products.filter((el) => Object.values(el).includes(text)).length;
    this.container.appendChild(createElement(Tags.p, `numbers_${this.hash}`, `${count}/${allCount}`));
    this.goodsList = goodsList;
    goodsList.setSubscribers(this);
  }
}
