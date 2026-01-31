<template>
  <div class="group">
    <!-- Folder Card -->
    <div
      class="relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all"
    >
      <div
        @dblclick="$emit('enter-folder', folder)"
        class="p-6 bg-gradient-to-br from-gray-100 to-gray-200 h-32 flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-colors"
      >
        <svg
          class="w-12 h-12 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          />
        </svg>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 truncate text-sm">
          {{ folder.name }}
        </h3>
        <p class="text-xs text-gray-500 mt-1">
          {{ counts.folders }} Folders, {{ counts.files }} Files
        </p>
      </div>

      <!-- Three-dot options (top-right) -->
      <div class="absolute top-2 right-2 z-40">
        <button
          @click.stop="$emit('toggle-options', folder)"
          class="p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-sm"
          title="Details"
        >
          <svg
            class="w-5 h-5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
        <div
          v-if="isOpen"
          class="absolute top-8 right-0 mt-1 bg-white rounded shadow-lg p-1 flex"
        >
          <button
            @click.stop="$emit('rename', folder)"
            class="hover:bg-gray-700 text-gray bg-white bg-opacity-80 hover:text-white p-2 rounded"
            title="Rename"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
          </button>
          <button
            @click.stop="$emit('delete', folder)"
            class="text-red-600 p-2 rounded hover:bg-red-50"
            title="Delete"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Folder Actions (Hover) -->
      <div
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 rounded"
      >
        <button
          @click.stop="$emit('delete', folder)"
          class="hover:bg-white text-white p-2 rounded"
          title="Delete"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  folder: {
    type: Object,
    required: true,
  },
  counts: {
    type: Object,
    default: () => ({ folders: 0, files: 0 }),
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["enter-folder", "toggle-options", "rename", "delete"]);
</script>
