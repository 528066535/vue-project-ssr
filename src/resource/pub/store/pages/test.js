import * as type from './page-vuex-type.js'
let state = {
    page: '',
};

let mutations = {
    [type.TEST_PAGE_SAVE](state, page) {
        state.page = page;
    },
};

let actions = {
    [type.TEST_PAGE_SAVE]({commit}, page) {
        console.log('save');
        commit(type.TEST_PAGE_SAVE, 11);
    },

    fetchItem ({ commit }) {
        console.log('fetchItem===========');
    }
};

let getters = {
    getPage: state=>{
        if(state.page) {
            return state.user.page;
        }
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}