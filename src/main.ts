import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
// element plus
import installElementPlus, { Size } from "@/plugins/element";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";
// 初始化css 重置css默认样式
import "normalize.css/normalize.css";
// 全局 css
import "@/styles/index.scss";
// svg icons
import initSvgIcon from "@/icons/index";

const app = createApp(App);
app
  .use(store, key)
  .use(router)
  .use(installElementPlus, {
    size: store.state.app.size,
  })
  .use(initSvgIcon)
  .mount("#app");

// vue实例上挂载属性类型声明
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT: {
      size: Size;
    };
  }
}
