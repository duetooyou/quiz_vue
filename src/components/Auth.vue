<template>
  <div>
    <p><input v-model="username"></p>
    <p><input type="password" v-model="password"></p>
    <p><button @click="submit">Войти</button></p>
    <router-link to="register">Нет аккаунта</router-link>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {

  name: "Auth",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['getTokenPair']),
    submit() {
      this.getTokenPair({
        'username': this.username,
        'password': this.password
      })
          .then(() => this.$router.push('/quizzes/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>