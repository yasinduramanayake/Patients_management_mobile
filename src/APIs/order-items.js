import { api } from "../store/api";

export default {

  show: async function (id,loading=true) {
    return await api.get(`/orders/${id}`, { loading: loading })
  },
   update: async function (id,payload,loading=true) {
    return await api.put(`/orders/${id}`, payload,{ loading: loading })
  },
}