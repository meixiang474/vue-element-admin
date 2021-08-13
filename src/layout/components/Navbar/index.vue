<template>
  <div class="navbar">
    <Hambuger
      @toggle-click="toggleSidebar"
      :is-active="sidebar.opened"
    ></Hambuger>
    <Breadcrumb></Breadcrumb>
    <div class="right-menu">
      <div
        @click="openShowSetting"
        class="setting right-menu-item hover-effect"
      >
        <i class="el-icon-s-tools"></i>
      </div>
      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <SizeSelect class="right-menu-item hover-effect"></SizeSelect>
      </el-tooltip>
      <Screenfull
        id="screenfull"
        class="right-menu-item hover-effect"
      ></Screenfull>
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/runtime-core";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hambuger from "@/components/Hambuger/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import SizeSelect from "@/components/SizeSelect/index.vue";
import Avatar from "../Avatar/index.vue";
import { useStore } from "@/store";
import * as actionTypes from "@/store/constants";

export default defineComponent({
  name: "Navbar",
  components: {
    Breadcrumb,
    Hambuger,
    Screenfull,
    SizeSelect,
    Avatar,
  },
  emits: ["showSetting"],
  setup(props, ctx) {
    const store = useStore();

    const toggleSidebar = () => {
      store.dispatch(`app/${actionTypes.TOGGLE_SIDEBAR}`);
    };

    const sidebar = computed(() => store.state.app.sidebar);

    // 打开设置面板
    const openShowSetting = () => {
      ctx.emit("showSetting", true);
    };

    return {
      toggleSidebar,
      sidebar,
      openShowSetting,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    .setting {
      font-size: 26px;
    }
    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
