import { createStore } from 'vuex';
import users from "./modules/users";

const store = createStore({
    state () {
        return {
            test:"test"
        };
    },
    getters:{
        test(state) {
            return state.test;
        }
    },
    modules: {
        users
    }
});

export default store;
