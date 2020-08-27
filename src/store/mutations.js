export default { 
  addCount(state,payload) {
    payload.count += 1
  },
  addToCart(state,payload) {
    payload.count = 1
    state.cartList.push(payload)
  }
 }