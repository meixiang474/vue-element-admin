<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="index === levelList.length - 1" class="no-redirect">
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  watch,
  Ref,
} from "@vue/runtime-core";
import {
  useRoute,
  useRouter,
  RouteLocationRaw,
  RouteLocationMatched,
} from "vue-router";
import { compile } from "path-to-regexp";

type PartialRouteLocationMatched = Partial<RouteLocationMatched>;

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const levelList = ref<PartialRouteLocationMatched[]>([]);

    // 判断是不是dashboard路由
    const isDashboard = (route?: PartialRouteLocationMatched) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        (name as string).trim().toLocaleLowerCase() ===
        "Dashboard".toLocaleLowerCase()
      );
    };

    // 获取面包屑导航
    const getBreadcrumb = () => {
      // 过滤掉没有title属性的路由，没有title就没法成为面包屑
      let matched = route.matched.filter(
        (item) => item.meta && item.meta.title
      ) as PartialRouteLocationMatched[];
      // 获取第一个匹配的路由记录
      const first = matched[0];
      // 如果第一个匹配到的路由不是Dashboard，也要把Dashboard放在第一项，让Dashboard成为首页
      if (!isDashboard(first)) {
        matched = ([
          {
            path: "/dashboard",
            meta: {
              title: "Dashboard",
            },
          },
        ] as PartialRouteLocationMatched[]).concat(matched);
      }
      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    };

    onBeforeMount(() => {
      getBreadcrumb();
    });

    watch(
      () => route.path,
      () => {
        getBreadcrumb();
      }
    );

    const pathCompile = (path: string) => {
      const toPath = compile(path);
      const params = route.params;
      return toPath(params);
    };

    const handleLink = (route: PartialRouteLocationMatched) => {
      const { path, redirect } = route;
      if (redirect) {
        router.push(redirect as RouteLocationRaw);
      }
      router.push(pathCompile(path as string));
    };

    return {
      levelList: levelList as Ref<PartialRouteLocationMatched[]>,
      handleLink,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  /* float: left; */
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>

<style lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all 0.5s;
}
</style>
