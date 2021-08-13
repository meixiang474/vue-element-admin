<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useGenerateTheme } from "@/hooks/useGenerateTheme";

export default defineComponent({
  name: "App",
  setup() {
    useGenerateTheme();
  },
});
</script>

<style></style>
