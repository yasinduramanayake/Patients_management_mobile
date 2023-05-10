import { api } from "../store/api";

export default {

    show: async function (state, loading = true, page = 1, per_page = 50, filters = {}) {
           var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
        return await api.get(`/assignee/order-carts?page=${page}&paginate=${per_page}&filter[state]=${state}&${queryString}`,{ loading: loading })
    }
}