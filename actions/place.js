import { ADD_PLACE, REORDER } from './types';

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    payload: placeName
  }
}

export const reorder = data => {
  return {
    type: REORDER,
    payload: data
  }
}
