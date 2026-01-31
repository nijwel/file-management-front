<template>
  <div
    v-if="filteredItems.length > 0"
    class="bg-white rounded-lg border border-gray-200 overflow-hidden"
  >
    <table class="w-full">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900">
            Name
          </th>
          <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900">
            Type
          </th>
          <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900">
            Size
          </th>
          <th class="px-6 py-3 text-right text-xs font-semibold text-gray-900">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredItems"
          :key="`${item.type}-${item.id}`"
          class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <td class="px-6 py-4 text-sm">
            <div class="flex items-center gap-2 relative">
              <div v-if="item.type === 'folder'" class="w-5 h-5 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  />
                </svg>
              </div>
              <div v-else class="w-5 h-5">
                <img
                  v-if="getIconForItem(item) === 'image'"
                  src="/img/jpg.png"
                  alt="Image"
                  class="w-full h-full object-contain"
                />

                <img
                  v-else-if="getIconForItem(item) === 'json'"
                  src="/img/json.png"
                  alt="JSON"
                  class="w-full h-full object-contain"
                />

                <img
                  v-else-if="getIconForItem(item) === 'pdf'"
                  src="/img/pdf.png"
                  alt="PDF"
                  class="w-full h-full object-contain"
                />

                <img
                  v-else-if="getIconForItem(item) === 'zip'"
                  src="/img/zip.png"
                  alt="ZIP Archive"
                  class="w-full h-full object-contain"
                />

                <img
                  v-else-if="getIconForItem(item) === 'audio'"
                  src="/img/audio.png"
                  alt="Audio"
                  class="w-full h-full object-contain"
                />

                <img
                  v-else-if="getIconForItem(item) === 'video'"
                  src="/img/video.png"
                  alt="Video"
                  class="w-full h-full object-contain"
                />

                <img
                  v-else
                  src="/img/file.png"
                  alt="File"
                  class="w-full h-full object-contain"
                />
              </div>
              <span class="font-medium text-gray-900">{{ item.name }}</span>
              <div class="ml-auto relative">
                <button
                  @click.stop="toggleOptions(item)"
                  class="p-1 rounded hover:bg-gray-100"
                  title="More options"
                >
                  <svg
                    class="w-4 h-4 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
                <div
                  v-if="openOptionsId === item.id"
                  class="absolute right-0 mt-2 bg-white shadow rounded p-1 z-50"
                >
                  <button
                    @click.stop="$emit('delete', item)"
                    class="text-red-600 p-1 rounded hover:bg-red-50 flex items-center gap-1"
                    title="Delete"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-600">
            {{ item.type === "folder" ? "folder" : "file" }}
          </td>
          <td class="px-6 py-4 text-sm text-gray-600">
            {{ item.type === "folder" ? "-" : formatBytes(item.size) }}
          </td>
          <td class="px-6 py-4 text-sm text-right">
            <div class="flex gap-2 justify-end">
              <button
                v-if="item.type === 'folder'"
                @click.stop="$emit('rename', item)"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                Rename
              </button>
              <button
                @click.stop="$emit('delete', item)"
                class="text-red-600 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
  folders: {
    type: Array,
    default: () => [],
  },
  files: {
    type: Array,
    default: () => [],
  },
  searchQuery: {
    type: String,
    default: "",
  },
  sortBy: {
    type: String,
    default: "name",
  },
});

defineEmits(["rename", "delete"]);

const openOptionsId = ref(null);

const toggleOptions = (item) => {
  openOptionsId.value = openOptionsId.value === item.id ? null : item.id;
};

const filteredItems = computed(() => {
  let items = [...props.folders, ...props.files];
  if (props.searchQuery) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(props.searchQuery.toLowerCase()),
    );
  }
  if (props.sortBy === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    items.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
  }
  return items;
});

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
