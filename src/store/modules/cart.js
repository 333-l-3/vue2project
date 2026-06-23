// 购物车模块 - 使用 localStorage 做简单持久化

const state = {
  cartList: JSON.parse(localStorage.getItem('game-cart') || '[]')
}

const getters = {
  cartCount: state => state.cartList.length,
  cartTotal: state => state.cartList.reduce((sum, item) => sum + item.price, 0),
  cartList: state => state.cartList
}

const mutations = {
  ADD_TO_CART(state, game) {
    const exist = state.cartList.find(item => item.id === game.id)
    if (!exist) {
      state.cartList.push({ ...game })
      localStorage.setItem('game-cart', JSON.stringify(state.cartList))
    }
  },
  REMOVE_FROM_CART(state, gameId) {
    state.cartList = state.cartList.filter(item => item.id !== gameId)
    localStorage.setItem('game-cart', JSON.stringify(state.cartList))
  },
  CLEAR_CART(state) {
    state.cartList = []
    localStorage.removeItem('game-cart')
  }
}

const actions = {
  addToCart({ commit }, game) {
    commit('ADD_TO_CART', game)
  },
  removeFromCart({ commit }, gameId) {
    commit('REMOVE_FROM_CART', gameId)
  },
  clearCart({ commit }) {
    commit('CLEAR_CART')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
