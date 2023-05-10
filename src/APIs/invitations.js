import { api } from "../store/api";

export default {

  show: async function (id,loading=true,page = 1, per_page = 50, filters= {}) {
       var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
    return await api.get(`/invitations/sender?page=${page}&paginate=${per_page}&filter[clinic_id]=${id}&${queryString}`, { loading: loading })
    },
  store: async function(payload,loading=true){
    return await api.post('/invitations/sender', payload, { loading:loading })
  },
}