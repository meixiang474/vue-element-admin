<template>
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="themeColor"
    :collapse="isCollapse"
    collapse-transition
  >
    <SidebarItem
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    ></SidebarItem>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import variables from "@/styles/variables.scss";
// 导入路由表
import { routes } from "@/router";
import SidebarItem from "./SideBarItem.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarItem,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
    const activeMenu = computed(() => {
      const { path, meta } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    // scss变量
    const scssVariables = computed(() => variables);
    // 菜单展开收起状态 后面会放store里
    const isCollapse = computed(() => !store.state.app.sidebar.opened);

    // 渲染路由
    const menuRoutes = computed(() => routes);

    const themeColor = computed(() => store.getters.themeColor);

    return {
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes,
      themeColor,
    };
  },
});
</script>
