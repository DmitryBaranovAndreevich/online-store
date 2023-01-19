import "./checkBoxInFilter.css";
import { Checkbox } from "./checkBox";
import { createElement } from "../../service";
import { Tags } from "../../interface/tags";
import { IGood } from "../../interface/good";
import { FilterObserver } from "../../service/filterObserver";
import { SortElements } from "../../service/sortElements";
import { UrlHandler } from "../../service/urlHandler";

export class CheckBoxInFilter extends Checkbox {
  private comment;
  private count;
  private allcount;
  private type;
  private urlHandler;
  constructor(text: string, count: number, urlHandler: UrlHandler, type?: string) {
    super(text, "checkBox__input");
    this.count = count;
    const allCount = SortElements.getInstance().allGoods.filter((el) => Object.values(el).includes(text)).length;
    this.allcount = allCount;
    const comment = createElement(Tags.p, `numbers_${this.hash}`, `${count}/${allCount}`);
    this.comment = comment;
    this.container.appendChild(comment);
    this.type = type;
    this.urlHandler = urlHandler;
    FilterObserver.getInstance().subscribe({ obj: this, visit: false, type: this.type as string });
  }

  public addEventListener() {
    this.checkbox.addEventListener("change", this.handelClick);
    return this;
  }

  private handelClick = (e: Event) => {
    const checkbox = e.target as HTMLInputElement;
    const checked = checkbox.checked;
    if (checked) {
      this.urlHandler.insertParam(checkbox.id, String(checked));
    } else {
      this.urlHandler.deleteParams(checkbox.id);
    }
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
