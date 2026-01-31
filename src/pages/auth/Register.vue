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
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Create a new account</h1>
        <p class="text-gray-400">Join the file management system</p>
      </div>

      <!-- Registration Form Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <form @submit.prevent="register" class="space-y-6">
          <!-- Name Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              First name
            </label>
            <input
              id="first_name"
              v-model="formData.firstName"
              type="text"
              required
              placeholder="Enter your full name"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              :class="{ 'border-red-500': errors.firstName }"
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
              {{ errors.firstName }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Last name
            </label>
            <input
              id="last_name"
              v-model="formData.lastName"
              type="text"
              required
              placeholder="Enter your full name"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              :class="{ 'border-red-500': errors.lastName }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.lastName }}
            </p>
          </div>

          <!-- Email Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Email address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="your@email.com"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              minlength="8"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">
              Confirm password
            </label>
            <input
              id="password_confirmation"
              v-model="formData.password_confirmation"
              type="password"
              required
              minlength="8"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              :class="{ 'border-red-500': errors.password_confirmation }"
            />
            <p
              v-if="errors.password_confirmation"
              class="mt-1 text-sm text-red-600"
            >
              {{ errors.password_confirmation }}
            </p>
          </div>

          <!-- Register Button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Please wait...
              </span>
              <span v-else>Register</span>
            </button>
          </div>

          <!-- Login Link -->
          <div class="text-center text-sm text-gray-600">
            Already have an account?
            <router-link
              to="/"
              class="font-semibold text-gray-900 hover:text-gray-700"
            >
              Log in
            </router-link>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-400">
        <p>Secure registration. Your data is protected.</p>
      </div>
    </div>
  </div>

  <!-- Success Modal -->
  <div v-if="showSuccessModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20
      text-center sm:block sm:p-0" >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
      >
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          >
            <svg
              class="h-6 w-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Registration successful!
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                A verification link has been sent to your email. Please check
                your inbox and click the link to activate your account.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <button
            type="button"
            @click="showSuccessModal = false"
            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../utils/axios";
import { showToast } from "../../utils/toast";

const router = useRouter();

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = ref({});
const isLoading = ref(false);
const showSuccessModal = ref(false);

const validateForm = () => {
  const newErrors = {};

  if (!formData.value.firstName) {
    newErrors.name = "First name is required";
  }

  if (!formData.value.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = "Enter a valid email address";
  }

  if (!formData.value.password) {
    newErrors.password = "Password is required";
  } else if (formData.value.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (formData.value.password !== formData.value.password_confirmation) {
    newErrors.password_confirmation = "Passwords do not match";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const register = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errors.value = {};

  try {
    const response = await api.post("/api/auth/register", {
      first_name: formData.value.firstName,
      last_name: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password,
      password_confirmation: formData.value.password_confirmation,
    });

    if (response.status === 201) {
      // Store user data and token
      localStorage.setItem("token", response.data.result.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.result.user));

      // Show success toast
      showToast({
        title: "Success",
        message: "Registration successful! Please verify your email.",
        type: "success",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("Registration failed:", error);

    if (error.response?.data?.errors) {
      // Handle validation errors from the server
      errors.value = error.response.data.errors;
    } else {
      showToast({
        title: "Registration failed",
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        type: "error",
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
