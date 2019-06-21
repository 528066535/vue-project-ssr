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
        return new Promise(function (resolve, reject) {
            commit(type.TEST_PAGE_SAVE, 10);
            resolve('bar ajax 返回数据');
        });
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