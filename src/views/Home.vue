<template>
  <Loader v-if="loader" />
  <Navbar v-if="!loader" />
  <Hero v-if="!loader" />

  <div class="home" v-if="!loader">
    <Cards :title="'Popular Movies'" :type="'popular'" />
    <Cards :title="'Now Playing Movies'" :type="'now_playing'" />
    <Cards :title="'Top Rated Movies'" :type="'top_rated'" />
    <Cards :title="'Upcoming Movies'" :type="'upcoming'" />
  </div>
  
  <Footer v-if="!loader" />
</template>

<script>
import Cards from '@/components/Cards'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Cards,
    Loader,
    Navbar,
    Hero,
    Footer
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
      }, 4000)
    }
  },
  mounted() {
    if (this.loader) this.showLoader()
  } 
}
</script>
