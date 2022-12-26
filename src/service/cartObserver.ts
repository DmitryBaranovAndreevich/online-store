import { GoodList } from "../components/goodsList/goodsList";
import { Cart } from "../pages/cart";

interface IArray {
  id: number;
  volume: number;
}

export class CartObserver {
  state: Array<IArray> = []; // здесь будем хранить состояние корзины
  subscribers: GoodList|Cart|null; // корзина и блок товаров - это разные страницы, соответственно мы не никогда не сможем здесь иметь
                                   // одновременно 2 класса , либо один, либо другой, приоткрытии каждой страницы каждый раз здесь будет новый обьект
  constructor() {
    this.subscribers = null;
    // инициализируем стейт, если в локал сторедж что-то есть, то записываем, если нет , то null
  }

  public subscribe(obj: GoodList|Cart) { // в конструкторе каждого класса нужно будет добавить
    this.subscribers = obj;
  }

  public addElement(id: number) {
    // добавляем элемент в
    this.notify();
  }

  public increase(id: number) {
    // увеличиваем элемент с нужным id на 1
    this.notify()
  }

  public decrease(id: number) {
    // если volume > 1 то уменьшаем, иначе удаляем
    this.notify();
  }

  public notify() {
    // добавляем массив в локал сторедж
    // если this.subscribers !== null, то вызываем у него метод перерисовки, соответственно каждому классу нужно добавить метод , котрый удалит все товары и отрисует их заново
   // у goodsList такой метод есть  - updateRenderб добавь такой же и для своего
  }
}
// для GoodList и Cart надо добавить поля, которые будут инициализироваться в конструкторе и получать из локал сторедж наш state: Array<IArray>