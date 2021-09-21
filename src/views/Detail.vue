<template>
  <Loader v-if="loader" />

  <div class="bg-primary" v-if="!loader">
    <div class="bg-no-repeat bg-center bg-cover bg-top mb-12" :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.9)) ,url(${img_url}/t/p/w1280/${movie.backdrop_path})`">
      <div class="container">
        <div class="flex items-center pt-8 lg:pt-12 flex-col lg:flex-row py-2 md:py-16">
          <div class="flex w-44 h-64 md:w-60 md:h-80 lg:w-1/4 lg:mx-10 mb-4 lg:h-2/4">
            <img :src="`${img_url}/t/p/w500/${movie.poster_path}`" class="rounded-md">
          </div>
          <div class="flex flex-1 text-center lg:text-left flex-col gap-2.5 place-content-center">
            <h1 class="text-white text-xl lg:text-4xl px-2 lg:px-0 font-semibold">{{ movie.title }}</h1>
            <div class="flex items-center justify-center lg:justify-start text-sm gap-2">
              <i class="fas fa-star text-white"></i>
              <span class="text-white">{{ movie.vote_average }} / 10</span>
            </div>
            <p class="text-white text-sm">{{ dateFormat(movie.release_date) }}</p>
            <div class="flex justify-center lg:justify-start gap-2">
              <div class="flex" v-for="genre in movie.genres" :key="genre.id">
                <span class="text-white text-sm">{{ genre.name }}</span>
              </div>
            </div>
            <p class="text-white text-sm lg:text-md text-justify px-6 lg:px-0 lg:w-4/5">{{ movie.overview }}</p>
          </div>
          <div class="flex w-1/4 justify-center lg:justify-start mt-5 mb-10 md:mb-8 md:mt-8 lg:my-0">
            <span class="flex justify-center cursor-pointer">
              <span class="animate-ping absolute self-center inline-flex w-14 h-14 md:w-20 md:h-20 lg:h-28 lg:w-28 rounded-full bg-blue-400 opacity-50"></span>
              <a class="flex self-center" :href="`https://www.youtube.com/watch?v=${video}`" target="_blank">
                <span class="relative inline-flex justify-center self-center rounded-full w-16 h-16 md:h-20 md:w-20 lg:h-24 lg:w-24 bg-blue-600">
                  <i class="flex self-center text-white fas fa-play md:text-2xl lg:text-4xl"></i>
                </span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <Cards :title="'Movie Actors'" :type="'credits'" :movieId="movie_id" />
      <Cards :title="'Similar Movies'" :type="'similar'" :movieId="movie_id" />
      <Cards :title="'Recommendations'" :type="'recommendations'" :movieId="movie_id" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import Loader from '@/components/Loader'
import Cards from '@/components/Cards'

export default {
  components: {
    Loader,
    Cards,
  },
  data() {
    return {
      loader: false,
      movie: {},
      video: [],
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
      const requestMovie = await axios.get(`${this.base_url}/3/movie/${this.movie_id}?api_key=${this.api_key}&language=en-US`)
      const responseMovie = requestMovie.data
      this.movie = responseMovie

      const requestVideo = await axios.get(`${this.base_url}/3/movie/${this.movie_id}/videos?api_key=${this.api_key}&language=en-US`)
      console.log(requestVideo)
      const responseVideo = requestVideo.data.results[0].key
      this.video = responseVideo
    } catch (error) {
      console.log(error.message)
    } finally {
      setTimeout(() => {
        this.loader = false
      }, 1000)
    }
  }
}
</script>