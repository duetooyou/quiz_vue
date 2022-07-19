<template>
  <ul v-for="item in quizzes" :key="item.id">
    <router-link :to="{name: 'quiz', params: {id: item.id}}">{{item.name}}</router-link>
  </ul>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Quizzes",
  computed:{
    ...mapGetters({quizzes: 'GET_QUIZZES'})
  },
  created() {
    this.getQuizzesList()
  },
  methods: {
    ...mapActions(['getQuizzesList'])
  },
}

</script>

<style scoped>

</style>