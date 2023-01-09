import "./footer.css";
import { Tags } from "../../interface/tags";
import { createElement } from "../../service";

export class Footer {
  private static instance: Footer | null = null;
  private container = createElement(Tags.footer, "footer");
  private githubContainer: HTMLDivElement;
  private githubLinkFirst: HTMLElement;
  private githubLinkSecond: HTMLElement;
  private dateContainer: HTMLDivElement;
  private rsContainer: HTMLDivElement;
  private githubDima: HTMLDivElement;
  private githubTema: HTMLDivElement;
  private rsLink: HTMLElement;

  constructor() {
    this.githubContainer = createElement(Tags.div, "github__container") as HTMLDivElement;
    this.githubLinkFirst = createElement(Tags.a, "link__container");
    this.githubLinkSecond = createElement(Tags.a, "link__container");
    this.dateContainer = createElement(Tags.div, "date__container", "Created: 2023") as HTMLDivElement;
    this.githubDima = createElement(Tags.div, "github-dima") as HTMLDivElement;
    this.githubTema = createElement(Tags.div, "github-tema") as HTMLDivElement;
    this.rsContainer = createElement(Tags.div, "rs__container") as HTMLDivElement;
    this.rsLink = createElement(Tags.a, "link__container");
  }

  static getInstanceFooter() {
    if (Footer.instance === null) {
      Footer.instance = new Footer();
    }
    return Footer.instance;
  }

  public footerRender() {
    this.container.append(this.githubContainer, this.dateContainer, this.rsContainer);
    this.githubLinkFirst.addEventListener("click", () => {
      window.location.href = "https://github.com/DmitryBaranovAndreevich";
    });
    this.githubLinkFirst.append(this.githubDima);
    this.githubLinkSecond.addEventListener("click", () => {
      window.location.href = "https://github.com/harry177";
    });
    this.githubLinkSecond.append(this.githubTema);
    this.githubContainer.append(this.githubLinkFirst, this.githubLinkSecond);
    this.rsLink.addEventListener("click", () => {
      window.location.href = "https://rs.school/js/";
    });
    this.rsContainer.append(this.rsLink);
    return this.container;
  }
}
