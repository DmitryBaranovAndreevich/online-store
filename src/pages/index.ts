import Router from "../service/router";

window.location.href = "/main";
Router.modules
  .Home()
  .then(() => console.log("Hу"))
  .catch((e) => console.log(e));
Router.modules
  .Test()
  .then(() => console.log("Hi"))
  .catch((e) => console.log(e));
