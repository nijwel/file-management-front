<template>
  <div
    class="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col"
  >
    <!-- Logo Section -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center gap-3">
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
          <h3 class="font-bold text-gray-900">FileHub</h3>
          <p class="text-xs text-gray-600">Manager</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-4 space-y-1">
      <!-- Home -->
      <router-link
        to="/dashboard"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        :class="
          activeMenu === 'home'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
        @click="activeMenu = 'home'"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          />
        </svg>
        <span>Home</span>
      </router-link>

      <!-- Profile -->
      <router-link
        to="/profile"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        :class="
          activeMenu === 'profile'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
        @click="activeMenu = 'profile'"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Profile</span>
      </router-link>

      <!-- File Manager -->
      <router-link
        to="/file-manager"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        :class="
          activeMenu === 'files'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
        @click="activeMenu = 'files'"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 9a1 1 0 100 2h8a1 1 0 100-2H4z"
          />
        </svg>
        <span>File Manager</span>
      </router-link>

      <!-- Settings -->
      <button
        @click="activeMenu = 'settings'"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        :class="
          activeMenu === 'settings'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Settings</span>
      </button>

      <!-- Analytics -->
      <button
        @click="activeMenu = 'analytics'"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        :class="
          activeMenu === 'analytics'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
          />
        </svg>
        <span>Analytics</span>
      </button>

      <!-- Messages -->
      <button
        @click="activeMenu = 'messages'"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative"
        :class="
          activeMenu === 'messages'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
          />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        <span>Messages</span>
        <span
          v-if="activeMenu !== 'messages'"
          class="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >3</span
        >
      </button>

      <!-- Help -->
      <button
        @click="activeMenu = 'help'"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        :class="
          activeMenu === 'help'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        "
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Help</span>
      </button>
    </nav>

    <!-- Divider -->
    <div class="px-4 my-2">
      <div class="border-t border-gray-200"></div>
    </div>

    <!-- Logout Button -->
    <div class="p-4">
      <button
        @click="$emit('logout')"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all font-semibold"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeMenu = ref("home");

// Sync active menu with current route
watch(
  () => route.path,
  (path) => {
    if (path === "/dashboard") {
      activeMenu.value = "home";
    } else if (path === "/profile") {
      activeMenu.value = "profile";
    } else if (path.includes("/file-manager")) {
      activeMenu.value = "files";
    }
  },
  { immediate: true },
);

defineEmits(["logout"]);
</script>
