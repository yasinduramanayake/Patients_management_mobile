import {api, setToken} from "../api";

export default {
    namespaced: true,
    state: {
        user: null,
        profile: null,
        token: localStorage.getItem('user-token') || ''
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        getUser: async function ({commit}) {
            const user = await api.get('/user');
            commit('setUser', user)
        },
        loginUser: async function ({commit}, {email, password}) {
            const response = await api.post('clinicians/login', {
                email: email,
                password: password
            }).then(response => {
                const token = response.data.token;
                setToken(token);
                localStorage.setItem('token', token)
                commit(authSuccess, token)
            });

            if (response.data.token) {

            }
        },
        logoutUser: async function () {

        }

    },
    authRequest: (state) => {
        state.status = 'loading'
    },
    authSuccess: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    authError: (state) => {
        state.status = 'error'
    },

}
