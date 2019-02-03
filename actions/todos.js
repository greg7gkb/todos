import { ADD_TODO, REORDER } from './types';

export const addTodo = todoName => {
  return {
    type: ADD_TODO,
    payload: todoName
  }
}

export const reorder = data => {
  return {
    type: REORDER,
    payload: data
  }
}
