import "./logo.css";

export class Logo {
  private link: string;
  public size: string;

  constructor(url: string, size = "default") {
    this.link = url;
    this.size = size;
  }

  private create() {
    const img = document.createElement("img");
    img.className = `logo logo_size_${this.size}`;
    img.src = this.link;
    img.alt = "Logo";
    return img;
  }

  public render(container: HTMLElement) {
    container.appendChild(this.create());
  }
}
