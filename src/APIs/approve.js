import { api } from "../store/api";

export default {

    update: async function ( id,loading = true) {
        return await api.put(`/assignee/order-carts/${id}/approve`,{ }, {loading: loading})
    }



// ghkjhgfhhytrd
}
