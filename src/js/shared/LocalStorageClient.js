import { storage } from "@core/utils.js";

export class LocalStorageClient {
  constructor(name) {
    this.name = `excel:${name}`;
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve()
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);

      setTimeout(() => {
        resolve(state);
      }, 2500);
    });
  }
}
