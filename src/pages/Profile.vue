<template>
  <div class="min-h-screen bg-gray-50 flex">
    <Sidebar @logout="logout" />
    <div class="flex-1">
      <div class="px-8 py-6">
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
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
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">প্রোফাইল আপডেট</h2>
              <p class="text-gray-600">আপনার নাম এবং ইমেইল আপডেট করুন</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div
              class="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
            >
              <!-- <div
                v-if="errorMessage"
                class="p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p class="text-red-700 text-sm font-medium">
                  {{ errorMessage }}
                </p>
              </div>
              <div
                v-if="successMessage"
                class="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p class="text-green-700 text-sm font-medium">
                  {{ successMessage }}
                </p>
              </div> -->

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2"
                    >ফার্স্ট নেম</label
                  >
                  <input
                    v-model.trim="firstName"
                    type="text"
                    placeholder="নাম"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2"
                    >লাস্ট নেম</label
                  >
                  <input
                    v-model.trim="lastName"
                    type="text"
                    placeholder="শেষ নাম (ঐচ্ছিক)"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-900 mb-2"
                    >ইমেইল</label
                  >
                  <input
                    v-model.trim="email"
                    type="email"
                    placeholder="example@domain.com"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    আপডেট করার পর লগইন ইমেইল একই থাকবে।
                  </p>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  @click="updateProfile"
                  :disabled="!formValid || isLoading"
                  class="px-6 py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    v-if="!isLoading"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M4 12a1 1 0 011-1h3V8a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 01-1-1z"
                    />
                  </svg>
                  <span v-if="isLoading">আপডেট হচ্ছে...</span>
                  <span v-else>আপডেট করুন</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">বর্তমান তথ্য</h3>
              <div class="space-y-3">
                <div class="border-l-4 border-gray-900 pl-4 py-2">
                  <p class="text-sm text-gray-600 font-semibold">
                    সম্পূর্ণ নাম
                  </p>
                  <p class="text-lg font-bold text-gray-900 mt-1">
                    {{ firstName }} {{ lastName }}
                  </p>
                </div>
                <div class="border-l-4 border-gray-900 pl-4 py-2">
                  <p class="text-sm text-gray-600 font-semibold">ইমেইল</p>
                  <p class="text-lg font-bold text-gray-900 mt-1">
                    {{ email }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../utils/axios";
import Sidebar from "../components/Sidebar.vue";
import { showToast } from "../utils/toast";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const formValid = computed(() => {
  return (
    firstName.value &&
    email.value &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)
  );
});

onMounted(async () => {
  try {
    const res = await api.get("api/admin/profile");
    const data = res.data.result || res.data;
    if (data) {
      firstName.value = data.first_name ?? firstName.value;
      lastName.value = data.last_name ?? lastName.value;
      email.value = data.email ?? email.value;
    }
  } catch (err) {
    // Keep defaults provided by user, show non-blocking info
    console.warn("Failed to fetch existing profile, using defaults.", err);
  }
});

const updateProfile = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!formValid.value) {
    errorMessage.value = "ফার্স্ট নেম এবং সঠিক ইমেইল দিন।";
    showToast({
      title: "ভ্যালিডেশন ত্রুটি",
      message: "ফার্স্ট নেম এবং সঠিক ইমেইল দিন।",
      type: "error",
    });
    return;
  }

  isLoading.value = true;
  try {
    const res = await api.post("/api/admin/profile", {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
    });

    if (res.status === 200) {
      successMessage.value = "✓ প্রোফাইল সফলভাবে আপডেট হয়েছে।";
      showToast({
        title: "সফল",
        message: "প্রোফাইল আপডেট সম্পন্ন হয়েছে।",
        type: "success",
      });
    }
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message ||
      "প্রোফাইল আপডেট করতে ব্যর্থ। পরে আবার চেষ্টা করুন।";
    console.error("Profile update error:", err);
    showToast({
      title: "ত্রুটি",
      message:
        err.response?.data?.message ||
        "প্রোফাইল আপডেট করতে ব্যর্থ। পরে আবার চেষ্টা করুন।",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

const logout = async () => {
  await api.post("/api/auth/logout");
  localStorage.removeItem("token");
  router.push("/");
};
</script>
