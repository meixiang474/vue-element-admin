<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">
          <breadcrumb></breadcrumb>
        </div>
        <div class="tags-view">tagsview</div>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";

export default defineComponent({
  components: {
    Sidebar,
    AppMain,
    Breadcrumb,
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
