import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "../index";
import * as actionTypes from "../constants";
import { Size } from "@/plugins/element";

export interface AppState {
  sidebar: {
    opened: boolean;
  };
  size: Size;
}

const mutations: MutationTree<AppState> = {
  [actionTypes.TOGGLE_SIDEBAR](state) {
    state.sidebar.opened = !state.sidebar.opened;
  },
  [actionTypes.SET_SIZE](state, payload: Size) {
    state.size = payload;
  },
};

const actions: ActionTree<AppState, RootState> = {
  [actionTypes.TOGGLE_SIDEBAR]({ commit }) {
    commit(actionTypes.TOGGLE_SIDEBAR);
  },
  [actionTypes.SET_SIZE]({ commit }, payload: Size) {
    commit(actionTypes.SET_SIZE, payload);
  },
};

const app: Module<AppState, RootState> = {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
    },
    size: "medium",
  },
  mutations,
  actions,
};

export default app;
