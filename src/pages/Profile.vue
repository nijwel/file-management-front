<template>
  <div class="min-h-screen bg-gray-50 flex">
    <Sidebar @logout="logout" />

    <div class="flex-1">
      <div class="px-8 py-6">
        <!-- Header -->
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
          <!-- Profile Form -->
          <div class="lg:col-span-2">
            <div
              class="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
            >
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
                <div>
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
                <div>
                  <label class="block text-sm font-semibold text-gray-900 mb-2"
                    >ফোন নম্বর</label
                  >
                  <input
                    v-model.trim="phone"
                    type="text"
                    placeholder="01XXXXXXXXX"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  />
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

          <!-- Current Info -->
          <div>
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">বর্তমান তথ্য</h3>
              <div class="space-y-3">
                <div class="border-l-4 border-gray-300 pl-4 py-2">
                  <p class="text-sm text-gray-600 font-semibold">
                    সম্পূর্ণ নাম
                  </p>
                  <p class="text-lg font-bold text-gray-900 mt-1">
                    {{ firstName }} {{ lastName }}
                  </p>
                </div>
                <div class="border-l-4 border-gray-300 pl-4 py-2">
                  <p class="text-sm text-gray-600 font-semibold">ফোন নম্বর</p>
                  <p class="text-lg font-bold text-gray-900 mt-1">
                    {{ phone || "নির্ধারিত নয়" }}
                  </p>
                </div>
                <div class="border-l-4 border-gray-300 pl-4 py-2">
                  <p class="text-sm text-gray-600 font-semibold">ইমেইল</p>
                  <p class="text-lg font-bold text-gray-900 mt-1">
                    {{ email }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Password Update -->
          <div class="lg:col-span-2">
            <div
              class="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
            >
              <!-- Password Update Fields -->
              <div class="relative">
                <label class="block text-sm font-semibold text-gray-900 mb-2"
                  >বর্তমান পাসওয়ার্ড</label
                >
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  v-model.trim="currentPassword"
                  placeholder="বর্তমান পাসওয়ার্ড"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all pr-10"
                />
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 top-9 text-gray-500"
                >
                  <svg
                    v-if="showCurrentPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.678-3.872M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>

              <!-- New Password -->
              <div class="relative">
                <label class="block text-sm font-semibold text-gray-900 mb-2"
                  >নতুন পাসওয়ার্ড</label
                >
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  v-model.trim="newPassword"
                  placeholder="নতুন পাসওয়ার্ড"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all pr-10"
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-9 text-gray-500"
                >
                  <svg
                    v-if="showNewPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.678-3.872M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>

              <!-- Confirm Password -->
              <div class="relative">
                <label class="block text-sm font-semibold text-gray-900 mb-2"
                  >পুনরায় পাসওয়ার্ড</label
                >
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model.trim="confirmPassword"
                  placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all pr-10"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-9 text-gray-500"
                >
                  <svg
                    v-if="showConfirmPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.678-3.872M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex justify-end">
                <button
                  @click="updatePassword"
                  :disabled="!passwordFormValid || isLoading"
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
const phone = ref("");

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const isLoading = ref(false);

// Profile Validation
const formValid = computed(() => {
  return (
    firstName.value &&
    email.value &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)
  );
});

// Password Validation
const passwordFormValid = computed(() => {
  return (
    currentPassword.value &&
    newPassword.value &&
    confirmPassword.value &&
    newPassword.value === confirmPassword.value
  );
});

// Password error message
const passwordError = computed(() => {
  if (!newPassword.value || !confirmPassword.value)
    return "নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড অবশ্যই দিতে হবে।";
  if (newPassword.value !== confirmPassword.value)
    return "নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলছে না।";
  return "";
});

onMounted(async () => {
  try {
    const res = await api.get("/api/user/profile");
    const data = res.data.result || res.data;
    firstName.value = data.first_name ?? "";
    lastName.value = data.last_name ?? "";
    email.value = data.email ?? "";
    phone.value = data.phone ?? "";
  } catch (err) {
    console.warn("Profile fetch failed", err);
  }
});

const updateProfile = async () => {
  if (!formValid.value) {
    showToast({
      title: "ত্রুটি",
      message: "ফার্স্ট নেম এবং সঠিক ইমেইল দিন।",
      type: "error",
    });
    return;
  }
  isLoading.value = true;
  try {
    const res = await api.put("/api/user/profile", {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      phone: phone.value,
    });
    if (res.status === 200)
      showToast({
        title: "সফল",
        message: "প্রোফাইল আপডেট সম্পন্ন।",
        type: "success",
      });
  } catch (err) {
    console.error(err);
    showToast({
      title: "ত্রুটি",
      message: err.response?.data?.message || "প্রোফাইল আপডেট ব্যর্থ।",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

const updatePassword = async () => {
  if (!passwordFormValid.value) return;
  isLoading.value = true;
  try {
    const res = await api.put("/api/user/update-password", {
      current_password: currentPassword.value,
      password: newPassword.value,
      password_confirmation: confirmPassword.value,
    });
    if (res.status === 200) currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";

    showToast({
      title: "সফল",
      message: "পাসওয়ার্ড আপডেট সম্পন্ন।",
      type: "success",
    });
  } catch (err) {
    console.error(err);
    showToast({
      title: "ত্রুটি",
      message: err.response?.data?.message || "পাসওয়ার্ড আপডেট ব্যর্থ।",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

const logout = async () => {
  await api.post("/api/user/logout");
  localStorage.removeItem("token");
  router.push("/");
};
</script>
