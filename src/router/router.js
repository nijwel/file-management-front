import { createWebHistory, createRouter } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import FileManager from "../pages/FileManager.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import Profile from "../pages/Profile.vue";
import EmailVerification from "../pages/auth/EmailVerification.vue";

const routes = [
  {
    path: "/",
    component: Login,
    meta: { title: "লগইন" },
  },
  {
    path: "/register",
    component: () => import("../pages/auth/Register.vue"),
    meta: { title: "নতুন অ্যাকাউন্ট তৈরি করুন" },
  },
  {
    path: "/login/reset-password",
    component: ResetPassword,
    meta: { title: "পাসওয়ার্ড রিসেট" },
  },
  {
    path: "/verify-email",
    component: EmailVerification,
    props: (route) => ({
      token: route.query.token,
      email: route.query.email,
    }),
    meta: { title: "ইমেইল ভেরিফিকেশন" },
    alias: "/email/verification",
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
