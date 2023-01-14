<template>
</template>

<script>
import Button from './Button'
    export default {
        name: 'Header',
        props: {
            title: String,
            showAddTask: Boolean
        },
        components: {
            Button
        },
        computed: {
            homePage() {
                return this.$route.path === '/' ? true : false
            }
        }
    }
</script>