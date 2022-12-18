import { IGood } from "../../interface/good";
import { Tags } from "../../interface/tags";
import { createElement, generateHash, goods } from "../../service";
import { GoodList } from "../goodsList/goodsList";
import "./sliderFilter.css";

export class SliderFilter {
  goodsList;
  container;
  title;
  rightInput;
  leftInput;
  rightSpan;
  leftSpan;
  resultsSpan;
  track;
  min;
  max;
  hash;
  allCount;
  count = 0;
  englishName;

  constructor(name: string, englishName: string, min: string, max: string, allGoods = goods, goodsList: GoodList = GoodList.getInstance()) {
    this.container = createElement(Tags.div, "slider");
    this.title = createElement(Tags.span, "slider__span", name);
    this.rightSpan = createElement(Tags.span, "slider__span");
    this.leftSpan = createElement(Tags.span, "slider__span");
    this.resultsSpan = createElement(Tags.span, "slider__span");
    this.rightInput = createElement(Tags.input, "slider__input") as HTMLInputElement;
    this.leftInput = createElement(Tags.input, "slider__input") as HTMLInputElement;
    this.track = createElement(Tags.div, "slider__track");
    this.min = min;
    this.max = max;
    this.hash = generateHash(name);
    this.allCount = allGoods.products.length;
    this.englishName = englishName as keyof IGood;
    this.goodsList = goodsList;
    goodsList.setSubscribers(this);
  }

  public updateText() {
    const goodsInGoodsList = this.goodsList.getState;
    this.count = goodsInGoodsList.filter((el) => el[this.englishName] >= this.min && el[this.englishName] < this.max).length;
    this.setResults();
  }

  private createResultsContainer() {
    const spanContainer = createElement(Tags.div, "slider__span-container slider__span-container_position_down");
    spanContainer.appendChild(this.resultsSpan);
    this.setResults();
    return spanContainer;
  }

  public setResults() {
    this.resultsSpan.textContent = `Найдено ${this.count} из ${this.allCount}`;
  }

  private createSpanContainer() {
    const spanContainer = createElement(Tags.div, "slider__span-container");
    spanContainer.append(this.title, this.leftSpan, this.rightSpan);
    return spanContainer;
  }

  private setAtributesToInput(input: HTMLInputElement, min: string, max: string, id: string, eventListener: () => void, value = min) {
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.onchange = eventListener;
  }

  private fillColor() {
    const percent1 = (parseInt(this.leftInput.value) / parseInt(this.max)) * 100;
    const percent2 = (parseInt(this.rightInput.value) / parseInt(this.max)) * 100;
    this.track.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  }

  private leftSlider = () => {
    const minGap = 0;
    if (parseInt(this.rightInput.value) - parseInt(this.leftInput.value) <= minGap) {
      this.leftInput.value = `${parseInt(this.rightInput.value) - minGap}`;
    }
    this.leftSpan.textContent = `от ${this.leftInput.value}`;
    this.fillColor();
    this.goodsList.updateState();
    this.filter();
  };

  private rightSlider = () => {
    const minGap = 0;
    if (parseInt(this.rightInput.value) - parseInt(this.leftInput.value) <= minGap) {
      this.rightInput.value = `${parseInt(this.leftInput.value) + minGap}`;
    }
    this.rightSpan.textContent = `до ${this.rightInput.value}`;
    this.fillColor();
    this.goodsList.updateState();
    this.filter();
  };

  public filter() {
    this.goodsList.setState(
      this.goodsList.getState.filter((el) => el[this.englishName] >= this.leftInput.value && el[this.englishName] < this.rightInput.value)
    );
  }

  private createSlider() {
    const sliderContainer = createElement(Tags.div, "slider__input-container");
    this.setAtributesToInput(this.leftInput, this.min, this.max, "slider1", this.leftSlider);
    this.setAtributesToInput(this.rightInput, this.min, this.max, "slider2", this.rightSlider, this.max);
    sliderContainer.append(this.track, this.leftInput, this.rightInput);
    return sliderContainer;
  }

  render() {
    this.container.append(this.createSpanContainer(), this.createSlider(), this.createResultsContainer());
    this.leftSlider();
    this.rightSlider();
    return this.container;
  }
}
