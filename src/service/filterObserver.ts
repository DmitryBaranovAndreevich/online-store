import { CheckBoxInFilter } from "../components/checkBox/checkBoxInFilter";
import { GoodList } from "../components/goodsList/goodsList";
import { SliderFilter } from "../components/sliderFilter/sliderFilter";
import { SortSection } from "../components/sortSection/sortSection";
import { IGood } from "../interface/good";
import { goods } from "./goods";
import { SortElements } from "./sortElements";

export class FilterObserver {
  private static instance: FilterObserver | null = null;
  private view = GoodList.getInstance();
  private listeners: Array<{ obj: CheckBoxInFilter | SliderFilter | SortSection; type: string; visit: boolean }>;
  private data;
  private input: HTMLInputElement | null = null;
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

  set textInput(input: HTMLInputElement) {
    this.input = input;
  }

  get getSubscribers() {
    return this.listeners;
  }

  public setIconsSize(size: string) {
    GoodList.getInstance().setSize(size);
    const sorter = SortElements.getInstance();
    if (this.input) {
      const text = this.input.value;
      if (text !== "") {
        sorter.search(text);
      } else sorter.sort();
    } else {
      sorter.sort();
    }
  }

  public notify() {
    this.listeners.forEach(({ obj }) => {
      if (!(obj instanceof SortSection)) obj.updateText(this.data);
    });
    this.view.updateRender(this.data);
  }
}
