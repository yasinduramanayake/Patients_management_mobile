import { api } from "../store/api";

export default {

  show: async function (id, loading = false, page = 1, per_page = 50, filters = {}) {
     var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
    return await api.get(`/clinicians?filter[clinic_id]=${id}&page=${page}&paginate=${per_page}&${queryString}`, { loading: loading })
  },
  clinician_show: async function (id,loading=true) {
    return await api.get(`/clinicians/${id}`, { loading: loading })
  },

}
