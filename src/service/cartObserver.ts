import { GoodList } from "../components/goodsList/goodsList";
import { Cart } from "../pages/cart";
import { goods } from "./goods";

interface IArray {
  id: number;
  volume: number;
}

export class CartObserver {
  state: Array<IArray> = []; // здесь будем хранить состояние корзины
  subscribers: GoodList | Cart | null; // корзина и блок товаров - это разные страницы, соответственно мы не никогда не сможем здесь иметь
  // одновременно 2 класса , либо один, либо другой, при открытии каждой страницы каждый раз здесь будет новый обьект
  constructor() {
    this.subscribers = null;
    if (localStorage.getItem("item") !== null) {
      this.state = JSON.parse(localStorage.getItem("item") as string) as IArray[];
    } else {
      this.state = [];
    }
  }

  public subscribe(obj: GoodList | Cart) {
    // в конструкторе каждого класса нужно будет добавить
    this.subscribers = obj;
  }

  /*public addElement(id: number) {
    this.state.push(); // добавляем элемент в
    this.notify();
  }*/

  public increase(id: number) {
    this.state = this.state.map((good) => {
      console.log(good.id === id);
      return good.id === id ? { ...good, volume: ++good.volume } : good;
    }); // увеличиваем элемент с нужным id на 1
    this.notify();
  }

  public decrease(id: number) {
    this.state = this.state.map((good) => {
      console.log(good.id === id);
      return good.id === id ? { ...good, volume: --good.volume } : good;
    });
    this.state.forEach((good) => {
      if (good.volume < 1) {
        this.state.splice(this.state.indexOf(good), 1);
      }
    });
    // если volume > 1 то уменьшаем, иначе удаляем
    this.notify();
  }

  public notify() {
    localStorage.setItem("item", JSON.stringify(this.state)); // добавляем массив в локал сторедж
    if (this.subscribers !== null) {
      // если this.subscribers !== null, то вызываем у него метод перерисовки, соответственно каждому классу нужно добавить метод , котрый удалит все товары и отрисует их заново
      this.subscribers.updateRender(goods.products);
    }
    // у goodsList такой метод есть  - updateRender добавь такой же и для своего
    console.log(this.state);
  }
}
// для GoodList и Cart надо добавить поля, которые будут инициализироваться в конструкторе и получать из локал сторедж наш state: Array<IArray>
