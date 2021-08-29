<template>
  <el-scrollbar wrap-class="scroll-wrapper">
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "ScrollPanel",
});
</script>

<style lang="scss">
.scroll-wrapper {
  position: relative;
  width: 100%;
  white-space: nowrap;
}
</style>
