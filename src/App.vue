<template>
  <div class="container">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        showAddTask: false
      }
    },
    methods: {
      toggleAddTask() {
        this.showAddTask = !this.showAddTask
      },
  }
  }
</script>
