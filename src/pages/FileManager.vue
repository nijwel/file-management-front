<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar @logout="logout" />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Navigation Bar -->
      <div class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">File Manager</h1>
              <p class="text-sm text-gray-500">Manage your files and folders</p>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="flex-1 max-w-xs mx-8">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-colors"
            />
          </div>

          <!-- View Toggle -->
          <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              @click="viewMode = 'grid'"
              :class="
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="p-2 rounded transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"
                />
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="p-2 rounded transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-8 py-6">
        <!-- Breadcrumb Navigation -->
        <div class="mb-6 flex items-center gap-2 text-sm">
          <button
            v-if="currentPath.length > 0"
            @click="goBack"
            class="text-gray-600 hover:text-gray-900 font-semibold transition-colors flex items-center gap-1"
            title="Previous"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Back
          </button>
          <button
            @click="goToRoot"
            class="text-gray-900 hover:text-gray-600 font-semibold transition-colors"
          >
            Home
          </button>
          <span
            v-for="(folder, idx) in currentPath"
            :key="idx"
            class="flex items-center gap-2"
          >
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <button
              @click="goToFolder(idx)"
              :class="
                idx === currentPath.length - 1
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              "
              class="transition-colors"
            >
              {{ folder.name }}
            </button>
          </span>
          <div class="ml-auto">
            <button
              v-if="currentPath.length > 0"
              @click="goBack"
              class="text-gray-600 hover:text-gray-900 font-semibold transition-colors flex items-center gap-1"
              title="Previous"
            >
              Back
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Actions Toolbar -->
        <div
          class="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex gap-2 flex-wrap sticky top-20 z-30"
        >
          <button
            @click="showCreateFolderModal = true"
            class="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 9a1 1 0 100 2h8a1 1 0 100-2H4z"
              />
            </svg>
            New folder
          </button>
          <label
            class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              />
            </svg>
            Upload files
            <input
              type="file"
              multiple
              @change="handleFileUpload"
              class="hidden"
            />
          </label>

          <!-- Divider -->
          <div class="border-l border-gray-300"></div>

          <!-- Sort & Filter -->
          <div class="ml-auto flex gap-2">
            <button
              @click="sortBy = sortBy === 'name' ? 'date' : 'name'"
              class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zm0 6a1 1 0 000 2h5a1 1 0 000-2H3zm0 6a1 1 0 000 2h4a1 1 0 000-2H3z"
                  clip-rule="evenodd"
                />
              </svg>
              Sort
            </button>
            <button
              @click="toggleUploadArea"
              class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
              Details
            </button>
          </div>
        </div>

        <!-- File Grid View -->
        <GridView
          v-if="viewMode === 'grid' && currentItems.length > 0"
          :folders="foldersList"
          :files="filesList"
          :search-query="searchQuery"
          :sort-by="sortBy"
          @enter-folder="enterFolder"
          @rename="renameItem"
          @delete="deleteItem"
        />

        <!-- File List View -->
        <ListView
          v-else-if="viewMode === 'list' && currentItems.length > 0"
          :folders="foldersList"
          :files="filesList"
          :search-query="searchQuery"
          :sort-by="sortBy"
          @rename="renameItem"
          @delete="deleteItem"
        />

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-20 bg-white rounded-lg border border-gray-200"
        >
          <svg
            class="w-20 h-20 text-gray-300 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6-4a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            No files here
          </h3>
          <p class="text-gray-600">
            Create a folder or upload an image to get started
          </p>
        </div>

        <!-- Storage Stats -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-lg border border-gray-200 p-4">
            <div class="text-sm font-medium text-gray-600 mb-2">
              Total Files
            </div>
            <div class="text-2xl font-bold text-gray-900">{{ totalFiles }}</div>
          </div>
          <div class="bg-white rounded-lg border border-gray-200 p-4">
            <div class="text-sm font-medium text-gray-600 mb-2">
              Total Folders
            </div>
            <div class="text-2xl font-bold text-gray-900">
              {{ totalFolders }}
            </div>
          </div>
          <div class="bg-white rounded-lg border border-gray-200 p-4">
            <div class="text-sm font-medium text-gray-600 mb-2">Total Size</div>
            <div class="text-2xl font-bold text-gray-900">{{ totalSize }}</div>
          </div>
        </div>

        <!-- Create Folder Modal -->
        <div
          v-if="showCreateFolderModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            class="bg-white rounded-lg p-8 w-96 shadow-2xl border border-gray-200"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Create New Folder
            </h2>
            <input
              v-model="newFolderName"
              @keyup.enter="createFolder"
              type="text"
              placeholder="Enter folder name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900"
              autofocus
            />
            <div class="flex gap-3">
              <button
                @click="createFolder"
                class="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Create
              </button>
              <button
                @click="showCreateFolderModal = false"
                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Rename Modal -->
        <div
          v-if="showRenameModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            class="bg-white rounded-lg p-8 w-96 shadow-2xl border border-gray-200"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Rename Item</h2>
            <input
              v-model="renamingValue"
              @keyup.enter="confirmRename"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900"
              autofocus
            />
            <div class="flex gap-3">
              <button
                @click="confirmRename"
                class="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Rename
              </button>
              <button
                @click="showRenameModal = false"
                class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Context Menu -->
        <div
          v-if="showContextMenu"
          :style="{ top: contextMenuY + 'px', left: contextMenuX + 'px' }"
          class="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-48 py-1"
        >
          <button
            @click.stop="renameItem(contextMenuItem)"
            class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm flex items-center gap-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Rename Item
          </button>
          <button
            @click.stop="deleteItem(contextMenuItem)"
            class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm flex items-center gap-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from "vue";
