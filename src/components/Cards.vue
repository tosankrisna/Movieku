<template>
  <section class="cards bg-primary pb-10">
    <div class="container">
      <div class="flex justify-between mb-8 items-center">
        <h1 class="title text-4xl font-semibold text-white">
          {{ title }}
        </h1>
        <div v-if="showMore" class="flex items-center gap-3 text-gray-400 hover:text-white">
          <router-link to="#">Show More</router-link>
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
      <div class="items flex gap-8 overflow-x-auto pb-8 mb-12">
        <div v-for="res in results.slice(0, 20)" :key="res.id">
          <Card @click="clickType(res.id)" :cursor="cursorType" :data="res" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from './Card.vue'
import axios from 'axios'

export default {
  components: {
    Card
  },
  data() {
    return {
      results: [],
      base_url: process.env.VUE_APP_BASE_URL,
      api_key: process.env.VUE_APP_API_KEY,
    }
  },
  props: {
    title: String,
    type: String,
    movieId: String,
    showMore: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getDetailMovie(id) {
      return this.$router.push({ name: 'Detail', params: { movieId: id} })
    },
    clickType(id) {
      return this.type === 'credits' ? '' : this.getDetailMovie(id)
    },
  },
  computed: {
    cursorType() {
      return this.type === 'credits' ? '' : 'cursor-pointer'
    }
  },
  async mounted() {
    try {
      if (this.type === 'credits') {
        const request = await axios.get(`${this.base_url}/3/movie/${this.movieId}/${this.type}?api_key=${this.api_key}&language=en-US`)
        const response = request.data.cast

        this.results = response
      } else {
        const request = await axios.get(`${this.base_url}/3/movie/${this.type}?api_key=${this.api_key}&language=en-US&page=1`)
        const response = request.data.results

        this.results = response
      }

      console.log(this.cursorType)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>
/* width */
.items::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  scroll-margin-top: 5vh;
}

/* Track */
.items::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #141B28;
}

/* Handle */
.items::-webkit-scrollbar-thumb {
  background: #cecece94;
  border-radius: 100vh;
}

/* Handle on hover */
.items::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>