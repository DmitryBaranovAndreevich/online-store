import { Logo } from "../components/logo/logo";
import logoImage from "../images/logo.png";

const img = new Logo(logoImage as string);
img.render(document.querySelector("body") as HTMLElement);
