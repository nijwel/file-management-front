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
            v-if="currentPath.length > 0"
            @click="goBack"
            class="text-gray-600 hover:text-gray-900 font-semibold transition-colors flex items-center gap-1"
            title="পূর্ববর্তী"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
            পিছনে
          </button>
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
          <div class="ml-auto">
            <button
              v-if="currentPath.length > 0"
              @click="goBack"
              class="text-gray-600 hover:text-gray-900 font-semibold transition-colors flex items-center gap-1"
              title="পূর্ববর্তী"
            >
              পিছনে
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
            ফাইল আপলোড করুন
            <input
              type="file"
              name="files[]"
              multiple
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
              class="relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all"
            >
              <div
                @dblclick="enterFolder(item)"
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
                  {{ item.all_children ? item.all_children.length : 0 }} আইটেম
                </p>
              </div>

              <!-- Three-dot options (top-right) -->
              <div class="absolute top-2 right-2 z-40">
                <button
                  @click.stop="toggleOptions(item)"
                  class="p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-sm"
                  title="বিস্তারিত"
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
                  v-if="openOptionsId === item.id"
                  class="absolute top-8 right-0 mt-1 bg-white rounded shadow-lg p-1 flex"
                >
                  <button
                    @click.stop="deleteItem(item)"
                    class="text-red-600 p-2 rounded hover:bg-red-50"
                    title="ডিলিট করুন"
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
                  </button>
                </div>
              </div>

              <!-- Folder Actions (Hover) -->
              <div
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1"
              >
                <button
                  @click.stop="renameItem(item)"
                  class="hover:bg-gray-700 text-gray hover:text-white p-2 rounded"
                  title="রিনেম করুন"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                </button>
                <button
                  @click.stop="deleteItem(item)"
                  class="hover:bg-red-700 text-white p-2 rounded"
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
              class="relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all"
            >
              <div
                class="relative h-32 bg-gray-100 flex items-center justify-center overflow-hidden"
              >
                <template
                  v-if="item.mime_type && item.mime_type.startsWith('image/')"
                >
                  <img
                    :src="item.url"
                    :alt="item.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </template>
                <template v-else>
                  <div
                    class="w-full h-full flex items-center justify-center text-gray-400"
                  >
                    <svg
                      v-if="getIconForItem(item) === 'pdf'"
                      class="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6z"
                      />
                    </svg>
                    <svg
                      v-else-if="getIconForItem(item) === 'json'"
                      class="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm3 5h4v1H8V8zm0 2h4v1H8v-1z"
                      />
                    </svg>
                    <svg
                      v-else-if="getIconForItem(item) === 'archive'"
                      class="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M3 7a1 1 0 011-1h12a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM8 9h4v2H8V9z"
                      />
                    </svg>
                    <svg
                      v-else-if="getIconForItem(item) === 'audio'"
                      class="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 4v8a3 3 0 11-2-2.83V6a1 1 0 112 0zM14 7v6" />
                    </svg>
                    <svg
                      v-else-if="getIconForItem(item) === 'video'"
                      class="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4h12v12H4zM8 7l5 3-5 3V7z" />
                    </svg>
                    <svg
                      v-else
                      class="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M3 7a1 1 0 011-1h12a1 1 0 011 1v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM7 9h6v2H7V9z"
                      />
                    </svg>
                  </div>
                </template>
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 truncate text-sm">
                  {{ item.name }}
                </h3>
                <p class="text-xs text-gray-500 mt-1">
                  {{ (item.size / 1024).toFixed(2) }} KB
                </p>
              </div>

              <!-- Three-dot options (top-right) -->
              <div class="absolute top-2 right-2 z-40">
                <button
                  @click.stop="toggleOptions(item)"
                  class="p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-sm"
                  title="বিস্তারিত"
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
                  v-if="openOptionsId === item.id"
                  class="absolute top-8 right-0 mt-1 bg-white rounded shadow-lg p-1 flex"
                >
                  <button
                    @click.stop="deleteItem(item)"
                    class="text-red-600 p-2 rounded hover:bg-red-50"
                    title="ডিলিট করুন"
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
                  </button>
                </div>
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
                  @click.stop="deleteItem(item)"
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
                  <div class="flex items-center gap-2 relative">
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
                      <svg
                        v-if="getIconForItem(item) === 'image'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        />
                      </svg>
                      <svg
                        v-else-if="getIconForItem(item) === 'json'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm3 5h4v1H8V8zm0 2h4v1H8v-1z"
                        />
                      </svg>
                      <svg
                        v-else-if="getIconForItem(item) === 'pdf'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        v-else-if="getIconForItem(item) === 'archive'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 9a1 1 0 100 2h8a1 1 0 100-2H4z"
                        />
                      </svg>
                      <svg
                        v-else-if="getIconForItem(item) === 'audio'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9 2a1 1 0 000 2 7 7 0 100 14 1 1 0 100-2 5 5 0 110-10 1 1 0 000-2z"
                        />
                      </svg>
                      <svg
                        v-else-if="getIconForItem(item) === 'video'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm13 4V8m0 4v-2m4-4a1 1 0 00-1.82-.5l-3.5 5.25-1.5-2.25a1 1 0 00-1.82.5"
                        />
                      </svg>
                      <svg v-else fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="font-medium text-gray-900">{{
                      item.name
                    }}</span>
                    <div class="ml-auto relative">
                      <button
                        @click.stop="toggleOptions(item)"
                        class="p-1 rounded hover:bg-gray-100"
                        title="বিস্তারিত"
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
                          @click.stop="deleteItem(item)"
                          class="text-red-600 p-1 rounded hover:bg-red-50 flex items-center gap-1"
                          title="ডিলিট করুন"
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
                          ডিলিট
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ item.type === "folder" ? "ফোল্ডার" : "ফাইল" }}
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
                      @click.stop="renameItem(item)"
                      class="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      রিনেম
                    </button>
                    <button
                      @click.stop="deleteItem(item)"
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
            <div class="text-sm font-medium text-gray-600 mb-2">
              মোট ফোল্ডার
            </div>
            <div class="text-2xl font-bold text-gray-900">
              {{ totalFolders }}
            </div>
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
            নাম পরিবর্তন
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
            ডিলিট করুন
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../utils/axios";
import Sidebar from "../components/Sidebar.vue";
import { showToast } from "../utils/toast";

