import { createWebHistory, createRouter } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import FileManager from "../pages/FileManager.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import Profile from "../pages/Profile.vue";

const routes = [
  { path: "/", component: Login },
  {
    path: "/login/reset-password",
    component: ResetPassword,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/file-manager",
    component: FileManager,
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard to check authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/");
  } else if (to.path === "/" && token) {
    next("/dashboard");
  } else {
    next();
  }
});
