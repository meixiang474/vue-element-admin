import { Module, MutationTree, ActionTree, Action } from "vuex";
import variables from "@/styles/variables.scss";
import { RootState } from "../index";
import * as actionTypes from "../constants";

export interface SettingsState {
  theme: string;
  originalStyle: string;
}

type ValueOf<T> = T[keyof T];

interface Settings {
  key: keyof SettingsState;
  value: ValueOf<SettingsState>;
}

const mutations: MutationTree<SettingsState> = {
  [actionTypes.CHANGE_SETTINGS]: (state, { key, value }: Settings) => {
    if (key in state) {
      state[key] = value;
    }
  },
};

const actions: ActionTree<SettingsState, RootState> = {
  [actionTypes.CHANGE_SETTINGS]({ commit }, payload: Settings) {
    commit(actionTypes.CHANGE_SETTINGS, payload);
  },
};

const settings: Module<SettingsState, RootState> = {
  namespaced: true,
  state: {
    theme: variables.theme,
    originalStyle: "",
  },
  mutations,
  actions,
};

export default settings;
