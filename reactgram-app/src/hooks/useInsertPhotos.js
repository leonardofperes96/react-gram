import {
  POSTPHOTO_BEGIN,
  POSTPHOTO_SUCCESS,
  POSTPHOTO_ERROR,
} from "../actions";

import { useEffect, useReducer, useState } from "react";
import reducer from '../reducers/insertPhotos_reducer'
import { collection, addDoc, db } from "../utils/firebase/firebase";

const initialState = {
  loading: false,
  error: null,
};

export const useInsertPhotos = (docCollection) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  // deal with memory leak
  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
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

  const insertDocument = async (document) => {
    checkCancelledBeforeDispatch({ type: POSTPHOTO_BEGIN });

    try {
       await addDoc(
        collection(db, docCollection),
        document
      );

      checkCancelledBeforeDispatch({
        type: POSTPHOTO_SUCCESS,
      });
    } catch (error) {
      checkCancelledBeforeDispatch({
        type: POSTPHOTO_ERROR,
        payload: error.message,
      });
    }
  };
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { ...state, insertDocument };
};
