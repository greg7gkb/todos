import { ADD_TODO, REMOVE_TODO } from './types';

export const addTodo = todoName => {
  return {
    type: ADD_TODO,
    payload: todoName
  }
}

export const removeTodo = index => {
  return {
    type: REMOVE_TODO,
    payload: index
  }
}