// State
const foldersList = ref([]); // folders in current folder
const filesList = ref([]); // files in current folder
const breadcrumb = ref([]); // array of folder objects (breadcrumb)
const currentFolderId = ref(null); // null means root

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

// Options menu for individual items (three-dot menu)
const openOptionsId = ref(null);

const toggleOptions = (item) => {
  openOptionsId.value = openOptionsId.value === item.id ? null : item.id;
};

// Load folders and files for a folder id (null => root)
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
      // Specific folder endpoint returns all_children and files
      const res = await api.get(`/api/user/folders/${folderId}`);
      const folderData = res.data?.result || res.data;
      foldersList.value = folderData.all_children || [];
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
      title: "ত্রুটি",
      message: "আইটেম লোড করতে ব্যর্থ হয়েছে",
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

const currentPath = computed(() => breadcrumb.value);

const totalFiles = computed(() => filesList.value.length);
const totalFolders = computed(() => foldersList.value.length);
const totalSize = computed(() => {
  const size = filesList.value.reduce((s, f) => s + (f.size || 0), 0);
  return (size / (1024 * 1024)).toFixed(2) + " MB";
});

// Navigation
const enterFolder = async (folder) => {
  try {
    breadcrumb.value.push(folder);
    currentFolderId.value = folder.id;

    // Fetch folder detail which includes all_children and files
    const res = await api.get(`/api/user/folders/${folder.id}`);
    const folderData = res.data?.result || res.data;

    foldersList.value = folderData.all_children || [];
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
      title: "ত্রুটি",
      message: "ফোল্ডার খোলা যায়নি",
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
        foldersList.value = folderData.all_children || [];
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
          title: "ত্রুটি",
          message: "পিছনে যেতে সমস্যা হয়েছে",
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

    foldersList.value = folderData.all_children || [];
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
      title: "ত্রুটি",
      message: "ফোল্ডার লোড করা যায়নি",
      type: "error",
    });
  }
};

