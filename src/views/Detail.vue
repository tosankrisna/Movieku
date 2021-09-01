<template>
  <Loader v-if="loader" />
  <Navbar v-if="!loader" />

  <div class="bg-primary" v-if="!loader">
    <div class="bg-no-repeat bg-center bg-cover bg-top mb-12" :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.9)) ,url(${img_url}/t/p/w1280/${movie.backdrop_path})`">
      <div class="container">
        <div class="flex py-16">
          <div class="flex mr-10 h-md">
            <img :src="`${img_url}/t/p/w500/${movie.poster_path}`" class="rounded-md">
          </div>
          <div class="flex flex-1 flex-col gap-2.5 place-content-center">
            <h1 class="text-white text-4xl font-semibold">{{ movie.title }}</h1>
            <div class="flex items-center text-sm gap-2">
              <i class="fas fa-star text-white"></i>
              <span class="text-white">{{ movie.vote_average }} / 10</span>
            </div>
            <p class="text-white text-sm">{{ dateFormat(movie.release_date) }}</p>
            <div class="flex gap-2">
              <div class="flex" v-for="genre in movie.genres" :key="genre.id">
                <span class="text-white text-sm">{{ genre.name }}</span>
              </div>
            </div>
            <p class="text-white text-md text-justify w-4/5">{{ movie.overview }}</p>
          </div>
          <div class="flex w-1/4">
            <span class="flex justify-center cursor-pointer">
              <span class="animate-ping absolute self-center inline-flex h-28 w-28 rounded-full bg-blue-400 opacity-50"></span>
              <span class="relative inline-flex justify-center self-center rounded-full h-24 w-24 bg-blue-600">
                <i class="flex self-center fas fa-play fa-2x text-white"></i>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <Cards :title="'Movie Actors'" :type="'credits'" :movieId="movie_id" />
      <Cards :title="'Similar Movies'" :type="'similar'" :movieId="movie_id" />
      <Cards :title="'Recommendation Movies'" :type="'recommendations'" :movieId="movie_id" />
    </div>
  </div>

  <Footer v-if="!loader" />
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import Loader from '@/components/Loader'
import Cards from '@/components/Cards'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Loader,
    Cards,
    Navbar,
    Footer,
  },
  data() {
    return {
      loader: false,
      movie: {},
      movie_id: this.$route.params.movieId,
      base_url: process.env.VUE_APP_BASE_URL,
      api_key: process.env.VUE_APP_API_KEY,
      img_url: process.env.VUE_APP_IMG_URL
    }
  },
  methods: {
    dateFormat(data) {
      return moment(data).format('LL')
    }
  },
  async mounted() {
    this.loader = true
    
    try {
      const request = await axios.get(`${this.base_url}/3/movie/${this.movie_id}?api_key=${this.api_key}&language=en-US`)
      const response = request.data

      // console.log('movie', response)

      this.movie = response
    } catch (error) {
      console.log(error.message)
    } finally {
      setTimeout(() => {
        this.loader = false
      }, 2000)
    }
  }
}
</script>

<style>

</style>