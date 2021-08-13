import { useFetch } from "./useFetch";
import pkgJson from "element-plus/package.json";

// 获取element-plus版本
const version = pkgJson.version;

interface ReturnFn {
  getThemeChalkStyle: () => Promise<string>;
}
export const useThemeFiles = (): ReturnFn => {
  const getThemeChalkStyle = (): Promise<string> => {
    // 返回获取到的指定版本的element主题css内容
    // return await useFetch('//unpkg.com/element-plus@1.0.2-beta.33/lib/theme-chalk/index.css')
    return useFetch(
      `//unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`
    );
  };

  return {
    getThemeChalkStyle,
  };
};
