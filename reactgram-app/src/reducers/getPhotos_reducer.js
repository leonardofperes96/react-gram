import {
  GETPHOTOS_BEGIN,
  GETPHOTOS_ERROR,
  GETPHOTOS_SUCCESS,
} from "../actions";

const getPhotos_reducer = (state, action) => {
  if (action.type === GETPHOTOS_BEGIN) {
    return { ...state, loading: true, error: null };
  }

  if (action.type === GETPHOTOS_SUCCESS) {
    return { ...state, loading: false, error: null, data: action.payload };
  }

  if (action.type === GETPHOTOS_ERROR) {
    return { ...state, loading: false, error: action.payload };
  }

  return state;
};

export default getPhotos_reducer;
