<template>
  <Navbar @toggleSidebar="sidebarOpen = !sidebarOpen" />
  <Sidebar :show="sidebarOpen" @hideSidebar="sidebarOpen = !sidebarOpen"/>
  <router-view :key="$route.path"/>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
  data() {
    return {
      sidebarOpen: false
    }
  }
}
</script>
