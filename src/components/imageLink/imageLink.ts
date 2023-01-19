import "./imageLink.css";
import { createElement } from "../../service/createElement";
import { Tags } from "../../interface/tags";

export class ImageLink {
  private link: string;
  private urlToPage: string;
  public size: string;

  constructor(url: string, size: string, urlToPage: string) {
    this.link = url;
    this.size = size;
    this.urlToPage = urlToPage;
  }

  private create() {
    const link = createElement(Tags.a) as HTMLLinkElement;
    link.href = this.urlToPage;
    const img = createElement(Tags.img) as HTMLImageElement;
    img.className = this.size;
    img.src = this.link;
    img.alt = "Logo";
    link.appendChild(img);
    return link;
  }

  public render(container: HTMLElement) {
    container.appendChild(this.create());
  }
}
