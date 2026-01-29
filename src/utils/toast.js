import { ref } from "vue";

export const toasts = ref([]);

let idCounter = 0;

export function showToast({ title = "", message = "", type = "info", duration = 3000 } = {}) {
  const id = ++idCounter;
  const toast = {
    id,
    title,
    message,
    type, // 'success' | 'error' | 'info' | 'warning'
    createdAt: Date.now(),
    visible: true,
  };
  toasts.value.push(toast);

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
}

export function removeToast(id) {
  const idx = toasts.value.findIndex((t) => t.id === id);
  if (idx !== -1) {
    toasts.value.splice(idx, 1);
  }
}
