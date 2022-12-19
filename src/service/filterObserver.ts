import { CheckBoxInFilter } from "../components/checkBox/checkBoxInFilter";
import { GoodList } from "../components/goodsList/goodsList";
import { SliderFilter } from "../components/sliderFilter/sliderFilter";
import { SortSection } from "../components/sortSection/sortSection";
import { IGood } from "../interface/good";
import { goods } from "./goods";

export class FilterObserver {
  private static instance: FilterObserver | null = null;
  private view = GoodList.getInstance();
  private listeners: Array<{ obj: CheckBoxInFilter | SliderFilter | SortSection; type: string; visit: boolean }>;
  private data;
  constructor(data: Array<IGood>) {
    this.data = data;
    this.listeners = [];
  }

  static getInstance() {
    if (FilterObserver.instance === null) {
      FilterObserver.instance = new FilterObserver(goods.products);
    }

    return FilterObserver.instance;
  }

  public subscribe(data: { obj: CheckBoxInFilter | SliderFilter | SortSection; type: string; visit: boolean }) {
    this.listeners.push(data);
  }

  public updateData(data: Array<IGood>) {
    this.data = data;
    return this;
  }

  get getSubscribers() {
    return this.listeners;
  }

  public notify() {
    this.listeners.forEach(({ obj }) => {
      if (!(obj instanceof SortSection)) obj.updateText(this.data);
    });
    this.view.updateRender(this.data);
  }
}
