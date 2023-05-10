import {api, setToken} from "../store/api";

export default {
    login: async function(payload) {
        return await api.post('clinicians/login', payload, { loading:true }).then(response => {
            const token = response.data.token;
            setToken(token);
            localStorage.setItem('token', token);
            return response;
        });
    },
    user: async function(){
        return await api.get('clinicians/profile', { loading:true })
    },
    logout: async function ( loading=true ) {
        localStorage.clear();
    }
}
