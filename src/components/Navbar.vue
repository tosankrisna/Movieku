<template>
  <header class="bg-primary">
    <nav class="container flex p-4">
      <div class="flex items-center md:gap-6 lg:gap-12">
        <router-link to="/"><img src="../assets/logo.svg" class="w-24 md:w-32 lg:w-48 md:mb-4" alt=""></router-link>
        <ul class="hidden md:flex text-white md:gap-4 lg:gap-8 uppercase">
          <li>
            <router-link to="/">Popular</router-link>
          </li>
          <li>
            <router-link to="/">Now Playing</router-link>
          </li>
          <li>
            <router-link to="/">Top Rated</router-link>
          </li>
          <li>
            <router-link to="/">Upcoming</router-link>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
