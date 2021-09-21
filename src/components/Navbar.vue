<template>
  <header class="bg-primary">
    <nav class="container flex justify-between py-6 lg:py-4 px-3 xl:px-0">
      <div class="flex items-center gap-4 md:gap-6 lg:gap-12">
        <span class="flex md:hidden"><i class="fas fa-bars text-white text-2xl" @click="$emit('toggleSidebar')"></i></span>
        <router-link to="/"><span class="text-white text-xl lg:text-2xl font-semibold">Movieku</span></router-link>
        <ul class="hidden md:flex text-white md:gap-4 lg:gap-8">
          <li>
            <router-link to="/popular" class="text-gray-500">Popular</router-link>
          </li>
          <li>
            <router-link to="/nowplaying" class="text-gray-500">Now Playing</router-link>
          </li>
          <li>
            <router-link to="/toprated" class="text-gray-500">Top Rated</router-link>
          </li>
          <li>
            <router-link to="/upcoming" class="text-gray-500">Upcoming</router-link>
          </li>
        </ul>
      </div>
      <Search />
    </nav>
  </header>
</template>

<script>
import Search from './Search.vue'

export default {
  name: 'Navbar',
  components: {
    Search,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-exact-active{
    font-weight: bold;
    color: #fff;
  }
</style>
