import { GoodList } from "../components/goodsList/goodsList";
import { IGood } from "../interface/good";
import { Cart } from "../pages/cart";
import { goods } from "./goods";

export class CartObserver {
  state: { [key: string]: number } = {}; // здесь будем хранить состояние корзины
  private subscribers: GoodList | Cart | null = null; // корзина и блок товаров - это разные страницы, соответственно мы не никогда не сможем здесь иметь
  // одновременно 2 класса , либо один, либо другой, приоткрытии каждой страницы каждый раз здесь будет новый обьект
  constructor() {
    this.state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
    console.log(this.state);
  }

  public subscribe(obj: GoodList | Cart) {
    // в конструкторе каждого класса нужно будет добавить
    this.subscribers = obj;
  }

  public addElement(id: number) {
    this.state = { ...this.state, [id]: 1 };
    this.notify();
  }

  public increase(id: number) {
    this.state = { ...this.state, [id]: this.state[id] + 1 };
    this.notify();
  }

  public decrease(id: number) {
    console.log("tets");
    if (this.state[id] === 1) {
      delete this.state[id];
    } else {
      this.state = { ...this.state, [id]: this.state[id] - 1 };
    }
    this.notify();
  }

  public notify() {
    console.log(this.state);
    localStorage.setItem("item", JSON.stringify(this.state));
    const renderArr = Array.from(Object.keys(this.state)).map((id) => {
      const good = goods.products.find((good) => good.id === Number(id)) as IGood;
      return { ...good, volume: this.state[id] };
    });
    console.log(this.subscribers instanceof GoodList, renderArr);
    if (this.subscribers instanceof GoodList) this.subscribers.updateRender();
    else this.subscribers?.updateRender(renderArr);
  }
}
