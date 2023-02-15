import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import reducer from "../reducers/user_reducer";
import {
  LOGIN_SUCCESS,
  LOGIN_BEGIN,
  LOGIN_ERROR,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  USERCREDENTIALS_BEGIN,
  USERCREDENTIALS_SUCCESS,
  USERCREDENTIALS_ERROR,
} from "../actions";

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  app,
} from "../utils/firebase/firebase";

const UserContext = createContext();

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //memory leak state
  const [cancelled, setCancelled] = useState(false);

  // deal with memory leak
  const checkCancelledBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      checkCancelledBeforeDispatch({ type: USERCREDENTIALS_BEGIN });

      try {
        await onAuthStateChanged(auth, (user) => {
          checkCancelledBeforeDispatch({
            type: USERCREDENTIALS_SUCCESS,
            payload: user,
          });
        });
      } catch (err) {
        checkCancelledBeforeDispatch({
          type: USERCREDENTIALS_ERROR,
          payload: err.message,
        });
      }
    };
    updateUser();
  }, [auth]);

  const login = async (data) => {
    checkCancelledBeforeDispatch({ type: LOGIN_BEGIN });

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      checkCancelledBeforeDispatch({ type: LOGIN_SUCCESS });
    } catch (err) {
      checkCancelledBeforeDispatch({ type: LOGIN_ERROR, payload: err.message });
    }
  };

  const register = async (data) => {
    checkCancelledBeforeDispatch({ type: REGISTER_BEGIN });

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });

      checkCancelledBeforeDispatch({ type: REGISTER_SUCCESS });
      return user;
    } catch (err) {
      checkCancelledBeforeDispatch({
        type: REGISTER_ERROR,
        payload: err.message,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  //cleaning memory
  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return (
    <UserContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
