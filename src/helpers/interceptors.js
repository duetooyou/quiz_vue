import Axios from "../axios";
import store from "../store/store";

Axios.interceptors.request.use(
    function(config) {
        const token = store.getters.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
)
