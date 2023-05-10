import {api, setToken} from "../store/api";

export default {

    store: async function(payload,loading=true){
        return await api.post('/orders/delivery-types/get-supported-delivery-types', payload,{ loading })
    }
}