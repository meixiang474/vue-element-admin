<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
} from "@vue/runtime-core";
import screenfull, { Screenfull } from "screenfull";

export default defineComponent({
  name: "Screenfull",
  setup() {
    const { proxy } = getCurrentInstance()!;
    const isFullscreen = ref(false);
    const handleClick = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle();
        return;
      }
      proxy?.$message({
        message: "your browser can not work",
        type: "warning",
      });
    };
    const change = () => {
      isFullscreen.value = (screenfull as Screenfull).isFullscreen;
    };
    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on("change", change);
      }
    };
    onMounted(() => {
      init();
    });

    return {
      isFullscreen,
      handleClick,
    };
  },
});
</script>
