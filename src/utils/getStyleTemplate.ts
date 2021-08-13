import { IObject } from "./constants";

export const getStyleTemplate = (data: string): string => {
  // 这些是我们要把key也就是css内容中颜色值 替换成右边value作为变量标记 后续我们之关系右边value这些变量标记
  const colorMap: IObject = {
    "#3a8ee6": "shade-1",
    "#409eff": "primary",
    "#53a8ff": "light-1",
    "#66b1ff": "light-2",
    "#79bbff": "light-3",
    "#8cc5ff": "light-4",
    "#a0cfff": "light-5",
    "#b3d8ff": "light-6",
    "#c6e2ff": "light-7",
    "#d9ecff": "light-8",
    "#ecf5ff": "light-9",
  };
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key];
    // 将key对应的颜色值 替换成 右边对应value primary list-1这些 后续生成主题 作为替换变量标记使用
    data = data.replace(new RegExp(key, "ig"), value);
  });
  return data; // 返回css字符串模板 之后主要靠它用我们所选的主题色 渐变色 把里面 变量标记替换掉生成主题css
};
