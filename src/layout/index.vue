<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar></Sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <Navbar @show-setting="openSetting"></Navbar>
        <TagsView></TagsView>
      </div>
      <AppMain></AppMain>
      <RightPanel
        v-model="showSetting"
        title="样式风格设置"
        :size="SettingsPanelWidth"
      >
        <settings></settings>
      </RightPanel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain/index.vue";
import Navbar from "./components/Navbar/index.vue";
import TagsView from "./components/TagsView/index.vue";
import RightPanel from "@/components/RightPanel/index.vue";
import Settings from "./components/Settings/index.vue";
import variables from "@/styles/variables.scss";

export default defineComponent({
  components: {
    Sidebar,
    AppMain,
    Navbar,
    TagsView,
    RightPanel,
    Settings,
  },
  setup() {
    const showSetting = ref(false);

    const openSetting = () => {
      showSetting.value = true;
    };

    return {
      showSetting,
      openSetting,
      SettingsPanelWidth: variables.settingPanelWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header {
      .navbar {
        height: 50px;
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* 50= navbar  50  如果有tagsview + 34  */
      min-height: calc(100vh - 84px);
    }
  }
}
</style>
