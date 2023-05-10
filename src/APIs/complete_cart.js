import { api } from "../store/api";

export default {

  complete_cart: async function (id,payload,loading=true) {
    return await api.put(`order-carts/${id}/complete-with-credits`,payload, { loading: loading })
  },

}