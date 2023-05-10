import { api } from "../store/api";

export default {

  index: async function (loading=true) {
    return await api.get(`/invitations/user-roles`, { loading: loading })
    },
}