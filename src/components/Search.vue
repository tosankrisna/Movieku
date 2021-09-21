<template>
  <div class="flex lg:flex-1 justify-end items-center ml-auto">
    <input type="text" v-model="input_value" @input="searchMovie" class="h-9 lg:h-10 w-3/4 md:w-40 lg:w-1/2 xl:w-2/5 bg-none rounded-full pl-3 pr-11 md:pl-4 outline-none" placeholder="Search...">
    <div class="relative">
      <i @click="searchMovie" class="fas fa-search absolute right-5 -top-2 text-gray-400"></i>
    </div>
  </div>

  <div v-show="show_result" class="relative">
    <div class="items absolute top-14 lg:top-16 right-0 md:right-1 z-10 rounded-md w-60 md:w-80 max-h-96 overflow-y-auto bg-white">
      <ul v-for="result in search_result" :key="result.id" class="flex flex-col gap-2 p-2">
        <li class="flex gap-4 cursor-pointer" @click="getDetailMovie(result.id)">
          <img class="h-20" :src="`${img_url}/t/p/w500/${result.poster_path}`" alt="">
          <div class="flex gap-1 flex-col">
            <p class="text-md font-semibold">{{ result.title }}</p>
            <div class="flex gap-1 content-center">
              <i class="fas fa-star text-sm text-yellow-400"></i>
              <span class="text-gray-500 text-sm">{{ result.vote_average }}</span>
            </div>
            <p class="text-sm text-gray-500">{{ new Date(result.release_date).getFullYear() }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  data() {
    return {
      show_result: false,
      input_value: '',
      base_url: process.env.VUE_APP_BASE_URL,
      api_key: process.env.VUE_APP_API_KEY,
      img_url: process.env.VUE_APP_IMG_URL,
      search_result: []
    }
  },
  methods: {
    async searchMovie() {
      try {
        const request = await axios.get(`${this.base_url}/3/search/movie?api_key=${this.api_key}&language=en-US&query=${this.input_value}&page=1&include_adult=false`)
        const response = request.data.results
        
        this.search_result = response

        if (this.search_result.length) {
          this.show_result = true
        } else {
          this.show_result = false
        }
      } catch (e) {
        this.show_result = false
        console.log(e.message)
      }
    },
    getDetailMovie(id) {
      this.show_result = false
      this.$router.push({ name: 'Detail', params: { movieId: id} })
    },
  },
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
  background: #ffffff;
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