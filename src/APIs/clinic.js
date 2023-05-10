import { api } from "../store/api";

export default {

  index: async function (loading = true, page = 1, per_page = 50, filters= {}) {
        var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
    return await api.get(`/clinics?page=${page}&paginate=${per_page}&${queryString} `, { loading: loading })
  },
  show:async function(id,loading=true){
        return await api.get(`/clinics/${id}`  , { loading:loading})
  },
  update:async function(id,payload,loading=true){
        return await api.put(`/clinics/${id}`, payload, { loading:loading })
  },
  store:async function(payload,loading=true){
        return await api.post(`/clinics`, payload, { loading:loading })
  },
}