// Create folder
const createFolder = async () => {
  if (!newFolderName.value.trim()) {
    showToast({
      title: "ত্রুটি",
      message: "ফোল্ডারের নাম লিখুন",
      type: "error",
    });
    return;
  }
  try {
    const payload = { name: newFolderName.value };
    if (currentFolderId.value) payload.parent_id = currentFolderId.value;
    const res = await api.post("/api/user/folders", payload);
    showToast({
      title: "সফল",
      message: "ফোল্ডার তৈরি হয়েছে",
      type: "success",
    });
    showCreateFolderModal.value = false;
    newFolderName.value = "";
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Create folder failed:", err);
    showToast({
      title: "ত্রুটি",
      message: "ফোল্ডার তৈরি করা যায়নি",
      type: "error",
    });
  }
};

// Helper: Get file type icon based on MIME type
const getFileIcon = (mimeType) => {
  if (!mimeType) return "file";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("zip") || mimeType.includes("archive"))
    return "archive";
  if (mimeType.includes("word")) return "doc";
  if (mimeType.includes("sheet") || mimeType.includes("excel")) return "sheet";
  if (mimeType.startsWith("audio/")) return "audio";
  return "file";
};

// Prefer explicit file_icon property, then mime type, then filename extension
const getIconForItem = (item) => {
  if (!item) return "file";
  if (item.file_icon) return item.file_icon; // backend-provided hint like 'json', 'zip'
  const mime = item.mime_type || "";
  if (mime.includes("json")) return "json";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.includes("pdf")) return "pdf";
  if (mime.includes("zip") || mime.includes("archive")) return "archive";
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
    return "archive";
  return "file";
};

// Upload files
const uploadFiles = async (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const fd = new FormData();
  files.forEach((f) => fd.append("files[]", f));
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
  try {
    // Do not set Content-Type header manually; let the browser set the boundary
    await api.post("/api/user/files", fd);
    showToast({ title: "সফল", message: "ফাইল আপলোড হয়েছে", type: "success" });
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Upload failed:", err);
    showToast({
      title: "ত্রুটি",
      message: "ফাইল আপলোড করতে ব্যর্থ হয়েছে",
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
    showToast({ title: "ত্রুটি", message: "নাম লিখুন", type: "error" });
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
      title: "সফল",
      message: "নাম পরিবর্তন হয়েছে",
      type: "success",
    });
    showRenameModal.value = false;
    renamingValue.value = "";
    renamingItem.value = null;
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Rename failed:", err);
    showToast({
      title: "ত্রুটি",
      message: "নাম পরিবর্তন করা যায়নি",
      type: "error",
    });
  }
};

// Delete
const deleteItem = async (idxOrItem, typeOrType) => {
  const item = typeof idxOrItem === "object" ? idxOrItem : null;
  const type = item ? item.type : typeOrType;
  const confirmMsg = `এই ${type === "folder" ? "ফোল্ডার" : "ফাইল"} ডিলিট করতে চান?`;
  if (!confirm(confirmMsg)) return;
  try {
    const id = item ? item.id : null;
    if (!id) return;
    if (type === "folder") await api.delete(`/api/user/folders/${id}`);
    else await api.delete(`/api/user/files/${id}`);
    showToast({ title: "সফল", message: "আইটেম ডিলিট হয়েছে", type: "success" });
    await loadItems(currentFolderId.value);
  } catch (err) {
    console.error("Delete failed:", err);
    showToast({ title: "ত্রুটি", message: "ডিলিট করা যায়নি", type: "error" });
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
