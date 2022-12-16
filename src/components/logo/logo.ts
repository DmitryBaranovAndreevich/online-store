import "./logo.css";
import { ImageLink } from "../imageLink/imageLink";
import logoimage from "../../images/logo.png";

export class Logo extends ImageLink {
  constructor() {
    super(logoimage as string, "logo logo_size_default", "/main");
  }
}
