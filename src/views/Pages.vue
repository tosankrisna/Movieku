<template>
  <Loader v-if="loader" />

  <section class="pages bg-primary" v-if="!loader">
    <div class="cards pb-10">
      <div class="container items-center px-3 xl:pl-0">
        <h1 class="title text-2xl md:text-4xl pt-4 md:pt-8 font-semibold text-white">{{ showTitle }}</h1>
        <div class="items grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-8 my-4 md:my-12">
          <div v-for="res in results" :key="res.id">
            <Card @click="getDetailMovie(res.id)" :cursor="'cursor-pointer'" :data="res" class="flex-1" />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="flex justify-center pb-24">
        <button class="flex items-center text-xl px-14 py-5 text-white bg-blue-500 hover:bg-blue-700 rounded-md" @click="loadMore" v-if="this.$route.name !== 'Actors' && this.btn_show === true">
          <svg :class="`${btn_loader ? '' : 'hidden'} animate-spin -ml-1 mr-3 h-5 w-5 text-white`" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Load More...
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from '@/components/Loader'
import Card from '@/components/Card'
import axios from 'axios'

export default {
  components: {
    Card,
    Loader,
  },
  data() {
    return {
      results: [],
      base_url: process.env.VUE_APP_BASE_URL,
      api_key: process.env.VUE_APP_API_KEY,
      loader: false,
      btn_loader: false,
      current_page: 1,
      btn_show: true
    }
  },
  methods: {
    getDetailMovie(id) {
      return this.$router.push({ name: 'Detail', params: { movieId: id} })
    },
    async loadMore() {
      this.btn_loader = true
      this.current_page++

      try {
        if (this.$route.name === 'Recommendations' || this.$route.name === 'Similar') {
          const requestMovies = await axios.get(`${this.base_url}/3/movie/${this.$route.params.movieId}/${this.$route.name.toLowerCase()}?api_key=${this.api_key}&language=en-US&page=${this.current_page}`)
          const responseMovies = requestMovies.data.results
          
          this.results.push(...responseMovies)

          if(this.$route.name === 'Recommendations') {
            if (this.current_page === 2) {
              this.btn_show = false
            }
          }
        } else {
          const request = await axios.get(`${this.base_url}/3/movie/${this.$route.name.toLowerCase()}?api_key=${this.api_key}&language=en-US&page=${this.current_page}`)
          const response = request.data.results
          
          this.results.push(...response)
        }
      } catch (error) {
        console.log(error)
        this.btn_show = false
      } finally {
        this.btn_loader = false
      }
    }
  },
  computed: {
    showTitle() {
      return this.$route.name === 'Actors' ? 'Movie ' + this.$route.name : this.$route.name.replace('_', ' ') + ' Movies'
    }
  },
  async mounted() {
    this.loader = true

    try {
      if (this.$route.name === 'Recommendations' || this.$route.name === 'Similar') {
        const requestMovies = await axios.get(`${this.base_url}/3/movie/${this.$route.params.movieId}/${this.$route.name.toLowerCase()}?api_key=${this.api_key}&language=en-US&page=${this.current_page}`)
        const responseMovies = requestMovies.data.results
        
        this.results = responseMovies
      } else if(this.$route.name === 'Actors') {
        const requestMovies = await axios.get(`${this.base_url}/3/movie/${this.$route.params.movieId}/credits?api_key=${this.api_key}&language=en-US&page=${this.current_page}`)
        const responseMovies = requestMovies.data.cast

        this.results = responseMovies
      } else {
        const request = await axios.get(`${this.base_url}/3/movie/${this.$route.name.toLowerCase()}?api_key=${this.api_key}&language=en-US&page=${this.current_page}`)
        const response = request.data.results
  
        this.results = response
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        this.loader = false
      }, 1000)
    }
  }
}
</script>

<style>

</style>