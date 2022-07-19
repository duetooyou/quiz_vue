<template>
  <template v-if="this.questionsAll.length-1 >= this.index">
  <div>
    <ul v-for="item in questions">
      <p>{{item.content}}</p>
    <label v-for="answer in item.answers">
      <input type="checkbox" v-bind:value="answer.text" v-model="checkedAnswers">{{answer.text}}
      <br>
    </label>
      <button
          type="submit"
          @click="nextQuestion"
          :disabled="checkedAnswers.length === item.answers.length || checkedAnswers.length === 0">Далее
      </button>
    </ul>
    </div>
  </template>
  <template v-else>
    <div>
      <p>Результаты: </p>
      <p>Верных ответов: {{this.correctCount}} {{Math.round(this.correctCount / this.questionsAll.length * 100)}}%</p>
      <p>Неверных: {{this.wrongCount}} {{Math.round(this.wrongCount / this.questionsAll.length * 100)}}%</p>
      <p>Всего вопросов: {{ this.questionsAll.length }}</p>
      <p>
        <button @click="restartQuiz">Начать заново</button>
      </p>
    </div>
  </template>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import router from "../router";
export default {
  data() {
    return {
      checkedAnswers: [],
      index: 0,
    }
  },
  name: "Quiz",
  created() {
    this.getQuestionsList()
  },
  computed:{
    ...mapGetters({questions: 'GET_CURRENT_QUESTION',
                   questionsAll: 'GET_QUESTIONS',
                   wrongCount: 'GET_WRONG_COUNT',
                   correctCount: 'GET_CORRECT_COUNT'}),
  },
  methods: {
    ...mapActions(['getQuestionsList']),
    nextQuestion() {
      if (this.index < this.questionsAll.length - 1) {
        this.index++
        this.$store.commit('SET_QUESTION_ID', this.questions[0].id)
        this.$store.commit('SET_CURRENT_QUESTION', this.index)
        this.$store.dispatch('checkAnswer', {'answer': this.checkedAnswers})
        this.checkedAnswers = []
      } else {
        this.index++
        this.$store.commit('SET_QUESTION_ID', this.questions[0].id)
        this.$store.dispatch('checkAnswer', {'answer': this.checkedAnswers})
        this.checkedAnswers = []
      }
    },
    restartQuiz(){
      this.$store.commit('RESTART_ANSWERS_COUNT')
      this.$router.push('/quizzes/')
    }
  }
}
</script>

<style scoped>

</style>