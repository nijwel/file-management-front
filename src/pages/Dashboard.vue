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
      <p class="mt-4 text-gray-600">লোডিং হচ্ছে...</p>
    </div>
  </div>

  <!-- Layout -->
  <div v-else class="flex min-h-screen bg-gray-50">
    <Sidebar @logout="logout" />

    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <div class="bg-white border-b">
        <div class="px-8 py-6">
          <h1 class="text-3xl font-bold">ড্যাশবোর্ড</h1>
          <p class="text-gray-600 mt-1">আপনার ফাইল ম্যানেজমেন্ট সিস্টেম</p>
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
            <p class="text-gray-500 text-sm">প্রোফাইল স্ট্যাটাস</p>
            <p class="text-2xl font-bold mt-2">সক্রিয়</p>
          </div>

          <div class="bg-white p-4 rounded-xl border border-gray-200">
            <p class="text-gray-500 text-sm">শেষ লগইন</p>
            <p class="text-2xl font-bold mt-2">আজ</p>
          </div>

          <div class="bg-white p-4 rounded-xl border border-gray-200">
            <p class="text-gray-500 text-sm">অ্যাকাউন্ট ধরন</p>
            <p class="text-2xl font-bold mt-2">প্রিমিয়াম</p>
          </div>
        </div>

        <!-- Details -->
        <div class="bg-white p-6 rounded-xl border border-gray-200">
          <h3 class="text-xl font-bold mb-4">ব্যবহারকারীর বিস্তারিত</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">User ID</p>
              <p class="font-semibold">{{ user.id }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">ইমেইল</p>
              <p class="font-semibold">{{ user.email }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">ফোন</p>
              <p class="font-semibold">{{ user.phone || "N/A" }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">ভূমিকা</p>
              <p class="font-semibold">{{ user.role_id || "User" }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white p-6 rounded-xl border border-gray-200">
          <h3 class="text-xl font-bold mb-4">দ্রুত অ্যাকশন</h3>

          <div class="grid md:grid-cols-2 gap-4">
            <router-link
              to="/file-manager"
              class="p-4 border rounded-lg border-gray-200 hover:bg-gray-900 hover:text-white transition"
            >
              📁 ফাইল ম্যানেজার
            </router-link>

            <router-link
              to="/profile"
              class="p-4 border rounded-lg border-gray-200 hover:bg-gray-900 hover:text-white transition"
            >
              ⚙️ প্রোফাইল সেটিংস
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
          ইমেইল ভেরিফিকেশন প্রয়োজন
        </h3>

        <!-- Description -->
        <p class="text-gray-700 mb-6">
          ড্যাশবোর্ড ব্যবহার করতে হলে আপনাকে ইমেইল ভেরিফাই করতে হবে।
        </p>

        <!-- Buttons -->
        <div class="flex justify-end gap-3">
          <!-- Logout -->
          <button
            @click="logout"
            class="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition"
          >
            লগআউট
          </button>

          <!-- Resend -->
          <button
            @click="resendVerificationEmail"
            :disabled="resendLoading"
            class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-50 transition"
          >
            {{ resendLoading ? "পাঠানো হচ্ছে..." : "পুনরায় পাঠান" }}
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
  if (!user.value.first_name) return "ব্যবহারকারী";
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
      successMessage.value = "✓ ইমেইল ভেরিফিকেশন পাঠানো হয়েছে।";
      showToast({
        title: "সফল",
        message: "ইমেইল ভেরিফিকেশন পাঠানো হয়েছে।",
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
