import Vuex from 'vuex'
import common from  './common'
import test from  './pages/test'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        common,
        test
    }
});

export function createStore () {
    return store
}