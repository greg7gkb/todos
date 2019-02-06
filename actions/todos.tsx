import { ADD_TODO, REMOVE_TODO } from './types';

export const addTodo = (value: string, key?: number) => {
  if (key === undefined) key = Math.random();
  return {
    type: ADD_TODO,
    payload: {value: value, key: key}
  }
}

export const removeTodo = (index: number) => {
  return {
    type: REMOVE_TODO,
    payload: index
  }
}
