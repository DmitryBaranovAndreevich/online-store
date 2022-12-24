const _modules = {
  Home: () => import("../pages/home"),
};
export default class Router {
  static get modules() {
    return _modules;
  }
}
