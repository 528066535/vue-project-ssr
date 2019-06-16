import Vuex from 'vuex'
// import common from  './common/common'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        // common,
    }
});

export function createStore () {
    return store
}