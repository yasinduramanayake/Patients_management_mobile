import axios from "axios";
import {endLoading, startLoading} from "../common/loading";
import {toast} from "../common/toast";

export const api = axios.create({
    baseURL: "  https://v2-api.primedpharmacy.com/api"
});

if (localStorage.getItem('token')) {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

export function setToken(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function clearToken(token) {
    delete api.defaults.headers.common['Authorization']
}

api.interceptors.request.use(function (config) {
console.log(config)
    if ((config.url !== 'clinicians/login' && config.url !== '/clinicians/profile' && config.headers && config.headers.common && !(config.headers.common.Authorization))
    ) {
        //   config.headers.common['Authorization'] = localStorage.token;
        window.location.href = "/login";

    }

    if (!window.loader && config.loading) {
        startLoading()
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    console.log(1)
    endLoading();
    return response;
}, function (error) {
    if (typeof error.response !== 'undefined') {
        //Setup Generic Response Messages
        if (error.response.status === 401) {
            localStorage.clear();
        } else if (error.response.status === 404) {
            toast('API Route is Missing or Undefined', 'danger');
        } else if (error.response.status === 405) {
            toast('API Route Method Not Allowed', 'danger');
        } else if (error.response.status === 422) {
            toast('The Given Data Was Invalid', 'danger');
        } else if (error.response.status >= 500) {
            toast(error.response.data.error, 'danger');
        }
    }
    return Promise.reject(error);
});
