import Vuex from 'vuex'
Vue.use(Vuex);

export function createStore () {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {

        },
        mutations: {
            setItem (state, { id, item }) {
                Vue.set(state.items, id, item)
            }
        }
    })
}