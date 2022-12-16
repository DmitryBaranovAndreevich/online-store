const _modules = {
  Home: () => import("../pages/home"),
  Test: () => import("../pages/test"),
};
export default class Router {
  static get modules() {
    return _modules;
  }
}
