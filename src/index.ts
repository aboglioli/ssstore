interface Store {
  mod: string;
  data: { [key: string]: any };
  stores: Store[];

  set_v(mod: string, key: string, value: any): boolean;
  get_v(key: string): any;

}

class RootStore implements Store {
  mod: string;
  data: { [key: string]: any };
  stores: Store[];

  constructor(mod: string) {
    this.mod = mod;
    this.data = {};
    this.stores = [];
  }

  set_v(mod: string, key: string, value: any): boolean {
    if (this.mod == mod) {
      this.data[key] = value;
      return true;
    }

    for (let store of this.stores) {
      const res = store.set_v(mod, key, value);
      if (res) {
        return true;
      }
    }

    return false;
  }

  get_v(key: string): any {
    const value = this.data[key];
    if (value) {
      return value;
    }

    for (let store of this.stores) {
      const res = store.get_v(key);
      if (res) {
        return res;
      }
    }

    return null;
  }
}

const users = new RootStore("users");
const store = new RootStore("root");
store.stores = [users];
store.set_v("users", "logged-in-user", "pepe");
const user = store.get_v("logged-in-user");
console.log("Response: ", user);
