import { RouteLocationNormalized, RouteRecordName } from "vue-router";
import { ActionTree, MutationTree, Module } from "vuex";
import { RootState } from "../index";
import * as actionTypes from "../constants";

export interface TagsViewState {
  visitedViews: RouteLocationNormalized[];
  cachedViews: RouteRecordName[];
}

const mutations: MutationTree<TagsViewState> = {
  [actionTypes.ADD_VISITED_VIEW](state, payload: RouteLocationNormalized) {
    if (state.visitedViews.some((v) => v.path === payload.path)) return;
    state.visitedViews.push(
      Object.assign({}, payload, {
        title: payload.meta.title || "tag-name",
      })
    );
  },
  [actionTypes.DEL_VISITED_VIEW](state, payload: RouteLocationNormalized) {
    state.visitedViews = state.visitedViews.filter(
      (item) => item.path !== payload.path
    );
  },
  [actionTypes.ADD_CACHED_VIEW](state, payload: RouteLocationNormalized) {
    if (state.cachedViews.includes(payload.name!)) return;
    if (!payload.meta || !payload.meta.noCache) {
      state.cachedViews.push(payload.name!);
    }
  },
  [actionTypes.DEL_CACHED_VIEW](state, payload: RouteLocationNormalized) {
    state.cachedViews = state.cachedViews.filter(
      (item) => item !== payload.name
    );
  },
  [actionTypes.DEL_ALL_CACHED_VIEWS](state) {
    state.cachedViews = [];
  },
  [actionTypes.DEL_ALL_VISITED_VIEWS](state) {
    state.visitedViews = state.visitedViews.filter(
      (item) => item.meta && item.meta.affix
    );
  },
  [actionTypes.DEL_OTHERS_VISITED_VIEWS](
    state,
    payload: RouteLocationNormalized
  ) {
    state.visitedViews = state.visitedViews.filter(
      (item) => item.meta.affix || item.path === payload.path
    );
  },
  [actionTypes.DEL_OTHER_CACHED_VIEWS](
    state,
    payload: RouteLocationNormalized
  ) {
    state.cachedViews = state.cachedViews.filter(
      (item) => item === payload.name
    );
  },
};

const actions: ActionTree<TagsViewState, RootState> = {
  [actionTypes.ADD_CACHED_VIEW]({ commit }, payload: RouteLocationNormalized) {
    commit(actionTypes.ADD_CACHED_VIEW, payload);
  },
  [actionTypes.ADD_VIEW]({ dispatch }, payload: RouteLocationNormalized) {
    dispatch(actionTypes.ADD_VISITED_VIEW, payload);
    dispatch(actionTypes.ADD_CACHED_VIEW, payload);
  },
  [actionTypes.ADD_VISITED_VIEW]({ commit }, payload: RouteLocationNormalized) {
    commit(actionTypes.ADD_VISITED_VIEW, payload);
  },
  [actionTypes.DEL_VIEW]({ dispatch }, payload: RouteLocationNormalized) {
    return new Promise((resolve) => {
      dispatch(actionTypes.DEL_VISITED_VIEW, payload);
      dispatch(actionTypes.DEL_CACHED_VIEW, payload);
      resolve(null);
    });
  },
  [actionTypes.DEL_VISITED_VIEW]({ commit }, payload: RouteLocationNormalized) {
    commit(actionTypes.DEL_VISITED_VIEW, payload);
  },
  [actionTypes.DEL_CACHED_VIEW]({ commit }, payload: RouteLocationNormalized) {
    commit(actionTypes.DEL_CACHED_VIEW, payload);
  },
  [actionTypes.DEL_ALL_CACHED_VIEWS]({ commit }) {
    commit(actionTypes.DEL_ALL_CACHED_VIEWS);
  },
  [actionTypes.DEL_ALL_VISITED_VIEWS]({ commit }) {
    commit(actionTypes.DEL_ALL_VISITED_VIEWS);
  },
  [actionTypes.DEL_ALL_VIEWS]({ dispatch }) {
    dispatch(actionTypes.DEL_ALL_VISITED_VIEWS);
    dispatch(actionTypes.DEL_ALL_CACHED_VIEWS);
  },
  [actionTypes.DEL_OTHERS_VIEWS](
    { dispatch },
    payload: RouteLocationNormalized
  ) {
    dispatch(actionTypes.DEL_OTHERS_VISITED_VIEWS, payload);
    dispatch(actionTypes.DEL_OTHER_CACHED_VIEWS, payload);
  },
  [actionTypes.DEL_OTHERS_VISITED_VIEWS](
    { commit },
    payload: RouteLocationNormalized
  ) {
    commit(actionTypes.DEL_OTHERS_VISITED_VIEWS, payload);
  },
  [actionTypes.DEL_OTHER_CACHED_VIEWS](
    { commit },
    payload: RouteLocationNormalized
  ) {
    commit(actionTypes.DEL_OTHER_CACHED_VIEWS, payload);
  },
};

const tagsView: Module<TagsViewState, RootState> = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: [],
  },
  mutations,
  actions,
};

export default tagsView;
