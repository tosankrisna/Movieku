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
      <div class="hidden md:flex flex-1 justify-end items-center">
        <input type="text" class="h-10 md:lg-1/2 lg:w-2/5 bg-none px-2 rounded-full px-4 outline-none" placeholder="Search movie...">
        <div class="relative">
          <i class="fas fa-search absolute right-5 -top-2 text-gray-400"></i>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
