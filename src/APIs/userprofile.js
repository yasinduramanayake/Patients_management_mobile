import { api } from "../store/api";

export default {
  show:async function(loading=true){
        return await api.get(`/clinicians/profile` , { loading:loading})
  },
  updatepassword:async function(payload,loading=true){
        return await api.post(`/clinicians/profile/change-password`, payload, { loading:loading })
  },
}
