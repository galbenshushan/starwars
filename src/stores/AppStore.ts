import { makeObservable, observable, action } from "mobx";

class AppStore {
  @observable loading: boolean = false;
  constructor() {
    makeObservable(this);
  }

  @action setLoading = (isLoading: boolean) => {
    this.loading = isLoading;
  };
}

export const appStore = new AppStore();
