export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get param() {
    return this.path.split("/")[1];
  }

  static get action() {
    return this.path.split("/")[0];
  }

  static navigate(path) {
    window.location.hash = path;
  }
}
