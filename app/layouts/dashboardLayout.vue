<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :class="{ 'hidden': !isSidebarOpen && isMobile }"/>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <Topbar @toggleSidebar="toggleSidebar"  />
      <main class="p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
    const isSidebarOpen = ref(false)
    const isMobile = ref(false)

    const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
    }

    onMounted(() => {
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
    })
    })
</script>
