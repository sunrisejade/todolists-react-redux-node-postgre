

export const GET_ITEMS ='GET_ITEMS';
export const ADD_ITEM ='ADD_ITEM';
export const DELETE_ITEM='DELETE_ITEM';

//获取数据
/* update state after fetch */


export function getData (data) {
  return {
    type: GET_ITEMS, 
    data
  }
}

export function addData (data) {
  return {
    type: ADD_ITEM, 
    data
  }
}

//删除问题

export function deleteData (data) {
    return {
      type: DELETE_ITEM,
      data
    }
  }