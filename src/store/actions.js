export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      const moreGoods = state.cartList.find(item => item.iid == payload.iid)
      if (moreGoods) {
        commit('addCount', moreGoods)
        resolve('添加一个')
      } else {
        commit('addToCart', payload)
        resolve('添加到购物车')
      }
    })
  }
}