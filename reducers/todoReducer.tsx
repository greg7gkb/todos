import { ADD_TODO, REMOVE_TODO } from '../actions/types';

const initialState = {
  todos: []
};

const todoReducer = (state = initialState, action: any) => {

  console.log('Reducer - state: ' + JSON.stringify(state));
  console.log('Reducer - action: ' + JSON.stringify(action));

  switch(action.type) {
    case REMOVE_TODO:
      let index = action.payload;
      return {
        todos: state.todos.slice(0, index).concat(state.todos.slice(index + 1))
      };

    case ADD_TODO:
      return {
        todos: state.todos.concat({
          key: action.payload.key,
          value: action.payload.value
        })
      };

    default:
      return state;
  }
}

export default todoReducer;
