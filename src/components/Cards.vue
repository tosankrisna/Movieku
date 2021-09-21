<template>
  <section v-if="results.length" class="cards bg-primary pb-2 md:pb-4">
    <div class="container">
      <div class="flex justify-between mb-5 md:mb-8 items-center">
        <h1 class="title ml-3 md:ml-5 lg:ml-8 text-lg md:text-2xl xl:ml-0 lg:text-4xl font-semibold text-white">
          {{ title }}
        </h1>
        <div v-if="results.length >= 20" class="flex items-center mr-1.5 md:mr-2 lg:mr-10 xl:mr-0 gap-2 lg:gap-3 text-gray-400 hover:text-white">
          <router-link :to="cardUrl" class="text-sm md:text-md">Show More</router-link>
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
      <div class="items flex pl-3 pr-2 md:pl-6 md:pr-2 lg:ml-8 lg:mr-8 lg:pl-0 xl:ml-0 xl:mr-0 xl:pr-0 gap-2 md:gap-4 xl:gap-8 overflow-x-auto lg:pb-8 mb-12">
        <div v-for="res in results.slice(0, 20)" :key="res.id">
          <Card @click="clickType(res.id)" :cursor="cursorType" :data="res" class="w-40 md:w-48 lg:w-52 xl:w-lg" />
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
    },
    cardUrl() {
      if (this.$route.params.movieId) {
        return `/${this.type.replace('_', '')}/${this.$route.params.movieId}`
      } else {
        return `/${this.type.replace('_', '')}`
      }
    }
  },
  async mounted() {
    try {
      if (this.type === 'credits' || this.type === 'similar' || this.type === 'recommendations') {
        const request = await axios.get(`${this.base_url}/3/movie/${this.movieId}/${this.type}?api_key=${this.api_key}&language=en-US&page=1`)
        const response = request.data.cast ?? request.data.results

        this.results = response
      } else {
        const request = await axios.get(`${this.base_url}/3/movie/${this.type}?api_key=${this.api_key}&language=en-US&page=1`)
        const response = request.data.results

        this.results = response
      }

    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
/* width */
.items::-webkit-scrollbar {
  width: 10px;
  height: 10px;
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

@media screen and (max-width: 768px) {
  .items::-webkit-scrollbar {
    display: none;
  }

} 

</style>