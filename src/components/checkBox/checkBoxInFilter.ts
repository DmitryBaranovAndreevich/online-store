import "./checkBoxInFilter.css";
import { Checkbox } from "./checkBox";
import { createElement } from "../../service";
import { Tags } from "../../interface/tags";
import { IGood } from "../../interface/good";
import { FilterObserver } from "../../service/filterObserver";
import { SortElements } from "../../service/sortElements";

export class CheckBoxInFilter extends Checkbox {
  private comment;
  private count;
  private allcount;
  private type;
  private observer;
  private sorter;
  constructor(text: string, count: number, type?: string, observer = FilterObserver.getInstance(), sorter = SortElements.getInstance()) {
    super(text, "checkBox__input");
    this.count = count;
    const allCount = sorter.allGoods.filter((el) => Object.values(el).includes(text)).length;
    this.allcount = allCount;
    const comment = createElement(Tags.p, `numbers_${this.hash}`, `${count}/${allCount}`);
    this.comment = comment;
    this.container.appendChild(comment);
    this.type = type;
    this.sorter = sorter;
    this.observer = observer;
    this.observer.subscribe({ obj: this, visit: false, type: this.type as string });
  }

  public addEventListener() {
    this.checkbox.addEventListener("change", this.handelClick);
    return this;
  }

  private handelClick = () => {
    SortElements.getInstance().sort();
  };

  public updateText(data: Array<IGood>) {
    this.count = data.filter(this.filter).length;
    this.comment.textContent = `${this.count}/${this.allcount}`;
  }

  private filter = (el: IGood) => {
    return Object.values(el).includes(this.text);
  };
}
