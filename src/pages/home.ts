import "./home.css";
import { Header } from "../components/header/header";
import { ImageLink } from "../components/imageLink/imageLink";
import { IPage } from "../interface/iPage";
import { Filters } from "../components/filters/filters";
import diskountBanerImage from "../images/discountsBaner.jpg";
import { createElement } from "../service";

const testArr = [
  { name: "Бренд", items: ["Sony", "Apple", "Asus"] },
  { name: "Тип", items: ["Игровой", "Портативный", "Рабочий"] },
  { name: "Бренд", items: ["Sony", "Apple", "Asus"] },
  { name: "Тип", items: ["Игровой", "Портативный", "Рабочий"] },
];

class MainPage implements IPage {
  body;
  constructor() {
    this.body = document.querySelector("body") as HTMLElement;
  }

  append(node: HTMLElement) {
    this.body.appendChild(node);
  }

  render() {
    const diskountBanner = new ImageLink(diskountBanerImage as string, "home__diskountBanner", "#");
    this.append(Header.getInstance().render()); // добавляем header
    diskountBanner.render(this.body); // добавляем банер со скидками
    const mainContent = createElement("div", "home__main-content");
    this.append(mainContent);
    const filter = new Filters(testArr).render();
    mainContent.appendChild(filter);
  }
}

const mainPage = new MainPage();
mainPage.render();
