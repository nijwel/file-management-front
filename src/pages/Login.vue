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
        <h1 class="text-3xl font-bold text-white mb-2">Your Account</h1>
        <p class="text-gray-400">Log in to the file management system</p>
      </div>

      <!-- Login Form Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <!-- Email Input -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-2">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 mb-2">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
          />
        </div>

        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              class="w-4 h-4 border border-gray-300 rounded"
            />
            <span class="text-gray-700">Remember me</span>
          </label>
          <button
            @click="showForgotModal = true"
            type="button"
            class="text-gray-900 hover:text-gray-700 font-medium"
          >
            Forgot password?
          </button>
        </div>

        <!-- Login Button -->
        <button
          @click="login"
          class="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            v-if="!isLoading"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span v-if="isLoading">Loading...</span>
          <span v-else>Log in</span>
        </button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-600">or</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center text-sm text-gray-600">
          Don’t have an account?
          <router-link
            to="/register"
            class="font-semibold text-gray-900 hover:text-gray-700"
          >
            Sign up now
          </router-link>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-400">
        <p>Secure login. Your data is protected.</p>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div
      v-if="showForgotModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        @click.stop
      >
        <!-- Close Button -->
        <button
          @click="showForgotModal = false"
          type="button"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p class="text-gray-600 text-sm">
            You will receive a reset link at your registered email.
          </p>
        </div>

        <!-- Email Input -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-900 mb-2">
            Email address
          </label>
          <input
            v-model="forgotEmail"
            type="email"
            placeholder="your@email.com"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            @click="showForgotModal = false"
            type="button"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="sendResetEmail"
            type="button"
            class="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span v-if="forgotLoading">Sending...</span>
            <span v-else>Send link</span>
          </button>
        </div>

        <!-- Success Message -->
        <div
          v-if="forgotSuccess"
          class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p class="text-green-700 text-sm font-medium">
            ✓ Email sent successfully. Please check your inbox.
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="forgotError"
          class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p class="text-red-700 text-sm font-medium">✗ {{ forgotError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../utils/axios";
import { showToast } from "../utils/toast";

const email = ref("admin@gmail.com");
const password = ref("12345678");
const isLoading = ref(false);
const router = useRouter();

// Forgot Password State
const showForgotModal = ref(false);
const forgotEmail = ref("");
const forgotLoading = ref(false);
const forgotSuccess = ref(false);
const forgotError = ref("");

const login = async () => {
  isLoading.value = true;
  try {
    const res = await api.post("/api/auth/login", {
      email: email.value,
      password: password.value,
    });

    if (res.status === 200) {
      localStorage.setItem("token", res.data.result.access_token);
      router.push("/dashboard");
    }
  } catch (err) {
    showToast({
      title: "Login failed",
      message: "Please check email/password and try again.",
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

const sendResetEmail = async () => {
  // Reset messages
  forgotError.value = "";
  forgotSuccess.value = false;

  if (!forgotEmail.value) {
    forgotError.value = "Please enter your email address.";
    return;
  }

  forgotLoading.value = true;
  try {
    const res = await api.post("/api/auth/forget-password", {
      email: forgotEmail.value,
    });

    if (res.status === 200) {
      forgotSuccess.value = true;
      forgotEmail.value = "";

      // Auto close modal after 3 seconds
      setTimeout(() => {
        showForgotModal.value = false;
        forgotSuccess.value = false;
      }, 3000);
      showToast({
        title: "Success",
        message: "Reset link has been sent to your email.",
        type: "success",
      });
    }
  } catch (err) {
    forgotError.value =
      err.response?.data?.message ||
      "Failed to send email. Please try again.";
    showToast({
      title: "Error",
      message:
        err.response?.data?.message ||
        "Failed to send email. Please try again.",
      type: "error",
    });
  } finally {
    forgotLoading.value = false;
  }
};
</script>
