import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import reducer from "../reducers/photoPost_reducer";
import { getDocs, collection, db, addDoc } from "../utils/firebase/firebase";
import {
  GETPHOTOS_BEGIN,
  GETPHOTOS_ERROR,
  GETPHOTOS_SUCCESS,
  POSTPHOTO_BEGIN,
  POSTPHOTO_ERROR,
  POSTPHOTO_SUCCESS,
} from "../actions";

const PhotosContext = createContext();

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const PhotosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [canceled, setCanceled] = useState(false);

  // deal with memory leak
  const checkCancelBeforeDispatch = (action) => {
    if (!canceled) {
      dispatch(action);
    }
  };




  // const postPhotos = async (data) => {
  //   checkCancelBeforeDispatch({ type: POSTPHOTO_BEGIN });

  //   try {
  //     await addDoc(collection(db, "photos"), data);
  //     checkCancelBeforeDispatch({ type: POSTPHOTO_SUCCESS });
  //   } catch (err) {
  //     checkCancelBeforeDispatch({
  //       type: POSTPHOTO_ERROR,
  //       payload: err.message,
  //     });
  //   }
  // };

  //effect for memory leak
  useEffect(() => {
    return () => setCanceled(true);
  }, []);

  return (
    <PhotosContext.Provider value={{ ...state, postPhotos }}>
      {children}
    </PhotosContext.Provider>
  );
};

export const usePhotosContext = () => {
  return useContext(PhotosContext);
};
