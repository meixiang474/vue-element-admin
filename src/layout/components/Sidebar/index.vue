<template>
  <h8 @click="isCollapse = !isCollapse">展收测试</h8>
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
    :collapse="isCollapse"
    collapse-transition
  >
    <side-bar-item
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    ></side-bar-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
import variables from "@/styles/variables.scss";
// 导入路由表
import { routes } from "@/router";
import SideBarItem from "./SideBarItem.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    SideBarItem,
  },
  setup() {
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
    const isCollapse = ref(true);

    // 渲染路由
    const menuRoutes = computed(() => routes);

    return {
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes,
    };
  },
});
</script>
