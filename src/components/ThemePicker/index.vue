<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    :predefine="themeColor"
    popper-class="theme-picker-dropdown"
  />
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, computed, ref, watch } from "@vue/runtime-core";
import * as actionTypes from "@/store/constants";
import { useGenerateTheme } from "@/hooks/useGenerateTheme";

export default defineComponent({
  name: "ThemePicker",
  setup() {
    const store = useStore();
    const themeColor = [
      "#409EFF",
      "#1890ff",
      "#304156",
      "#212121",
      "#11a983",
      "#13c2c2",
      "#6959CD",
      "#f5222d",
    ];
    const defaultTheme = computed(() => store.state.settings.theme);
    const theme = ref("");

    const { generateTheme } = useGenerateTheme();

    watch(
      defaultTheme,
      (value) => {
        theme.value = value;
      },
      {
        immediate: true,
      }
    );

    watch(theme, (value) => {
      store.dispatch(`settings/${actionTypes.CHANGE_SETTINGS}`, {
        key: "theme",
        value,
      });
      generateTheme(value);
    });

    return {
      themeColor,
      theme,
    };
  },
});
</script>

<style lang="scss">
.theme-picker {
  height: 26px !important;
  margin-right: 8px;
  .el-color-picker__trigger {
    height: 26px !important;
    width: 26px !important;
    padding: 2px;
  }
}

.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
