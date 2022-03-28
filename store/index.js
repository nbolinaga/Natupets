import userTemp from '../static/user.js'
export const state = () => ({
  token: window.localStorage.getItem('token') || false,
  stock: 0,
  sold: 0,
  price: 0,
  user: userTemp,
  opened: false,
})

export const mutations = {
  setOpened(state, opened) {
    state.opened = opened
  },
  logIn(state, token) {
    state.token = token
  },
  logOut(state) {
    state.token = false
    state.user = null
  },
  setStock(state, stock) {
    state.stock = stock
  },
  setSold(state, sold) {
    state.sold = sold
  },
  setPrice(state, price) {
    state.price = price
  },
  changePrice(state, price) {
    state.price = price
  },
  addStock(state, stock) {
    state.stock += parseInt(stock)
  },
  setUser(state, user) {
    state.user = user
  },
  sell(state, sold) {
    state.sold -= parseInt(sold)
    state.stock -= parseInt(sold)
  },
  cancelar(state, sold) {
    state.sold -= parseInt(sold)
  },
  addSold(state, sold) {
    state.sold += parseInt(sold)
  },
}
