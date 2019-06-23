import {GET_ITEMS,
        ADD_ITEM,
        DELETE_ITEM
        } from './actions'

export default function reducer (state = [], action) {

    switch(action.type) {
      //获取数据 (Fetch data from database)
      case GET_ITEMS:
        return  state.concat(action.data)

      case ADD_ITEM:
        return [...action.data]

      case DELETE_ITEM:
          return  state.filter(each => each.item !== action.data)
     
      default :
        return state
    }
  }
  