import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE, REMOVE_FROM_CART
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  state = state.filter(Boolean);
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
      case REMOVE_FROM_CART:
        Object.keys(state).forEach((key,index)=>{
          if(state[key]==action.productId){
            delete state[key]
          }
        })
      return state;
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  Object.keys(state).forEach(key => key == 'undefined' || key == undefined ? delete state[key] : {});
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
      case REMOVE_FROM_CART:
        return { ...state,
          [productId]: 0
        }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>{
  Object.keys(state.quantityById).forEach(key => key == 'undefined' || key == undefined ? delete state.quantityById[key] : {});
  
  return state.quantityById[productId] || 0
}

export const getAddedIds = state => {
  Object.keys(state.quantityById).forEach(key => key == 'undefined' || key == undefined ? delete state.quantityById[key] : {});
  if(state.addedIds.length > 0){
    state.addedIds = state.addedIds.filter(Boolean);
  }
  return state.addedIds}

const cart = (state = initialState, action) => {
  if(state.addedIds.length > 0){
    state.addedIds = state.addedIds.filter(Boolean);
  }
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
      case REMOVE_FROM_CART:
        delete state.quantityById[action.productId]
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart