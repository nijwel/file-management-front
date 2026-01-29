<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar @logout="logout" />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="px-8 py-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">ড্যাশবোর্ড</h1>
              <p class="text-gray-600 mt-1">আপনার ফাইল ম্যানেজমেন্ট সিস্টেম</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <div class="px-8 py-8">
        <!-- Welcome Card -->
        <div class="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block">
              <div
                class="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"
              ></div>
            </div>
            <p class="text-gray-600 mt-4">লোডিং হচ্ছে...</p>
          </div>
          <div v-else class="flex items-center gap-6">
            <div
              class="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="flex items-center gap-3">
              <div>
                <h2 class="text-3xl font-bold text-gray-900">
                  {{ user.first_name + " " + user.last_name || "ব্যবহারকারী" }}
                </h2>
                <p class="text-gray-600 mt-1">
                  {{ user.email || "user@example.com" }}
                </p>
              </div>
              <router-link
                to="/profile"
                class="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="প্রোফাইল আপডেট করুন"
              >
                <svg
                  class="w-5 h-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            class="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm font-semibold">
                  প্রোফাইল স্ট্যাটাস
                </p>
                <p class="text-2xl font-bold text-gray-900 mt-2">সক্রিয়</p>
              </div>
              <div
                class="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm font-semibold">শেষ লগইন</p>
                <p class="text-2xl font-bold text-gray-900 mt-2">আজ</p>
              </div>
              <div
                class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm font-semibold">
                  অ্যাকাউন্ট ধরন
                </p>
                <p class="text-2xl font-bold text-gray-900 mt-2">প্রিমিয়াম</p>
              </div>
              <div
                class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- User Details -->
        <div class="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-6">
            ব্যবহারকারীর বিস্তারিত
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border-l-4 border-gray-900 pl-4 py-2">
              <p class="text-gray-600 text-sm font-semibold">
                ব্যবহারকারী আইডি
              </p>
              <p class="text-lg font-bold text-gray-900 mt-1">{{ user.id }}</p>
            </div>
            <div class="border-l-4 border-gray-900 pl-4 py-2">
              <p class="text-gray-600 text-sm font-semibold">সম্পূর্ণ নাম</p>
              <p class="text-lg font-bold text-gray-900 mt-1">
                {{ user.first_name + " " + user.last_name || "ব্যবহারকারী" }}
              </p>
            </div>
            <div class="border-l-4 border-gray-900 pl-4 py-2">
              <p class="text-gray-600 text-sm font-semibold">ইমেইল ঠিকানা</p>
              <p class="text-lg font-bold text-gray-900 mt-1">
                {{ user.email }}
              </p>
            </div>
            <div class="border-l-4 border-gray-900 pl-4 py-2">
              <p class="text-gray-600 text-sm font-semibold">ফোন নম্বর</p>
              <p class="text-lg font-bold text-gray-900 mt-1">
                {{ user.phone || "N/A" }}
              </p>
            </div>
            <div class="border-l-4 border-gray-900 pl-4 py-2">
              <p class="text-gray-600 text-sm font-semibold">ভূমিকা</p>
              <p class="text-lg font-bold text-gray-900 mt-1">
                {{ user.role_id || "ব্যবহারকারী" }}
              </p>
            </div>
            <div class="border-l-4 border-gray-900 pl-4 py-2">
              <p class="text-gray-600 text-sm font-semibold">
                অ্যাকাউন্ট অবস্থা
              </p>
              <p class="text-lg font-bold text-gray-900 mt-1">সক্রিয়</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl border border-gray-200 p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-6">দ্রুত অ্যাকশন</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <router-link
              to="/file-manager"
              class="p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors text-left font-semibold"
            >
              <p class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  />
                </svg>
                ফাইল ম্যানেজার
              </p>
              <p class="text-sm mt-1 opacity-70">
                আপনার ফাইল এবং ফোল্ডার পরিচালনা করুন
              </p>
            </router-link>
            <button
              class="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <p class="font-semibold text-gray-900 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                সেটিংস
              </p>
              <p class="text-sm text-gray-600 mt-1">
                অ্যাকাউন্ট পছন্দ সেট করুন
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import api from "../utils/axios";
import Sidebar from "../components/Sidebar.vue";

const user = ref({});
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await api.get("api/admin/profile");
    user.value = res.data.result || res.data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
  } finally {
    loading.value = false;
  }
});

const logout = async () => {
  await api.post("/api/auth/logout");
  localStorage.removeItem("token");
  router.push("/");
};
</script>
