import Axios from "axios";
import store from "./store/store";
import router from "./router";


export default function axiosSetUp() {
    Axios.defaults.baseURL = "<http://127.0.0.1:8000/api/>";
    Axios.interceptors.request.use(
        function (config) {
            const token = store.state.accessToken;
            console.log(`in axios ${token}`)
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    Axios.interceptors.response.use(
        function (response) {

            return response;
        },
        async function (error) {
            const originalRequest = error.config;
            if (
                error.response.status === 401 &&
                originalRequest.url.includes("refresh/")
            ) {
                store.commit('CLEAR_AUTH_DATA')
                await router.push({name: 'Auth'});
                return Promise.reject(error);
            } else if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await store.dispatch("getRefreshToken");
                return Axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );
}
