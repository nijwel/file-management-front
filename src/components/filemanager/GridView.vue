<template>
  <div
    v-if="filteredItems.length > 0"
    class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
  >
    <FolderCard
      v-for="folder in folders"
      :key="`folder-${folder.id}`"
      :folder="folder"
      :counts="getFolderCounts(folder)"
      :is-open="openOptionsId === folder.id"
      @enter-folder="$emit('enter-folder', $event)"
      @toggle-options="toggleOptions"
      @rename="$emit('rename', $event)"
      @delete="$emit('delete', $event)"
    />

    <FileCard
      v-for="file in files"
      :key="`file-${file.id}`"
      :file="file"
      :is-open="openOptionsId === file.id"
      @toggle-options="toggleOptions"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";
import FolderCard from "./FolderCard.vue";
import FileCard from "./FileCard.vue";

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

defineEmits(["enter-folder", "rename", "delete"]);

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

const countFilesDeep = (node) => {
  let count = Array.isArray(node?.files) ? node.files.length : 0;
  const children = node?.all_children || node?.children || [];
  for (const c of children) count += countFilesDeep(c);
  return count;
};

const countFoldersDeep = (node) => {
  const children = node?.all_children || node?.children || [];
  let count = children.length;
  for (const c of children) count += countFoldersDeep(c);
  return count;
};

const getFolderCounts = (f) => {
  const n = (v) => {
    const num = Number(v);
    return Number.isFinite(num) ? num : 0;
  };
  const foldersProp =
    n(f?.children_count) ||
    n(f?.all_children_count) ||
    n(f?.folders_count) ||
    n(f?.count_folders);
  const filesProp =
    n(f?.files_count) ||
    n(f?.file_count) ||
    n(f?.total_files) ||
    n(f?.count_files);
  const folders = foldersProp > 0 ? foldersProp : countFoldersDeep(f);
  const files = filesProp > 0 ? filesProp : countFilesDeep(f);
  return { folders, files };
};
</script>
