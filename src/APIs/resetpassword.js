import { api } from "../store/api";

export default {
  reset:async function(payload){
        return await api.post(`/clinicians/password/email` ,  payload)
  },
}
