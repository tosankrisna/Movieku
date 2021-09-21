<template>
  <section class="lg:px-10 hero bg-primary pb-10 lg:py-4">
    <div class="container lg:pb-6">
      <swiper :spaceBetween="30" :centeredSlides="true" :autoplay='{ "delay": 7500, "disableOnInteraction": false }' class="lg:rounded-lg">
        <swiper-slide v-for="movie in movies" :key="movie.id" class="relative w-full h-80 lg:h-96 xl:h-md block bg-cover bg-top" :style="`background-image: url(${imgUrl}/t/p/w1280/${movie.backdrop_path})`">
          <div class="absolute px-5 py-24 md:px-10 md:py-24 lg:py-28 lg:px-12 xl:py-20 xl:py-60 top-0 h-full w-full py-5 bg-gradient-to-r from-black to-transparent">
            <div class="flex flex-col gap-2 md:gap-3 lg:gap-4">
              <h1 class="w-3/4 md:w-2/4 text-white font-semibold text-xl lg:text-3xl xl:text-5xl">{{ movie.title }}</h1>
              <p class="text-white text-xs md:text-sm">{{ dateFormat(movie.release_date) }}</p>
              <p class="w-1/2 lg:w-2/5 text-xs md:text-sm lg:text-md text-white text-justify line-clamp-2 lg:line-clamp-3">{{ movie.overview }}</p>
              <router-link :to="{ name: 'Detail', params: { movieId: movie.id }}" class="w-16 text-xs md:text-sm lg:text-md xl:text-lg py-1.5 lg:w-20 xl:w-24 text-center rounded-full text-white bg-blue-500">Details</router-link>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper/core';
// Import Swiper styles
import 'swiper/swiper.scss';
import "swiper/components/pagination/pagination.min.css"
import axios from 'axios';
import moment from 'moment';
// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      movies: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiKey: process.env.VUE_APP_API_KEY,
      imgUrl: process.env.VUE_APP_IMG_URL
    };
  },
  methods: {
    setMovies(data) {
      this.movies = data
    },
    dateFormat(data) {
      return moment(data).format('LL')
    }
  },
  async mounted() {
    try {
      const res = await axios.get(`${this.baseUrl}/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`)
      const data = await res.data.results
      this.setMovies(data)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  
}
</script>