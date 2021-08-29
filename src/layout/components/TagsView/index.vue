<template>
  <div class="tags-view-container">
    <ScrollPanel>
      <div class="tags-view-wrapper">
        <!-- 一个个tag view就是router-link -->
        <router-link
          class="tags-view-item"
          :class="{
            active: isActive(tag),
          }"
          :style="{
            backgroundColor: isActive(tag) ? themeColor : '',
            borderColor: isActive(tag) ? themeColor : '',
          }"
          v-for="(tag, index) in visitedTags"
          :key="index"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          tag="span"
        >
          <el-dropdown
            trigger="contextmenu"
            @command="handleTagCommand($event, tag)"
          >
            <span>
              {{ tag.meta.title }}
              <span
                v-if="!isAffix(tag)"
                class="el-icon-close"
                @click.prevent.stop="closeSelectedTag(tag)"
              ></span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="refresh">刷新</el-dropdown-item>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item
                  command="self"
                  v-if="!tag.meta || !tag.meta.affix"
                  >关闭</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </router-link>
      </div>
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import {
  computed,
  defineComponent,
  onBeforeMount,
  watch,
} from "@vue/runtime-core";
import {
  RouteLocationNormalized,
  useRoute,
  useRouter,
  RouteRecordRaw,
} from "vue-router";
import * as actionTypes from "@/store/constants";
import { routes } from "@/router";
import path from "path";
import ScrollPanel from "../../../components/ScrollPanel/index.vue";

enum TagCommandType {
  All = "all",
  Other = "other",
  Self = "self",
  Refresh = "refresh",
}

export default defineComponent({
  name: "TagsView",
  components: {
    ScrollPanel,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const visitedTags = computed(() => store.state.tagsView.visitedViews);

    const addTags = () => {
      const { name } = route;
      if (name) {
        store.dispatch(`tagsView/${actionTypes.ADD_VIEW}`, route);
      }
    };
    watch(
      () => route.path,
      () => {
        addTags();
      }
    );

    const filterAffixTags = (
      routes: RouteRecordRaw[],
      basePath = "/"
    ): Partial<RouteLocationNormalized>[] => {
      const tags: Partial<RouteLocationNormalized>[] = [];
      routes.forEach((route) => {
        const tagPath = path.resolve(basePath, route.path);
        if (route.meta && route.meta.affix) {
          tags.push({
            name: route.name,
            path: tagPath,
            fullPath: tagPath,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const childTags = filterAffixTags(route.children, tagPath);
          if (childTags.length > 0) {
            tags.push(...childTags);
          }
        }
      });
      return tags;
    };

    const initTags = () => {
      const affixTags = filterAffixTags(routes);
      for (const tag of affixTags) {
        if (tag.name) {
          store.dispatch(`tagsView/${actionTypes.ADD_VISITED_VIEW}`, tag);
        }
      }
    };

    onBeforeMount(() => {
      initTags();
      addTags();
    });

    const isActive = (tag: RouteLocationNormalized) => {
      return tag.path === route.path;
    };

    const toLastView = (
      visitedViews: RouteLocationNormalized[],
      view: RouteLocationNormalized
    ) => {
      const lastView = visitedViews[visitedViews.length - 1];
      if (lastView) {
        router.push(lastView.fullPath);
      } else {
        if (view.name === "Dashboard") {
          router.replace({ path: "/redirect" + view.fullPath });
        } else {
          router.push("/");
        }
      }
    };

    const closeSelectedTag = (view: RouteLocationNormalized) => {
      store.dispatch(`tagsView/${actionTypes.DEL_VIEW}`, view).then(() => {
        if (isActive(view)) {
          toLastView(visitedTags.value, view);
        }
      });
    };

    const handleTagCommand = (
      command: TagCommandType,
      view: RouteLocationNormalized
    ) => {
      switch (command) {
        case TagCommandType.All:
          handleCloseAllTag(view);
          break;
        case TagCommandType.Other:
          handleCloseOtherTag(view);
          break;
        case TagCommandType.Self:
          closeSelectedTag(view);
          break;
        case TagCommandType.Refresh:
          refreshSelectedTag(view);
          break;
      }
    };

    const handleCloseAllTag = (view: RouteLocationNormalized) => {
      store.dispatch(`tagsView/${actionTypes.DEL_ALL_VIEWS}`).then(() => {
        toLastView(visitedTags.value, view);
      });
    };

    const handleCloseOtherTag = (view: RouteLocationNormalized) => {
      store
        .dispatch(`tagsView/${actionTypes.DEL_OTHERS_VIEWS}`, view)
        .then(() => {
          if (!isActive(view)) {
            router.push(view);
          }
        });
    };

    const refreshSelectedTag = (view: RouteLocationNormalized) => {
      store
        .dispatch(`tagsView/${actionTypes.DEL_CACHED_VIEW}`, view)
        .then(() => {
          router.replace("/redirect" + view.fullPath);
        });
    };

    const isAffix = (tag: RouteLocationNormalized) => {
      return tag.meta && tag.meta.affix;
    };

    const themeColor = computed(() => store.getters.themeColor);

    return {
      visitedTags,
      isActive,
      closeSelectedTag,
      isAffix,
      handleTagCommand,
      themeColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      background: #fff;
      color: #495060;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          position: relative;
          display: inline-block;
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
          background: #fff;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-container {
  .el-icon-close {
    width: 16px;
    height: 16px;
    position: relative;
    left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -1px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
