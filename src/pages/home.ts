import { Header } from "../components/header/header";

const header = Header.getInstance();
document.querySelector("body")?.appendChild(header.render());
