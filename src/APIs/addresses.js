import { api } from "../store/api";

export default {

    show: async function (id, loading = true) {

        return await api.get(`/clinics/${id}/addresses`,{ loading: loading })
    }
}