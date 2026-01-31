<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-6">
      <!-- Card -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <!-- Title -->
        <h2 class="text-center text-3xl font-extrabold text-gray-900 mb-4">
          {{ isVerifying ? "Verifying your email..." : verificationStatus }}
        </h2>

        <!-- Message -->
        <div
          v-if="verificationMessage"
          class="p-4 rounded-md border"
          :class="
            verificationSuccess
              ? 'bg-gray-50 border-green-300 text-green-700'
              : 'bg-gray-50 border-red-300 text-red-700'
          "
        >
          {{ verificationMessage }}
        </div>

        <!-- Resend Button -->
        <div v-if="showResendButton" class="mt-6">
          <button
            @click="resendVerificationEmail"
            :disabled="resendLoading"
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 disabled:opacity-50 transition"
          >
            <span v-if="resendLoading">Sending...</span>
            <span v-else>Resend verification email</span>
          </button>
        </div>

        <!-- Back to Login -->
        <div class="text-center mt-6">
          <router-link
            to="/"
            class="text-sm font-medium text-gray-900 hover:text-black"
          >
            Back to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../utils/axios";
import { showToast } from "../../utils/toast";

const route = useRoute();
const router = useRouter();
const token = route.query.token;
const email = route.query.email;

const isVerifying = ref(true);
const verificationStatus = ref("");
const verificationMessage = ref("");
const verificationSuccess = ref(false);
const showResendButton = ref(false);
const resendLoading = ref(false);

const verifyEmail = async () => {
  try {
    const response = await api.post(`/api/auth/verify-email?token=${token}`);

    verificationStatus.value = "Email verification successful!";
    verificationMessage.value =
      "Your email has been verified successfully. You can now access the dashboard.";
    verificationSuccess.value = true;

    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  } catch (error) {
    verificationStatus.value = "Verification failed";
    verificationMessage.value =
      error.response?.data?.message || "Email verification failed.";
    verificationSuccess.value = false;
    showResendButton.value = true;
  } finally {
    isVerifying.value = false;
  }
};

const resendVerificationEmail = async () => {
  if (!email) {
    verificationMessage.value = "Email address not found.";
    verificationSuccess.value = false;
    return;
  }

  resendLoading.value = true;
  try {
    await api.post("/api/user/resend-verify-email", { email });
    verificationMessage.value =
      "Verification email has been resent. Please check your inbox.";
    verificationSuccess.value = true;
    showResendButton.value = false;

    showToast({
      title: "Success",
      message: "Verification email has been resent.",
      type: "success",
    });
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    verificationMessage.value =
      error.response?.data?.message || "Failed to resend verification email.";
    verificationSuccess.value = false;
  } finally {
    resendLoading.value = false;
  }
};

onMounted(() => {
  if (!token) {
    isVerifying.value = false;
    verificationStatus.value = "Invalid request";
    verificationMessage.value = "The verification link is not valid.";
    verificationSuccess.value = false;
  } else {
    verifyEmail();
  }
});
</script>
