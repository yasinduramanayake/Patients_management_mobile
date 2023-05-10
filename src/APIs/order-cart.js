import { api } from "../store/api";

export default {

     store: async function (payload, loading = true) {
        return await api.post('/order-carts', payload, {loading: loading})
    },


     delete: async function (id, loading = false) {
        return await api.delete(`order-carts/${id}`,{loading: loading})
    },
}
