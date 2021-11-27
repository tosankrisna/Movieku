<template>
  <transition name="sidebar">
    <div
      :class="
        `sidebar w-3/4 h-screen bg-primary fixed md:hidden top-0 left-0 z-10 p-6`
      "
      v-if="show"
    >
      <span class="flex text-white right-0 justify-end"
        ><i class="fas fa-times text-2xl" @click="$emit('hideSidebar')"></i
      ></span>
      <ul class="flex flex-col  gap-y-8">
        <li>
          <router-link
            to="/popular"
            class="text-white text-lg"
            @click="$emit('hideSidebar')"
            >Popular</router-link
          >
        </li>
        <li>
          <router-link
            to="/nowplaying"
            class="text-white text-lg"
            @click="$emit('hideSidebar')"
            >Now Playing</router-link
          >
        </li>
        <li>
          <router-link
            to="/toprated"
            class="text-white text-lg"
            @click="$emit('hideSidebar')"
            >Top Rated</router-link
          >
        </li>
        <li>
          <router-link
            to="/upcoming"
            class="text-white text-lg"
            @click="$emit('hideSidebar')"
            >Upcoming</router-link
          >
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["show"],
};
</script>

<style scoped>
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100vw);
}

.sidebar-enter-active {
  transition: all 0.3s ease-out;
}

.sidebar-leave-active {
  transition: all 0.3s ease-in;
}

.sidebar-enter-to,
.sidebar-leave-from {
  transform: translateX(0);
}
</style>
