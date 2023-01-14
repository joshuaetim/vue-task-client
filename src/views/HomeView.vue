<template>
  <h1>Welcome to Quiz</h1>
  <router-link to="/quiz/XVlBz">Go to quiz</router-link>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  mounted() {
    if (localStorage.getItem("token") == null) {
      window.location.href = "/login"
    }
  },
}
</script>