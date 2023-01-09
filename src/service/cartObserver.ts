import { GoodList } from "../components/goodsList/goodsList";
import { IGood } from "../interface/good";
import { Cart } from "../pages/cart";
import { goods } from "./goods";

export class CartObserver {
  state: { [key: string]: number } = {};

  private subscribers: GoodList | Cart | null = null;

  constructor() {
    this.state = JSON.parse(localStorage.getItem("item") as string) as { [key: string]: number };
  }

  public subscribe(obj: GoodList | Cart) {
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
    if (this.state[id] === 1) {
      delete this.state[id];
    } else {
      this.state = { ...this.state, [id]: this.state[id] - 1 };
    }
    this.notify();
  }

  public setState() {
    if (this.state !== null) {
      return Array.from(Object.keys(this.state)).map((id) => {
        const good = goods.products.find((good) => good.id === Number(id)) as IGood;
        return { ...good, volume: this.state[id] };
      });
    }
    return null;
  }

  public notify() {
    localStorage.setItem("item", JSON.stringify(this.state));
    this.subscribers?.updateRender();
  }
}
