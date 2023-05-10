import { api } from "../store/api";

export default {

     store: async function (payload, loading = true) {
        return await api.post('/orders', payload, {loading: loading})
    },

    index: async function (loading=true, page = 1, per_page = 50,filters= {}) {
          var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
    return await api.get(`/order-carts?page=${page}&paginate=${per_page}&${queryString}`, { loading: loading })
    },
    show: async function (id,loading = true) {
        return await api.get(`/order-carts/${id}`,{ loading: loading })
    },
    update: async function (id, payload, loading = true) {
        return await api.put(`/order-carts/${id}/complete-with-credits`, payload, {loading: loading})
    },
    delete: async function (id, loading = true) {
        return await api.delete(`orders/${id}`,{loading: loading})
    },
}
