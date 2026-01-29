<template>
  <div class="min-h-screen bg-gray-50">
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
            <h1 class="text-xl font-bold text-gray-900">ফাইল ম্যানেজার</h1>
            <p class="text-sm text-gray-500">
              আপনার ফাইল এবং ফোল্ডার পরিচালনা করুন
            </p>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-xs mx-8">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="অনুসন্ধান করুন..."
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
          @click="goToRoot"
          class="text-gray-900 hover:text-gray-600 font-semibold transition-colors"
        >
          হোম
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
      </div>

      <!-- Actions Toolbar -->
      <div
        class="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex gap-2 flex-wrap"
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
          নতুন ফোল্ডার
        </button>
        <label
          class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            />
          </svg>
          ছবি আপলোড করুন
          <input
            type="file"
            multiple
            accept="image/*"
            @change="uploadFiles"
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
            সর্ট
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
            বিস্তারিত
          </button>
        </div>
      </div>

      <!-- File Grid View -->
      <div
        v-if="viewMode === 'grid' && currentItems.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="(item, idx) in filteredItems"
          :key="`${item.type}-${idx}`"
          class="group"
        >
          <!-- Folder Card -->
          <div
            v-if="item.type === 'folder'"
            class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all"
          >
            <div
              @click="enterFolder(item)"
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
                {{ item.name }}
              </h3>
              <p class="text-xs text-gray-500 mt-1">
                {{ item.children ? item.children.length : 0 }} আইটেম
              </p>
            </div>

            <!-- Folder Actions (Hover) -->
            <div
              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
            >
              <button
                @click="renameItem(item, idx)"
                class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                title="রিনেম করুন"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </button>
              <button
                @click="deleteItem(idx, 'folder')"
                class="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                title="ডিলিট করুন"
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

          <!-- Image Card -->
          <div
            v-else
            class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all"
          >
            <div
              class="relative h-32 bg-gray-100 flex items-center justify-center overflow-hidden"
            >
              <img
                :src="item.url"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 truncate text-sm">
                {{ item.name }}
              </h3>
              <p class="text-xs text-gray-500 mt-1">
                {{ (item.size / 1024).toFixed(2) }} KB
              </p>
            </div>

            <!-- Image Actions (Hover) -->
            <div
              class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
            >
              <a
                :href="item.url"
                target="_blank"
                class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                title="ডাউনলোড করুন"
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
                @click="deleteItem(idx, 'file')"
                class="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                title="ডিলিট করুন"
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
      </div>

      <!-- File List View -->
      <div
        v-else-if="viewMode === 'list' && currentItems.length > 0"
        class="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-900"
              >
                নাম
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-900"
              >
                ধরন
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-900"
              >
                আকার
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-semibold text-gray-900"
              >
                অ্যাকশন
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, idx) in filteredItems"
              :key="`${item.type}-${idx}`"
              class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm">
                <div class="flex items-center gap-3">
                  <div
                    v-if="item.type === 'folder'"
                    class="w-5 h-5 text-gray-400"
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      />
                    </svg>
                  </div>
                  <div v-else class="w-5 h-5 text-gray-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <span class="font-medium text-gray-900">{{ item.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ item.type === "folder" ? "ফোল্ডার" : "ইমেজ" }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{
                  item.type === "folder"
                    ? "-"
                    : (item.size / 1024).toFixed(2) + " KB"
                }}
              </td>
              <td class="px-6 py-4 text-sm text-right">
                <div class="flex gap-2 justify-end">
                  <button
                    @click="renameItem(item, idx)"
                    class="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    রিনেম
                  </button>
                  <button
                    @click="deleteItem(idx, item.type)"
                    class="text-red-600 hover:text-red-700 font-medium"
                  >
                    ডিলিট
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
          এখানে কোন ফাইল নেই
        </h3>
        <p class="text-gray-600">
          ফোল্ডার তৈরি করুন বা ছবি আপলোড করুন শুরু করতে
        </p>
      </div>

      <!-- Storage Stats -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-sm font-medium text-gray-600 mb-2">মোট ফাইল</div>
          <div class="text-2xl font-bold text-gray-900">{{ totalFiles }}</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-sm font-medium text-gray-600 mb-2">মোট ফোল্ডার</div>
          <div class="text-2xl font-bold text-gray-900">{{ totalFolders }}</div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="text-sm font-medium text-gray-600 mb-2">মোট আকার</div>
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
            নতুন ফোল্ডার তৈরি করুন
          </h2>
          <input
            v-model="newFolderName"
            @keyup.enter="createFolder"
            type="text"
            placeholder="ফোল্ডারের নাম লিখুন"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-900"
            autofocus
          />
          <div class="flex gap-3">
            <button
              @click="createFolder"
              class="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              তৈরি করুন
            </button>
            <button
              @click="showCreateFolderModal = false"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition-colors"
            >
              বাতিল
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
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            নাম পরিবর্তন করুন
          </h2>
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
              সংরক্ষণ করুন
            </button>
            <button
              @click="showRenameModal = false"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition-colors"
            >
              বাতিল
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const folders = ref([]);
const currentPathIndices = ref([]);
const showCreateFolderModal = ref(false);
const showRenameModal = ref(false);
const newFolderName = ref("");
const renamingValue = ref("");
const searchQuery = ref("");
const viewMode = ref("grid");
const sortBy = ref("name");
let renamingItemIdx = null;

