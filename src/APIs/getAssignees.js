import { api } from "../store/api";

export default {

 show: async function (id,loading=false) {
    return await api.get(`order-carts/${id}/get-assignees`, { loading: loading })
  },

}