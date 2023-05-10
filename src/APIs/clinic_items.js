import { api } from "../store/api";

export default {

  show: async function (id, loading = true, page = 1, per_page = 50, filters = {}) {
     var queryString = Object.keys(filters).map(key => `filter[${key}]` + '=' + filters[key]).join('&');
    return await api.get(`/dropdowns/clinics/${id}/items?page=${page}&paginate=${per_page}&${queryString}`, { loading: loading })
  },
}