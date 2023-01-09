export class UrlHandler {
  url: string;
  constructor() {
    this.url = document.location.hostname;
  }

  public isParams() {
    return document.location.search.substring(1);
  }

  public searchParams(key: string) {
    if (document.location.search) {
      const params = document.location.search.substring(1).split("&");
      let i = params.length;
      while (i--) {
        const x = params[i].split("=");
        if (x[0] == key) return x[1];
      }
    }
    return false;
  }

  public deleteParams(key: string) {
    const params = document.location.search.substring(1).split("&");
    let i = params.length;
    while (i--) {
      const x = params[i].split("=");
      if (x[0] == key) break;
    }
    const part1 = params.slice(0, i).join("&");
    const part2 = params.slice(i + 1).join("&");
    const insert = `?${part1.length ? `${part1}&${part2}` : `${part2}`}`;
    window.history.pushState({ path: insert }, "", insert);
  }

  public insertParam(key: string, value: string) {
    const params = document.location.search.substring(1).split("&");
    if (!document.location.search) {
      const insert = "?" + key + "=" + value;
      window.history.pushState({ path: insert }, "", insert);
    } else {
      let i = params.length;
      while (i--) {
        const x = params[i].split("=");
        if (String(x[0]) == String(key)) {
          x[1] = value;
          params[i] = x.join("=");
          break;
        }
      }

      if (i <= 0) {
        params[params.length] = [key, value].join("=");
      }
      const insert = "?" + params.join("&");
      window.history.pushState({ path: insert }, "", insert);
    }
  }
}
