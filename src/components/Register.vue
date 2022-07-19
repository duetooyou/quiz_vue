<template>
  <div>
    <p><input v-model="username" placeholder="Логин"></p>
    <p><input type="password" v-model="password" placeholder="Пароль"></p>
    <p><input type="password" v-model="passwordConfirm" placeholder="Повторите пароль"></p>
    <p><input v-model="firstName" placeholder="Ваше имя"></p>
    <p><input v-model="lastName" placeholder="Ваща фамилия"></p>
    <p><button @click="register">Присоединиться</button></p>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "Register",
  data() {
    return {
      username: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    register() {
      this.registerUser({'username': this.username,
                              'password': this.password,
                              'password_confirmation': this.passwordConfirm,
                              'first_name': this.firstName,
                              'last_name': this.lastName})
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>