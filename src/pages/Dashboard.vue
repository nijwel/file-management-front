<template>
  <!-- Loading -->
  <div
    v-if="loading"
    class="min-h-screen flex items-center justify-center bg-gray-50"
  >
    <div class="text-center">
      <div
        class="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>

  <!-- Layout -->
  <div v-else class="flex min-h-screen bg-gray-50">
    <Sidebar @logout="logout" />

    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <div class="bg-white border-b">
        <div class="px-8 py-6">
          <h1 class="text-3xl font-bold">Dashboard</h1>
          <p class="text-gray-600 mt-1">Your file management system</p>
        </div>
      </div>

      <!-- Body -->
      <div class="p-8 space-y-8">
        <!-- User Card -->
        <div
          class="bg-white p-6 rounded-xl border flex items-center gap-6 border-gray-200"
        >
          <div
            class="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold"
          >
            {{ userInitial }}
          </div>

          <div>
            <h2 class="text-2xl font-bold">{{ fullName }}</h2>
            <p class="text-gray-600">
              {{ user.email || "user@example.com" }}
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-4 rounded-xl border border-gray-200">
            <p class="text-gray-500 text-sm">Profile Status</p>
            <p class="text-2xl font-bold mt-2">Active</p>
          </div>

          <div class="bg-white p-4 rounded-xl border border-gray-200">
            <p class="text-gray-500 text-sm">Last Login</p>
            <p class="text-2xl font-bold mt-2">Today</p>
          </div>

          <div class="bg-white p-4 rounded-xl border border-gray-200">
            <p class="text-gray-500 text-sm">Account Type</p>
            <p class="text-2xl font-bold mt-2">Premium</p>
          </div>
        </div>

        <!-- Details -->
        <div class="bg-white p-6 rounded-xl border border-gray-200">
          <h3 class="text-xl font-bold mb-4">User Details</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">User ID</p>
              <p class="font-semibold">{{ user.id }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-semibold">{{ user.email }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p class="font-semibold">{{ user.phone || "N/A" }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Role</p>
              <p class="font-semibold">{{ user.role_id || "User" }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white p-6 rounded-xl border border-gray-200">
          <h3 class="text-xl font-bold mb-4">Quick Actions</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <router-link
              to="/file-manager"
              class="p-4 border rounded-lg border-gray-200 hover:bg-gray-900 hover:text-white transition"
            >
              📁 File Manager
            </router-link>

            <router-link
              to="/profile"
              class="p-4 border rounded-lg border-gray-200 hover:bg-gray-900 hover:text-white transition"
            >
              ⚙️ Profile Settings
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Email Verification Modal -->
    <div
      v-if="user.id && !user.email_verified_at"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-gray-900/30"
    >
      <!-- Modal Card -->
      <div
        class="bg-white border border-gray-200 rounded-xl shadow-lg p-6 max-w-md w-full"
      >
        <!-- Title -->
        <h3 class="text-xl font-bold mb-3 text-red-600">
          Email verification required
        </h3>

        <!-- Description -->
        <p class="text-gray-700 mb-6">
          You must verify your email to use the dashboard.
        </p>

        <!-- Buttons -->
        <div class="flex justify-end gap-3">
          <!-- Logout -->
          <button
            @click="logout"
            class="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition"
          >
            Logout
          </button>

          <!-- Resend -->
          <button
            @click="resendVerificationEmail"
            :disabled="resendLoading"
            class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50 transition"
          >
            {{ resendLoading ? "Sending..." : "Resend" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../utils/axios";
import Sidebar from "../components/Sidebar.vue";
import { showToast } from "../utils/toast";

const router = useRouter();
const user = ref({});
const loading = ref(true);
const resendLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

onMounted(async () => {
  try {
    const res = await api.get("/api/user/profile");
    user.value = res.data.result || res.data;
  } catch (err) {
    if (err.response?.status === 403) {
      user.value = err.response.data?.result?.user || {};
    } else {
      logout();
    }
  } finally {
    loading.value = false;
  }
});

const fullName = computed(() => {
  if (!user.value.first_name) return "User";
  return (
    user.value.first_name +
    (user.value.last_name ? " " + user.value.last_name : "")
  );
});

const userInitial = computed(() =>
  user.value.first_name ? user.value.first_name.charAt(0).toUpperCase() : "U",
);

const resendVerificationEmail = async () => {
  resendLoading.value = true;
  try {
    const res = await api.post("/api/user/resend-verify-email");

    console.log(res);
    if (res.data.status === 200) {
      successMessage.value = "✓ Verification email sent.";
      showToast({
        title: "Success",
        message: "Verification email sent.",
        type: "success",
      });
    }
  } finally {
    resendLoading.value = false;
  }
};

const logout = async () => {
  await api.post("/api/user/logout");
  localStorage.removeItem("token");
  router.push("/");
};
</script>
