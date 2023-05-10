import { api } from "../store/api";

export default {

    show: async function (id, loading = true, page = 1, per_page = 50, filters = {}) {
        var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
        return await api.get(`/orders?filter[patient_id]=${id}&page=${page}&paginate=${per_page}&${queryString}`,{ loading: loading })
    }
}