import { useRouter } from "vue-router";
import api from "../utils/axios";
import Sidebar from "../components/Sidebar.vue";
import GridView from "../components/filemanager/GridView.vue";
import ListView from "../components/filemanager/ListView.vue";
import { showToast } from "../utils/toast";

// State
const foldersList = ref([]); // folders in current folder
const filesList = ref([]); // files in current folder
const breadcrumb = ref([]); // array of folder objects (breadcrumb)
const currentFolderId = ref(null); // null means root
const selectedFiles = ref(null);

const showCreateFolderModal = ref(false);
const showRenameModal = ref(false);
const newFolderName = ref("");
const renamingValue = ref("");
const renamingItem = ref(null);
const searchQuery = ref("");
const viewMode = ref("grid");
const sortBy = ref("name");
const showContextMenu = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);
const contextMenuItem = ref(null);
const contextMenuIndex = ref(0);

const currentPath = computed(() => breadcrumb.value);
const loadItems = async (folderId = null) => {
  currentFolderId.value = folderId;
  try {
    // Root listing returns both folders and rootFiles under result
    if (folderId === null) {
      const res = await api.get("/api/user/folders");
      const data = res.data?.result || res.data;
      const foldersData =
        data?.folders?.data || data?.data || data?.folders || [];
      foldersList.value = foldersData || [];

      const rawFiles = data?.rootFiles || [];
      const base = api.defaults.baseURL
        ? api.defaults.baseURL.replace(/\/$/, "")
        : "";
      filesList.value = rawFiles.map((f) => ({
        ...f,
        name: f.original_name || f.file_name || f.file_path || "",
        url: f.file_path ? (base ? base + "/" + f.file_path : f.file_path) : "",
      }));
    } else {
      // Specific folder endpoint returns children and files (fallback to all_children)
      const res = await api.get(`/api/user/folders/${folderId}`);
      const folderData = res.data?.result || res.data;
      foldersList.value = folderData.children || folderData.all_children || [];
      const rawFiles = folderData.files || [];
      const base = api.defaults.baseURL
        ? api.defaults.baseURL.replace(/\/$/, "")
        : "";
      filesList.value = rawFiles.map((f) => ({
        ...f,
        name: f.original_name || f.file_name || f.file_path || "",
        url: f.file_path ? (base ? base + "/" + f.file_path : f.file_path) : "",
      }));
    }

    console.debug("Loaded folders:", foldersList.value);
    console.debug("Loaded files:", filesList.value);
  } catch (err) {
    console.error("Failed to load items:", err);
    showToast({
      title: "Error",
      message: "Failed to load items",
      type: "error",
    });
  }
};

onMounted(() => {
  loadItems(null);
});

