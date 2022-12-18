import "./checkBoxInFilter.css";
import { Checkbox } from "./checkBox";
import { createElement, goods } from "../../service";
import { Tags } from "../../interface/tags";
import { GoodList } from "../goodsList/goodsList";
import { IGood } from "../../interface/good";

export class CheckBoxInFilter extends Checkbox {
  private goodsList;
  private comment;
  private count;
  private allcount;
  constructor(text: string, count: number, goodsList: GoodList = GoodList.getInstance(), allgoods = goods) {
    super(text, "checkBox__input");
    this.count = count;
    const allCount = allgoods.products.filter((el) => Object.values(el).includes(text)).length;
    this.allcount = allCount;
    const comment = createElement(Tags.p, `numbers_${this.hash}`, `${count}/${allCount}`);
    this.comment = comment;
    this.container.appendChild(comment);
    this.goodsList = goodsList;
    goodsList.setSubscribers(this);
  }

  public addEventListener() {
    this.checkbox.addEventListener("change", this.handelClick);
  }

  private handelClick = () => {
    this.updateGoodsList();
  };

  public updateGoodsList = () => {
    if (this.checkbox.checked) this.addClick();
    else this.removeClick();
  };

  private removeClick() {
    this.goodsList.updateState();
  }

  public addClick() {
    const sortArr = this.goodsList.getState.filter(this.filter);
    this.goodsList.setState(sortArr);
  }

  public updateText() {
    this.count = this.goodsList.getState.filter(this.filter).length;
    this.comment.textContent = `${this.count}/${this.allcount}`;
  }

  private filter = (el: IGood) => {
    return Object.values(el).includes(this.text);
  };
}
