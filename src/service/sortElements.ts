import { CheckBoxInFilter } from "../components/checkBox/checkBoxInFilter";
import { SliderFilter } from "../components/sliderFilter/sliderFilter";
import { IGood } from "../interface/good";
import { SortSection } from "../components/sortSection/sortSection";
import { FilterObserver } from "./filterObserver";
import { goods } from "./goods";

export class SortElements {
  private static instance: SortElements | null = null;
  private observer = FilterObserver.getInstance();
  private data;
  private state;
  private types;
  constructor(data = goods.products, types: Array<string> = []) {
    this.data = data;
    this.state = data;
    this.types = types;
  }

  static getInstance(data?: Array<IGood>, types?: Array<string>) {
    if (SortElements.instance === null) {
      SortElements.instance = new SortElements(data, types);
    }

    return SortElements.instance;
  }

  get allGoods() {
    return this.data;
  }

  public addType(type: string) {
    this.types.push(type);
  }

  sort() {
    const visitType: string[] = [];
    this.state = this.data;
    const sliders = this.observer.getSubscribers.filter(({ obj }) => obj instanceof SliderFilter); //ищем фильтры-слайдеры
    const sorts = this.observer.getSubscribers.find(({ obj }) => obj instanceof SortSection); //ищем сортировочный чекбокс
    this.types.forEach((types) => {
      const arrSameType = this.observer.getSubscribers.filter((elem) => {
        visitType.push(elem.type);
        return elem.type === types && (elem.obj as CheckBoxInFilter).checkbox.checked && visitType.includes(elem.type); // ищем другие выделенные чекбоксы, такого же типа
      });
      const arrToFilter = arrSameType.map((elem) => {
        elem.visit = true;
        return (elem.obj as CheckBoxInFilter).text;
      });
      if (arrSameType.length) {
        //если есть, что сортировать, то сортируем
        this.state = this.state.filter((el) => {
          for (const key of arrToFilter) {
            if (Object.values(el).includes(key)) return true;
          }
          return false;
        });
      }
    });
    sliders.forEach((slider) => this.filter(slider.obj as SliderFilter)); // фильтруем по слайдерам
    if (sorts && sorts instanceof SortSection) sorts.updateText(sorts.title.textContent as string);
    this.falueSort(sorts?.obj.title.textContent as string);
    this.observer.updateData(this.state).notify();
    return this.state;
  }

  public filter(slider: SliderFilter) {
    this.state = this.state.filter(
      (el) => el[slider.englishName] >= slider.leftInput.value && el[slider.englishName] < slider.rightInput.value
    );
  }

  public falueSort(text: string) {
    switch (text) {
      case "По возрастанию цены":
        this.falueSortHelper("price", "down");
        // this.label.textContent = "По возрастанию цены";
        break;

      case "По убыванию цены":
        this.falueSortHelper("price", "up");
        // this.label.textContent = "По убыванию цены";
        break;

      case "По возрастанию рейтинга":
        this.falueSortHelper("rating", "down");
        // this.label.textContent = "По возрастанию рейтинга";
        break;

      case "По убыванию рейтинга":
        this.falueSortHelper("rating", "up");
        // this.label.textContent = "По убыванию рейтинга";
        break;

      case "Сортировка":
        break;
    }
  }

  private falueSortHelper(type: "price" | "rating", direction: "up" | "down") {
    const sortArr = this.state.sort((a, b) => a[type] - b[type]);
    if (direction === "up") this.state = sortArr.reverse();
    this.state = sortArr;
  }
}
