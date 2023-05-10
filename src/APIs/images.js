import { api } from "../store/api";

export default {

 show: async function (id,loading=false) {
    return await api.get(`/admin/items/${id}/image`, { loading: loading })
  },

}