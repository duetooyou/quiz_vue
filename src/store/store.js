import {createStore} from "vuex";
import axios from "axios";
import router from "../router";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        refreshToken: '',
        accessToken: '',
        authStatus: false,
        quizzesList: [],
        questionsList: [],
        currentQuestion: [],
        correctAnswers: 0,
        wrongAnswers: 0,
        questionID: 0
    },
    getters: {
        'GET_REFRESH_TOKEN': state => state.refreshToken,
        'GET_ACCESS_TOKEN': state => state.accessToken,
        'GET_AUTH_STATUS': state => state.authStatus,
        'GET_QUIZZES': state => state.quizzesList,
        'GET_QUESTIONS': state => state.questionsList,
        'GET_CURRENT_QUESTION': state => state.currentQuestion,
        'GET_QUESTION_ID': state => state.questionID,
        'GET_WRONG_COUNT': state => state.wrongAnswers,
        'GET_CORRECT_COUNT': state => state.correctAnswers,
    },
    mutations: {
        'SET_REFRESH_TOKEN': function (state, _refreshToken) {
            state.refreshToken = _refreshToken
        },
        'SET_ACCESS_TOKEN': function (state, _accessToken) {
            state.accessToken = _accessToken
            state.authStatus = true
        },
        'SET_QUIZZES': function (state, payload) {
            state.quizzesList = payload
        },
        'SET_QUESTIONS': function (state, payload) {
            state.questionsList = payload
        },
        'SET_CURRENT_QUESTION': function (state, index=0) {
            state.currentQuestion.shift()
            state.currentQuestion.push(state.questionsList[index])
        },
        'SET_CORRECT_COUNT': function (state, payload) {
            state.correctAnswers++
        },
        'SET_WRONG_COUNT': function (state, payload) {
            state.wrongAnswers++
        },
        'SET_QUESTION_ID': function (state, payload) {
            state.questionID = payload
        },
        'RESTART_ANSWERS_COUNT': function (state) {
            state.correctAnswers = 0
            state.wrongAnswers = 0
        }
    },
    actions: {
        getQuizzesList: async ({commit, state}) => {
            const quizUrl = "http://127.0.0.1:8000/api/quizzes/"
            try {
                await axios
                    .get(quizUrl)
                    .then(response => {
                        commit('SET_QUIZZES', response.data)
                    })
            } catch (e) {
                console.log(e)
            }
        },
        getQuestionsList: async ({commit, state}) => {
            const questionUrl = `http://127.0.0.1:8000/api/quizzes/${router.currentRoute.value.params.id}/questions/`
            try {
                await axios
                    .get(questionUrl)
                    .then(response => {
                        commit('SET_QUESTIONS', response.data)
                        commit('SET_CURRENT_QUESTION')
                    })
            } catch (e) {
                console.log(e)
            }
        },
        checkAnswer: async ({commit, state}, data) => {
            const answerUrl = `http://127.0.0.1:8000/api/quizzes/${state.questionID}/results/`
        try {
            await axios
                .post(answerUrl, data)
                .then(response => {
                    if (response.data === true) {
                        commit('SET_CORRECT_COUNT')
                    }
                    else {
                        commit('SET_WRONG_COUNT')
                    }

        })
        } catch (e) {
            console.log(e)
            }
        },
        getTokenPair:async ({ commit, dispatch}, data) => {
            const loginUrl = 'http://127.0.0.1:8000/api/tokens/';
            try {
                await axios
                    .post(loginUrl, data)
                    .then(response => {
                        console.log(response.data)
                        if (response.status === 200) {
                            commit("SET_REFRESH_TOKEN", response.data['refresh']);
                            commit("SET_ACCESS_TOKEN", response.data['access']);
                        }
                    });
            } catch (e) {
                console.log(e.response);
            }
        },
        getRefreshToken: async ({commit, state}) => {
            const loginUrl = 'http://127.0.0.1:8000/api/tokens/refresh/';
            try {
                await axios
                    .post(loginUrl, {refresh: state.refreshToken})
                    .then(response => {
                        if (response.status === 200) {
                            commit("SET_REFRESH_TOKEN", response.data['refresh']);
                            commit("SET_ACCESS_TOKEN", response.data['access']);
                        }
                    });
            } catch (e) {
                console.log(e.response);
            }
        },
        registerUser: async ({commit, state}, data) => {
            const registerUrl = 'http://127.0.0.1:8000/api/signin/'
            console.log(data)
            try {
                await axios
                    .post(registerUrl, data)
                    .then(response => {
                        console.log(response.data)
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }
})

export default store
