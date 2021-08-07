import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

// 异步获取路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        name: "Documentation",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index.vue"
          ),
        meta: {
          title: "Documentation",
          icon: "documentation",
        },
      },
    ],
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        meta: {
          title: "Guide",
          icon: "guide",
        },
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System",
      icon: "lock",
      alwaysShow: true,
    },
    children: [
      {
        path: "menu",
        name: "Menu Management",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/menu.vue"),
        meta: {
          title: "Menu Management",
          icon: "list",
        },
      },
      {
        path: "role",
        name: "Role Management",
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/system/role.vue"),
        meta: {
          title: "Role Management",
          icon: "list",
        },
      },
      {
        path: "user",
        name: "User Management",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/system/user.vue"),
        meta: {
          title: "User Management",
          icon: "list",
        },
      },
    ],
  },
  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "https://www.baidu.com",
        redirect: "/",
        meta: {
          title: "External Link",
          icon: "link",
        },
      },
    ],
  },
  {
    // 404一定放在要在最后面
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "Dashboard",
          // icon: "dashboard",
          icon: "el-icon-platform-eleme",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/redirect",
    name: "Redirect",
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ "@/views/redirect/index.vue"
          ),
      },
    ],
  },
  {
    path: "/401",
    name: "401",
    component: Layout,
    children: [
      {
        path: "",
        component: () =>
          import(/* webpackChunkName: "401" */ "@/views/error-page/401.vue"),
      },
    ],
    meta: {
      hidden: false,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
  },
];

export const routes = [...constantRoutes, ...asyncRoutes];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
