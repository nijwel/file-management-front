<template>
  <div class="group">
    <!-- File Card -->
    <div
      class="relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all"
    >
      <div
        class="relative h-32 bg-gray-100 flex items-center justify-center overflow-hidden"
      >
        <template v-if="file.mime_type && file.mime_type.startsWith('image/')">
          <img
            :src="file.file_url"
            :alt="file.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </template>
        <template v-else>
          <div class="w-full h-full flex items-center justify-center">
            <img
              v-if="getIconForItem(file) === 'image'"
              src="/img/jpg.png"
              alt="Image"
              class="w-10 h-10 object-contain"
            />

            <img
              v-else-if="getIconForItem(file) === 'json'"
              src="/img/json.png"
              alt="JSON"
              class="w-10 h-10 object-contain"
            />

            <img
              v-else-if="getIconForItem(file) === 'pdf'"
              src="/img/337946.png"
              alt="PDF"
              class="w-10 h-10 object-contain"
            />

            <img
              v-else-if="getIconForItem(file) === 'zip'"
              src="/img/136544.png"
              alt="ZIP Archive"
              class="w-10 h-10 object-contain"
            />

            <img
              v-else-if="getIconForItem(file) === 'audio'"
              src="/img/audio.png"
              alt="Audio"
              class="w-10 h-10 object-contain"
            />

            <img
              v-else-if="getIconForItem(file) === 'video'"
              src="/img/video.png"
              alt="Video"
              class="w-10 h-10 object-contain"
            />

            <img
              v-else
              src="/img/file.png"
              alt="File"
              class="w-10 h-10 object-contain"
            />
          </div>
        </template>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 truncate text-sm">
          {{ file.name }}
        </h3>
        <p class="text-xs text-gray-500 mt-1">
          {{ formatBytes(file.size) }}
        </p>
      </div>

      <!-- Three-dot options (top-right) -->
      <div class="absolute top-2 right-2 z-40">
        <button
          @click.stop="$emit('toggle-options', file)"
          class="p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-sm"
          title="More options"
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
          <a
            :href="file.url"
            target="_blank"
            class="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50"
            title="Download"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>

          <button
            @click.stop="$emit('delete', file)"
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

      <!-- File Actions (Hover) -->
      <div
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
      >
        <button
          @click.stop="$emit('delete', file)"
          class="text-white p-2 rounded"
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
  file: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle-options", "delete"]);

const formatBytes = (b) => {
  const bytes = Number(b) || 0;
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  const digits = value < 10 ? 2 : 0;
  return `${value.toFixed(digits)} ${units[i]}`;
};

const getIconForItem = (item) => {
  if (!item) return "file";
  if (item.file_icon) return item.file_icon;
  const mime = item.mime_type || "";
  if (mime.includes("json")) return "json";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.includes("pdf")) return "pdf";
  if (mime.includes("zip") || mime.includes("archive")) return "zip";
  if (mime.startsWith("audio/")) return "audio";
  if (
    mime.includes("word") ||
    (item.name || "").toLowerCase().endsWith(".doc") ||
    (item.name || "").toLowerCase().endsWith(".docx")
  )
    return "doc";
  if (
    mime.includes("excel") ||
    (item.name || "").toLowerCase().endsWith(".xls") ||
    (item.name || "").toLowerCase().endsWith(".xlsx")
  )
    return "sheet";
  const name = (item.name || item.file_name || "").toLowerCase();
  if (name.endsWith(".json")) return "json";
  if (name.endsWith(".zip") || name.endsWith(".rar") || name.endsWith(".7z"))
    return "zip";
  return "file";
};
</script>