// Get current folder
const getCurrentFolder = () => {
  let current = { children: folders };
  for (const idx of currentPathIndices.value) {
    current = current.children[idx];
  }
  return current;
};

// Get current items
const currentItems = computed(() => {
  const folder = getCurrentFolder();
  return folder.children || [];
});

// Filtered items
const filteredItems = computed(() => {
  let items = currentItems.value;

  // Search
  if (searchQuery.value) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  // Sort
  if (sortBy.value === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  return items;
});

// Get current path
const currentPath = computed(() => {
  let current = { children: folders, name: "হোম" };
  const path = [];
  for (const idx of currentPathIndices.value) {
    current = current.children[idx];
    path.push(current);
  }
  return path;
});

// Calculate stats
const totalFiles = computed(() => {
  let count = 0;
  const countFiles = (items) => {
    items?.forEach((item) => {
      if (item.type === "file") count++;
      else countFiles(item.children);
    });
  };
  countFiles(folders.value);
  return count;
});

const totalFolders = computed(() => {
  let count = 0;
  const countFolders = (items) => {
    items?.forEach((item) => {
      if (item.type === "folder") {
        count++;
        countFolders(item.children);
      }
    });
  };
  countFolders(folders.value);
  return count;
});

const totalSize = computed(() => {
  let size = 0;
  const calculateSize = (items) => {
    items?.forEach((item) => {
      if (item.type === "file") size += item.size || 0;
      else calculateSize(item.children);
    });
  };
  calculateSize(folders.value);
  return (size / (1024 * 1024)).toFixed(2) + " MB";
});

// Create folder
const createFolder = () => {
  if (!newFolderName.value.trim()) {
    alert("ফোল্ডারের নাম লিখুন");
    return;
  }

  const newFolder = {
    type: "folder",
    name: newFolderName.value,
    children: [],
    createdAt: Date.now(),
  };

  const current = getCurrentFolder();
  if (!current.children) current.children = [];
  current.children.push(newFolder);

  newFolderName.value = "";
  showCreateFolderModal.value = false;
};

// Enter folder
const enterFolder = (folder) => {
  const current = getCurrentFolder();
  const idx = current.children.indexOf(folder);
  if (idx !== -1) {
    currentPathIndices.value.push(idx);
  }
};

// Go back to root
const goToRoot = () => {
  currentPathIndices.value = [];
};

// Go to specific folder
const goToFolder = (idx) => {
  currentPathIndices.value = currentPathIndices.value.slice(0, idx);
};

// Upload files
const uploadFiles = (event) => {
  const files = Array.from(event.target.files);
  const current = getCurrentFolder();
  if (!current.children) current.children = [];

  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        current.children.push({
          type: "file",
          name: file.name,
          url: e.target.result,
          size: file.size,
          createdAt: Date.now(),
        });
      };
      reader.readAsDataURL(file);
    }
  });

  // Reset input
  event.target.value = "";
};

// Rename item
const renameItem = (item, idx) => {
  renamingValue.value = item.name;
  renamingItemIdx = idx;
  showRenameModal.value = true;
};

// Confirm rename
const confirmRename = () => {
  if (!renamingValue.value.trim()) {
    alert("নাম লিখুন");
    return;
  }

  const current = getCurrentFolder();
  current.children[renamingItemIdx].name = renamingValue.value;
  showRenameModal.value = false;
  renamingValue.value = "";
};

// Delete item
const deleteItem = (idx, type) => {
  if (confirm(`এই ${type === "folder" ? "ফোল্ডার" : "ফাইল"} ডিলিট করতে চান?`)) {
    const current = getCurrentFolder();
    current.children.splice(idx, 1);
  }
};

// Toggle upload area
const toggleUploadArea = () => {
  // Placeholder for future upload area UI
  console.log("Upload area toggled");
};
</script>
