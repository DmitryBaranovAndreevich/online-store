import "./checkBoxInFilter.css";
import { Checkbox } from "./checkBox";
import { createElement, goods } from "../../service";
import { Tags } from "../../interface/tags";
import { GoodList } from "../goodsList/goodsList";
import { IGood } from "../../interface/good";
import { SliderFilter } from "../sliderFilter/sliderFilter";

export class CheckBoxInFilter extends Checkbox {
  private goodsList;
  private comment;
  private count;
  private allcount;
  private type;
  private allGoods;
  constructor(text: string, count: number, type?: string, goodsList: GoodList = GoodList.getInstance(), allgoods = goods) {
    super(text, "checkBox__input");
    this.count = count;
    const allCount = allgoods.products.filter((el) => Object.values(el).includes(text)).length;
    this.allcount = allCount;
    const comment = createElement(Tags.p, `numbers_${this.hash}`, `${count}/${allCount}`);
    this.comment = comment;
    this.container.appendChild(comment);
    this.goodsList = goodsList;
    this.type = type;
    this.allGoods = allgoods;
    goodsList.setSubscribers({ obj: this, visit: false, type: this.type as string });
  }

  public addEventListener() {
    this.checkbox.addEventListener("change", this.handelClick);
  }

  private handelClick = () => {
    this.addClick();
  };

  public updateGoodsList = () => {
    if (this.checkbox.checked) this.addClick();
    else this.removeClick();
  };

  private removeClick() {
    this.goodsList.updateState();
  }

  public addClick() {
    const sliders = this.goodsList.subscribers.filter(({ obj }) => obj instanceof SliderFilter); //ищем фильтры-слайдеры
    this.goodsList.setState(this.allGoods.products);
    const arrMyType = this.goodsList.subscribers.filter(
      (elem) => elem.type === this.type && (elem.obj as CheckBoxInFilter).checkbox.checked // ищем другие чекбоксы, такого же типа
    );
    const arrToFilter = arrMyType.map((elem) => (elem.obj as CheckBoxInFilter).text);
    if (arrMyType.length) {
      //если есть, что сортировать, то сортируем
      const sortArr = this.goodsList.getState.filter((el) => {
        for (const key of arrToFilter) {
          if (Object.values(el).includes(key)) return true;
        }
        return false;
      });
      sliders.forEach((slider) => (slider.obj as SliderFilter).filter()); // фильтруем по слайдерам
      this.goodsList.setState(sortArr);
    }
  }

  public updateText() {
    this.count = this.goodsList.getState.filter(this.filter).length;
    this.comment.textContent = `${this.count}/${this.allcount}`;
  }

  private filter = (el: IGood) => {
    return Object.values(el).includes(this.text);
  };
}
