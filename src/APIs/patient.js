import {api} from "../store/api";

export default {

    index: async function (loading = false, page = 1, per_page = 50, filters= {}) {
        var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
        return await api.get(`/patients?page=${page}&paginate=${per_page}&${queryString}`, {loading: loading})
    },
    store: async function (payload, loading = true) {
        return await api.post('/patients', payload, {loading: loading})
    },
    show: async function (id, loading = true) {
        return await api.get(`/patients/${id}`, {loading: loading})
    },
    update: async function (id, payload, loading = true) {
        return await api.put(`/patients/${id}`, payload, {loading: loading})
    },

}
