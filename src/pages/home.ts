import "./home.css";
import { Header } from "../components/header/header";
import { ImageLink } from "../components/imageLink/imageLink";
import { IPage } from "../interface/iPage";
import { Filters } from "../components/filters/filters";
import diskountBanerImage from "../images/discountsBaner.jpg";
import { brands, categories, createElement } from "../service";
import { GoodList } from "../components/goodsList/goodsList";
import { SortSection } from "../components/sortSection/sortSection";
import { Tags } from "../interface/tags";

const testArr = [
  { name: "Бренд", items: brands },
  { name: "Тип", items: categories },
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
    const filter = new Filters(testArr).render();
    const header = Header.getInstance().render();
    const goodsList = GoodList.getInstance();
    const sortSection = new SortSection();
    const wrapper = createElement(Tags.div, "home__goods-wrapper");
    wrapper.append(sortSection.render(), goodsList.render()); // добавляем блок с карточками товаров и шапку с поиском и сортировкой
    this.append(header); // добавляем header
    diskountBanner.render(this.body); // добавляем банер со скидками
    const mainContent = createElement("div", "home__main-content");
    this.append(mainContent);
    mainContent.append(filter, wrapper); // добавляем блок с фильтрами
  }
}

const mainPage = new MainPage();
mainPage.render();
