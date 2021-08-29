<template>
  <section class="hero bg-primary pb-16">
    <div class="container lg:pb-6">
      <swiper :spaceBetween="30" :centeredSlides="true" :autoplay='{ "delay": 7500, "disableOnInteraction": false }' class="rounded-lg">
        <swiper-slide v-for="movie in movies" :key="movie.id" class="relative w-screen py-52 md:py-64 lg:py-72 block bg-cover bg-top" :style="`background-image: url(${imgUrl}/t/p/w1280/${movie.backdrop_path})`">
          <div class="absolute px-12 py-60 top-0 h-full w-full py-5 bg-gradient-to-r from-black to-transparent">
            <div class="flex flex-col gap-4">
              <h1 class="w-2/4 text-white font-semibold text-5xl">{{ movie.title }}</h1>
              <p class="text-white text-sm">{{ dateFormat(movie.release_date) }}</p>
              <p class="w-2/5 text-white text-justify line-clamp-3">{{ movie.overview }}</p>
              <router-link :to="{ name: 'Detail', params: { movieId: movie.id }}" class="py-1.5 w-28 text-center rounded-full text-white bg-blue-500">Go to Details</router-link>
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