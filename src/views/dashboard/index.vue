<template>
  <div>
    <input v-model="value" />
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
    <svg-icon
      icon-class="404"
      class-name="custom-class"
      @click="sayHi"
    ></svg-icon>
    <el-button type="primary">size改变</el-button>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, ref } from "vue";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const { proxy } = getCurrentInstance()!;
    const value = ref("");
    const sayHi = () => {
      proxy?.$message.success("成功");
    };
    return {
      sayHi,
      value,
    };
  },
});
</script>

<style lang="scss">
.custom-class {
  // 自定义样式404
  font-size: 200px;
  color: green;
}
</style>
