<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4"
  >
    <!-- Background Decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      ></div>
    </div>

    <!-- Main Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo Section -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-2xl mb-4"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">
          Reset Password
        </h1>
        <p class="text-gray-400">Set a new password and log in again</p>
      </div>

      <!-- Reset Form Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p class="text-red-700 text-sm font-medium">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p class="text-green-700 text-sm font-medium">{{ successMessage }}</p>
          <p class="text-green-600 text-xs mt-2">
            Redirecting to login in {{ countdownSeconds }} seconds...
          </p>
        </div>

        <!-- Email Display -->
        <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p class="text-gray-600 text-sm font-semibold mb-1">Email</p>
          <p class="text-gray-900 font-medium">{{ emailAddress }}</p>
        </div>

        <!-- New Password Input -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-2">
            New password
          </label>
          <input
            v-model.trim="newPassword"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
          />
          <p class="text-gray-500 text-xs mt-1">At least 8 characters</p>
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-2">
            Confirm password
          </label>
          <input
            v-model.trim="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
          />
        </div>

        <!-- Password Match Indicator -->
        <div
          v-if="newPassword && confirmPassword"
          class="flex items-center gap-2"
        >
          <div
            :class="[
              'w-2 h-2 rounded-full',
              passwordsMatch ? 'bg-green-500' : 'bg-red-500',
            ]"
          ></div>
          <p
            :class="[
              'text-sm font-medium',
              passwordsMatch ? 'text-green-600' : 'text-red-600',
            ]"
          >
            {{ passwordsMatch ? "Passwords match ✓" : "Passwords do not match" }}
          </p>
        </div>

        <!-- Reset Button -->
        <button
          @click="resetPassword"
          :disabled="!isFormValid"
          class="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            v-if="!isLoading"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            />
          </svg>
          <span v-if="isLoading">Processing...</span>
          <span v-else>Update password</span>
        </button>

        <!-- Back to Login Link -->
        <div class="text-center text-sm">
          <router-link
            to="/"
            class="text-gray-900 hover:text-gray-700 font-medium"
          >
            ← Back to login
          </router-link>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-400">
        <p>Keep your new password secure.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../utils/axios";
import { showToast } from "../utils/toast";

const router = useRouter();
const route = useRoute();

const newPassword = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const emailAddress = ref("");
const tokenParam = ref("");
const countdownSeconds = ref(3);

// Computed property to check if passwords match
const passwordsMatch = computed(() => {
  return (
    newPassword.value &&
    confirmPassword.value &&
    newPassword.value === confirmPassword.value
  );
});

// Computed property to check overall form validity
const isFormValid = computed(() => {
  return (
    !isLoading.value &&
    !successMessage.value &&
    newPassword.value &&
    confirmPassword.value &&
    newPassword.value === confirmPassword.value &&
    newPassword.value.length >= 8
  );
});

onMounted(() => {
  // Extract token and email from URL query parameters
  tokenParam.value = route.query.token;
  emailAddress.value = route.query.email;

  // Validate required parameters
  if (!tokenParam.value || !emailAddress.value) {
    errorMessage.value = "Invalid reset link. Please try again.";
  }
});

const resetPassword = async () => {
  // Reset error message
  errorMessage.value = "";

  // Validate passwords
  if (!newPassword.value || !confirmPassword.value) {
    errorMessage.value = "Please fill in all fields.";
    showToast({
      title: "Validation error",
      message: "Please fill in all fields.",
      type: "error",
    });
    return;
  }

  if (newPassword.value.length < 8) {
    errorMessage.value = "Password must be at least 8 characters.";
    showToast({
      title: "Validation error",
      message: "Password must be at least 8 characters.",
      type: "error",
    });
    return;
  }

  if (!passwordsMatch.value) {
    errorMessage.value = "Passwords do not match.";
    showToast({
      title: "Validation error",
      message: "Passwords do not match.",
      type: "error",
    });
    return;
  }

  isLoading.value = true;
  try {
    const res = await api.post("/api/auth/reset-password", {
      token: tokenParam.value,
      email: emailAddress.value,
      password: newPassword.value,
      password_confirmation: confirmPassword.value,
    });

    if (res.status === 200) {
      successMessage.value =
        "✓ Password updated successfully. You can now log in with your new password.";
      showToast({
        title: "Success",
        message: "Password updated successfully.",
        type: "success",
      });

      // Countdown and redirect
      const countdownInterval = setInterval(() => {
        countdownSeconds.value--;
        if (countdownSeconds.value <= 0) {
          clearInterval(countdownInterval);
          router.push("/");
        }
      }, 1000);
    }
  } catch (err) {
    errorMessage.value =
      err.response?.data?.message ||
      "Failed to reset password. Please try again.";
    console.error("Reset password error:", err);
    showToast({
      title: "Error",
      message:
        err.response?.data?.message ||
        "Failed to reset password. Please try again.",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
