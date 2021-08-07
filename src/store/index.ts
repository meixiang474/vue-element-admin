import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import app, { AppState } from "./modules/app";
import tagsView, { TagsViewState } from "./modules/tagsView";
import getters from "./getters";

export interface RootState {
  app: AppState;
  tagsView: TagsViewState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const persistedAppState = createPersistedState({
  storage: window.sessionStorage,
  key: "vuex_app",
  paths: ["app.sidebar.opened", "app.size"],
});

export default createStore<RootState>({
  plugins: [persistedAppState],
  getters,
  modules: {
    app,
    tagsView,
  },
});

export const useStore = () => baseUseStore<RootState>(key);
