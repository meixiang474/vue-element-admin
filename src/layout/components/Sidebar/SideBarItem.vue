<template>
  <div class="sidebar-item-container" v-if="!item.meta || !item.meta.hidden">
    <!-- 一个路由下只有一个子路由时，只渲染这个子路由 -->
    <template
      v-if="
        theOnlyChildRoute &&
          (!theOnlyChildRoute.children || theOnlyChildRoute.noShowingChildren)
      "
    >
      <sidebar-item-link
        v-if="theOnlyChildRoute.meta"
        :to="resolvePath(theOnlyChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyChildRoute.path)">
          <i v-if="icon && icon.includes('el-icon')" :class="icon"></i>
          <svg-icon
            v-else-if="icon"
            class="menu-icon"
            :icon-class="icon"
          ></svg-icon>
          <template #title>
            <span>{{ theOnlyChildRoute.meta?.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <!-- 多个子路由时 -->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <i
          v-if="item.meta && item.meta.icon?.includes('el-icon')"
          :class="icon"
        ></i>
        <svg-icon
          v-else-if="item.meta?.icon"
          class="menu-icon"
          :icon-class="item.meta.icon"
        ></svg-icon>
        <span class="submenu-title">{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";
import path from "path";
import SidebarItemLink from "./SidebarItemLink.vue";
import { isExternal } from "@/utils/validate";

type EnhancedRouteRecordRaw = RouteRecordRaw & { noShowingChildren: boolean };

export default defineComponent({
  name: "SidebarItem",
  components: {
    SidebarItemLink,
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { item } = toRefs(props);

    // 子路由数量
    const showingChildNumber = computed(() => {
      // hidden路由排除，只计算可渲染的自路由
      const children = (props.item.children || []).filter((child) => {
        if (child.meta && child.meta.hidden) return false;
        return true;
      });
      return children.length;
    });

    // 渲染单个路由
    const theOnlyChildRoute = computed(() => {
      // 如果有多个自路由直接return null 多个children需要用el-submenu渲染
      if (showingChildNumber.value > 1) return null;

      // 只有一个子路由，需要筛选出meta中hidden不为true的
      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden)
            return child as EnhancedRouteRecordRaw;
        }
      }

      //该情况可能没有子路由，或者子路由都为hidden
      // 无可渲染children时，把当前路由作为唯一子路由渲染
      return {
        ...props.item,
        path: "", // resolvePath避免resolve拼接时发生重复
        noShowingChildren: true,
      } as EnhancedRouteRecordRaw;
    });

    // menu icon
    const icon = computed(() => {
      // 使用子路由icon 如果没有就用父路由
      return (
        theOnlyChildRoute.value?.meta?.icon ||
        (props.item.meta && props.item.meta.icon)
      );
    });

    const resolvePath = (childPath: string) => {
      if (isExternal(childPath)) {
        return childPath;
      }
      return path.resolve(props.basePath, childPath);
    };

    return {
      theOnlyChildRoute,
      icon,
      resolvePath,
    };
  },
});
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
