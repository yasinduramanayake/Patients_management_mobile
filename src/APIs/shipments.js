import { api } from "../store/api";

export default {

    show: async function (id,loading = true) {
        return await api.get(`/order-carts/${id}/shipments`,{ loading: loading })
    }
}