// Combined current items for the template
const currentItems = computed(() => {
  const folders = foldersList.value.map((f) => ({ ...f, type: "folder" }));
  const files = filesList.value.map((f) => ({ ...f, type: "file" }));
  return [...folders, ...files];
});

const filteredItems = computed(() => {
  let items = currentItems.value.slice();
  if (searchQuery.value) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }
  if (sortBy.value === "name")
    items.sort((a, b) => a.name.localeCompare(b.name));
  else items.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
  return items;
});

const totalFiles = computed(() => filesList.value.length);
const totalFolders = computed(() => foldersList.value.length);
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
const totalSize = computed(() => {
  const size = filesList.value.reduce((s, f) => s + (f.size || 0), 0);
  return formatBytes(size);
});

// Navigation
const enterFolder = async (folder) => {
  try {
    breadcrumb.value.push(folder);
    currentFolderId.value = folder.id ? folder.id : null;

    // Fetch folder detail which includes children/files (fallback to all_children)
    const res = await api.get(`/api/user/folders/${folder.id}`);
    const folderData = res.data?.result || res.data;

    foldersList.value = folderData.children || folderData.all_children || [];
    const rawFiles = folderData.files || [];
    const base = api.defaults.baseURL
      ? api.defaults.baseURL.replace(/\/$/, "")
      : "";
    filesList.value = rawFiles.map((f) => ({
      ...f,
      name: f.original_name || f.file_name || f.file_path || "",
      url: f.file_path ? (base ? base + "/" + f.file_path : f.file_path) : "",
    }));
    console.debug(
      "Entered folder:",
      folder.id,
      foldersList.value,
      filesList.value,
    );
  } catch (err) {
    console.error("Failed to enter folder:", err);
    showToast({
      title: "Error",
      message: "Unable to open folder",
      type: "error",
    });
    breadcrumb.value.pop();
  }
};

const goToRoot = async () => {
  breadcrumb.value = [];
  await loadItems(null);
};

const goBack = async () => {
  if (breadcrumb.value.length > 0) {
    // close any open per-item options
    openOptionsId.value = null;

    breadcrumb.value.pop();
    if (breadcrumb.value.length > 0) {
      const parent = breadcrumb.value[breadcrumb.value.length - 1];
      currentFolderId.value = parent.id;
      try {
        const res = await api.get(`/api/user/folders/${parent.id}`);
        const folderData = res.data?.result || res.data;
        foldersList.value =
          folderData.children || folderData.all_children || [];
        const rawFiles = folderData.files || [];
        const base = api.defaults.baseURL
          ? api.defaults.baseURL.replace(/\/$/, "")
          : "";
        filesList.value = rawFiles.map((f) => ({
          ...f,
          name: f.original_name || f.file_name || f.file_path || "",
          url: f.file_path
            ? base
              ? base + "/" + f.file_path
              : f.file_path
            : "",
        }));
      } catch (err) {
        console.error("Failed to go back:", err);
        showToast({
          title: "Error",
          message: "Failed to navigate back",
          type: "error",
        });
      }
    } else {
      await goToRoot();
    }
  }
};

const goToFolder = async (idx) => {
  const target = breadcrumb.value[idx];
  breadcrumb.value = breadcrumb.value.slice(0, idx + 1);

  try {
    currentFolderId.value = target.id;
    const res = await api.get(`/api/user/folders/${target.id}`);
    const folderData = res.data?.result || res.data;

    foldersList.value = folderData.children || folderData.all_children || [];
    const rawFiles = folderData.files || [];
    const base = api.defaults.baseURL
      ? api.defaults.baseURL.replace(/\/$/, "")
      : "";
    filesList.value = rawFiles.map((f) => ({
      ...f,
      name: f.original_name || f.file_name || f.file_path || "",
      url: f.file_path ? (base ? base + "/" + f.file_path : f.file_path) : "",
    }));
  } catch (err) {
    console.error("Failed to load folder:", err);
    showToast({
      title: "Error",
      message: "Failed to load folder",
      type: "error",
    });
  }
};

