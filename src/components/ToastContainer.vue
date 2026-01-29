<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-3 w-80">
    <transition-group name="toast" tag="div">
      <div
        v-for="t in toasts"
        :key="t.id"
        :class="toastClass(t.type)"
        class="rounded-lg shadow-lg border p-4 bg-white/95 backdrop-blur flex items-start gap-3"
      >
        <div :class="iconClass(t.type)" class="w-8 h-8 rounded-md flex items-center justify-center">
          <svg v-if="t.type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else-if="t.type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 012 0v6a1 1 0 11-2 0V5zm1 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M18 10A8 8 0 11.001 9.999 8 8 0 0118 10zm-8-4a1 1 0 100 2 1 1 0 000-2zm-1 4a1 1 0 000 2h2a1 1 0 100-2H9z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-gray-900" v-if="t.title">{{ t.title }}</p>
          <p class="text-sm text-gray-700">{{ t.message }}</p>
        </div>
        <button
          @click="removeToast(t.id)"
          class="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Dismiss"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { toasts, removeToast } from "../utils/toast";

const toastClass = (type) => {
  switch (type) {
    case "success":
      return "border-green-200";
    case "error":
      return "border-red-200";
    case "warning":
      return "border-yellow-200";
    default:
      return "border-gray-200";
  }
};

const iconClass = (type) => {
  switch (type) {
    case "success":
      return "bg-green-100 text-green-700";
    case "error":
      return "bg-red-100 text-red-700";
    case "warning":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
