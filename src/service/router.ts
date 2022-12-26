const _modules = {
  Home: () => import("../pages/home"),
  Goods: () => import("../pages/goods"),
  Popup: () => import("../pages/popup"),
};
export default class Router {
  static get modules() {
    return _modules;
  }
}