// Create folder
const createFolder = async () => {
  if (!newFolderName.value.trim()) {
    showToast({
      title: "Error",
      message: "Please enter a folder name",
      type: "error",
    });
    return;
  }
  try {
    const payload = { name: newFolderName.value };
    if (currentFolderId.value) payload.parent_id = currentFolderId.value;
    const res = await api.post("/api/user/folders", payload);
    showToast({
      title: "Success",
      message: "Folder created",
      type: "success",
    });
    showCreateFolderModal.value = false;
    newFolderName.value = "";
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Create folder failed:", err);
    showToast({
      title: "Error",
      message: "Failed to create folder",
      type: "error",
    });
  }
};

async function handleFileUpload(event) {
  selectedFiles.value = event.target.files;

  const formData = new FormData();
  Array.from(selectedFiles.value).forEach((file) => {
    formData.append("files[]", file);
  });

  if (currentFolderId.value) {
    formData.append("folder_id", currentFolderId.value);
  }

  try {
    if (!selectedFiles.value || selectedFiles.value.length === 0) return;

    const response = await api.post("/api/user/files/multi-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      showToast({
        title: "Success",
        message: "Files uploaded successfully",
        type: "success",
      });
      await loadItems(null);
    } else {
      showToast({
        title: "Error",
        message: "Failed to upload files",
        type: "error",
      });
    }
  } catch (err) {
    console.error("Upload failed:", err);
    showToast({
      title: "Error",
      message: "Failed to upload file",
      type: "error",
    });
  } finally {
    event.target.value = "";
    await loadItems(null);
  }
}

// Upload files
const uploadFiles = async (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const fd = new FormData();
  files.forEach((f) => fd.append("files", f));
  if (currentFolderId.value) {
    fd.append("folder_id", currentFolderId.value);
  }
  console.debug(
    "Uploading files to folder:",
    currentFolderId.value,
    "Files:",
    files,
  );
  // Log FormData entries for debugging (file objects will be File)
  for (const entry of fd.entries()) {
    const [k, v] = entry;
    if (v instanceof File)
      console.debug("FormData entry:", k, v.name, v.type, v.size);
    else console.debug("FormData entry:", k, v);
  }

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 KB";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  try {
    // Do not set Content-Type header manually; let the browser set the boundary
    await api.post("/api/user/files", fd);
    showToast({ title: "Success", message: "File uploaded", type: "success" });
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Upload failed:", err);
    showToast({
      title: "Error",
      message: "Failed to upload file",
      type: "error",
    });
  } finally {
    event.target.value = "";
  }
};

// Rename
const renameItem = (item) => {
  renamingItem.value = item;
  renamingValue.value = item.name;
  showRenameModal.value = true;
};

const confirmRename = async () => {
  if (!renamingValue.value.trim()) {
    showToast({
      title: "Error",
      message: "Please enter a name",
      type: "error",
    });
    return;
  }
  try {
    const item = renamingItem.value;
    if (item.type === "folder") {
      await api.put(`/api/user/folders/${item.id}`, {
        name: renamingValue.value,
      });
    } else {
      await api.put(`/api/user/files/${item.id}`, {
        original_name: renamingValue.value,
      });
    }
    showToast({
      title: "Success",
      message: "Name updated",
      type: "success",
    });
    showRenameModal.value = false;
    renamingValue.value = "";
    renamingItem.value = null;
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Rename failed:", err);
    showToast({
      title: "Error",
      message: "Failed to update name",
      type: "error",
    });
  }
};

// Delete
const deleteItem = async (idxOrItem, typeOrType) => {
  const item = typeof idxOrItem === "object" ? idxOrItem : null;
  const type = item ? item.type : typeOrType;
  const confirmMsg = `Delete this ${type === "folder" ? "folder" : "file"}?`;
  if (!confirm(confirmMsg)) return;
  try {
    const id = item ? item.id : null;
    if (!id) return;
    if (type === "folder") await api.delete(`/api/user/folders/${id}`);
    else await api.delete(`/api/user/files/${id}`);
    showToast({ title: "Success", message: "Item deleted", type: "success" });
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Delete failed:", err);
    showToast({
      title: "Error",
      message: "Failed to delete item",
      type: "error",
    });
  }
};

// Simple logout
const router = useRouter();
const logout = async () => {
  try {
    await api.post("/api/auth/logout");
  } catch (e) {
    // ignore
  }
  localStorage.removeItem("token");
  router.push("/");
};
</script>
