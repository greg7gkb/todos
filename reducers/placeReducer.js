import { ADD_PLACE, REORDER } from '../actions/types';

const initialState = {
  placeName: '',
  places: []
};

const placeReducer = (state = initialState, action) => {

  console.log('placeReducer - state: ' + JSON.stringify(state));
  console.log('placeReducer - action: ' + JSON.stringify(action));

  switch(action.type) {
    case REORDER:
      return {
        ...action.payload
      }
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          value: action.payload
        })
      };
    default:
      return state;
  }
}

export default placeReducer;
