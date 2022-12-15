import "../vender/normalize.css";
import Router from "../service/router";

console.log("tets");
window.location.href = "/main";
Router.modules
  .Home()
  .then(() => console.log("y"))
  .catch((e) => console.log(e));
Router.modules
  .Test()
  .then(() => console.log("y"))
  .catch((e) => console.log(e));
