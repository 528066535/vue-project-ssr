import Data from '@Core/data'
import * as type from './common-vuex-type'

let state = {
    user: Data.getUser(),
    token: Data.getToken()
};

let mutations = {
    [type.USER_SAVE](state, user) {
        Data.setUser(user);
        state.user = user;
    },

    [type.USER_SIGNOUT](state) {
        Data.removeUser();
        state.user = {};
    },

    [type.TOKEN_SAVE](state, token) {
        Data.setToken(token);
        state.token = token;
    },

    [type.TOKEN_DEL](state) {
        Data.removeToken();
        state.token = '';
    },
};

let actions = {
    [type.USER_SAVE]({commit}, user) {
        commit(type.USER_SAVE,user);
    },

    [type.USER_SIGNOUT]({commit}) {
        commit(type.USER_SAVE);
    },
};

let getters = {
    getUserName: state=>{
        if(state.user) {
            return state.user.userName?state.user.userName:'';
        }
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}