import {api, setToken} from "../store/api";

export default {

    index: async function(loading=true){
        return await api.get('/delivery-types', { loading })
    }
}