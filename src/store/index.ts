import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import app, { AppState } from "./modules/app";
import tagsView, { TagsViewState } from "./modules/tagsView";
import settings, { SettingsState } from "./modules/settings";
import getters from "./getters";

export interface RootState {
  app: AppState;
  tagsView: TagsViewState;
  settings: SettingsState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const persistedAppState = createPersistedState({
  storage: window.sessionStorage,
  key: "vuex_app",
  paths: ["app.sidebar.opened", "app.size"],
});

const persistedSettingsState = createPersistedState({
  storage: window.sessionStorage,
  key: "vuex_settings",
  paths: ["settings.theme", "settings.originalStyle"],
});

export default createStore<RootState>({
  plugins: [persistedAppState, persistedSettingsState],
  getters,
  modules: {
    app,
    tagsView,
    settings,
  },
});

export const useStore = () => baseUseStore<RootState>(key);
