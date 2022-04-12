class LocalStorage {
  constructor(name) {
    this.name = name;
  }
  getLocalToken() {
    const token = window.localStorage.getItem(this.name);
    return JSON.parse(token);
  }
  setLocalToken(data) {
    window.localStorage.setItem(this.name, JSON.stringify(data));
  }
}

export const role = new LocalStorage("roles");

export const auth = new LocalStorage("auth");
