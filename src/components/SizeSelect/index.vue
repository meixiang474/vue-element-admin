<template>
  <div>
    <el-dropdown trigger="click" @command="handleSize">
      <div>
        <svg-icon class-name="size-icon" icon-class="size"></svg-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in sizeOptions"
            :key="item.value"
            :command="item.value"
            :disabled="item.value === size"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  nextTick,
} from "@vue/runtime-core";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { Size } from "@/plugins/element";
import * as actionTypes from "@/store/constants";

export default defineComponent({
  name: "SizeSelect",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance()!;
    const size = computed(() => store.state.app.size);
    const sizeOptions = ref([
      { label: "Default", value: "default" },
      { label: "Medium", value: "medium" },
      { label: "Small", value: "small" },
      { label: "Mini", value: "mini" },
    ]);
    // 刷新当前路由
    const refreshView = () => {
      store.dispatch(`tagsView/${actionTypes.DEL_ALL_CACHED_VIEWS}`);
      const { fullPath } = route;
      nextTick(() => {
        router.replace({
          path: "/redirect" + fullPath,
        });
      });
    };

    const handleSize = (command: Size) => {
      proxy!.$ELEMENT.size = command;
      store.dispatch(`app/${actionTypes.SET_SIZE}`, command);
      refreshView();
      proxy?.$message({
        message: "Switch Size Success",
        type: "success",
      });
    };

    return {
      sizeOptions,
      size,
      handleSize,
    };
  },
});
</script>
