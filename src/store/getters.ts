import { GetterTree } from "vuex";
import { RootState } from "./index";

const getters: GetterTree<RootState, RootState> = {
  sidebar: (state) => state.app.sidebar,
};

export default getters;
