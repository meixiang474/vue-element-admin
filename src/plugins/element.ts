import { App } from "vue";
import {
  ElButton,
  ElMessage,
  ElNotification,
  ElMessageBox,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElTooltip,
  ElDropdownMenu,
  ElDropdownItem,
  ElRow,
  ElCol,
  ElScrollbar,
  ElDrawer,
  ElColorPicker,
} from "element-plus";
import lang from "element-plus/lib/locale/lang/zh-cn";
import locale from "element-plus/lib/locale/index";
import "dayjs/locale/zh-cn";

export type Size = "default" | "medium" | "small" | "mini";

interface ElementOptions {
  size: Size;
}

export default (app: App, options: ElementOptions) => {
  locale.use(lang);

  // 按需导入组件
  const components = [
    ElButton,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElDropdown,
    ElTooltip,
    ElDropdownItem,
    ElDropdownMenu,
    ElRow,
    ElCol,
    ElScrollbar,
    ElDrawer,
    ElColorPicker,
  ];

  components.forEach((component) => {
    app.component(component.name, component);
  });

  app.config.globalProperties.$message = ElMessage;
  app.config.globalProperties.$notify = ElNotification;
  app.config.globalProperties.$confirm = ElMessageBox.confirm;
  app.config.globalProperties.$alert = ElMessageBox.alert;
  app.config.globalProperties.$prompt = ElMessageBox.prompt;

  // 全局配置
  // 修改组件默认尺寸为medium
  app.config.globalProperties.$ELEMENT = {
    size: options.size,
  };
};
