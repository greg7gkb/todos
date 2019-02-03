import { ADD_TODO, REORDER } from '../actions/types';

const initialState = {
  todos: []
};

const todoReducer = (state = initialState, action) => {

  console.log('Reducer - state: ' + JSON.stringify(state));
  console.log('Reducer - action: ' + JSON.stringify(action));

  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat({
          key: Math.random(),
          value: action.payload
        })
      };
    default:
      return state;
  }
}

export default todoReducer;
