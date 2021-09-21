<template>
  <Loader v-if="loader" />
  <Hero />
  <div class="home" v-if="!loader">
    <Cards :title="'Popular Movies'" :type="'popular'" />
    <Cards :title="'Now Playing Movies'" :type="'now_playing'" />
    <Cards :title="'Top Rated Movies'" :type="'top_rated'" />
    <Cards :title="'Upcoming Movies'" :type="'upcoming'" />
  </div>
</template>

<script>
import Cards from '@/components/Cards'
import Loader from '@/components/Loader'
import Hero from '@/components/Hero'

export default {
  name: 'Home',
  components: {
    Cards,
    Loader,
    Hero
  },
  data() {
    return {
      loader: true
    }
  },
  methods: {
    showLoader() {
      setTimeout(() => {
        this.loader = false
      }, 1000)
    }
  },
  mounted() {
    if (this.loader) this.showLoader()
  } 
}
</script>
