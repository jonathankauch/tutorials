import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  console.log('REDUCERS: ADDEDIDS')
  console.log(state, action)
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  console.log('REDUCERS: QUANTIYBYID')
  console.log(state, action)
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) => {
  console.log('REDUCERS: GETQUANITITY')
  console.log(state, productId)

  return state.quantityById[productId] || 0
}

export const getAddedIds = state => {
  console.log('REDUCERS: GETADDEDIDS')
  console.log(state)
  return state.addedIds
}

const cart = (state = initialState, action) => {
  console.log('REDUCERS: CART')
  console.log(state, action)
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
