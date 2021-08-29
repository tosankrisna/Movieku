<template>
  <section class="card">
    <div :class="`w-lg h-80 bg-white rounded-md overflow-hidden ${cursor}`">
      <img v-if="data.poster_path || data.profile_path !== null" :src="`${imgUrl}/t/p/w500/${data.poster_path ?? data.profile_path}`" class="object-fill h-full w-full" alt="">
      <img src="/img/unknown_person.jpg" class="h-full w-full" alt="">
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-white text-lg font-semibold mt-5 px-1 line-clamp-1">{{ data.title ?? data.name }}</h1>
      <p class="text-gray-500 px-1" v-if="data.character">{{ data.character }}</p>
      <div class="flex items-center text-sm gap-2 px-1" v-if="data.vote_average">
        <i class="fas fa-star text-white"></i>
        <span class="text-white">{{ data.vote_average }} / 10</span>
      </div>
      <p class="text-gray-400 px-1" v-if="data.release_date">{{ new Date(data.release_date).getFullYear() }}</p>
    </div>
  </section>
</template>

<script>

export default {
  props: ['data', 'cursor'],
  data() {
    return {
      imgUrl: process.env.VUE_APP_IMG_URL
    }
  },
}
</script>