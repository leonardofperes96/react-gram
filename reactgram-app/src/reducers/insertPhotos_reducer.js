import {
  POSTPHOTO_BEGIN,
  POSTPHOTO_ERROR,
  POSTPHOTO_SUCCESS,
} from "../actions";

const insertPhotos_reducer = (state, action) => {
  if (action.type === POSTPHOTO_BEGIN) {
    return { ...state, loading: true, error: null };
  }

  if (action.type === POSTPHOTO_SUCCESS) {
    return { ...state, loading: false, error: null };
  }

  if (action.type === POSTPHOTO_ERROR) {
    return { ...state, loading: false, error: action.payload };
  }

  return state;
};

export default insertPhotos_reducer;
