import * as actionTypes from "./actionTypes";
import firebase from "firebase/app"; // Don't really need to import from our own firebase file - same instance

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const checkAuthTimeout = (expirationTime) => {};

// Alternatively do this: https://firebase.google.com/docs/reference/rest/auth
export const auth = (email, password, isSignup) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch(authStart());
    if (isSignup) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const idToken = await userCredential.user.getIdToken();
          const userId = userCredential.user.uid;
          dispatch(authSuccess(idToken, userId));
          //   dispatch(checkAuthTimeout(response));
        })
        .catch((error) => {
          console.log(error);
          dispatch(authFail(error.message));
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          console.log(userCredential);
          const idToken = await userCredential.user.getIdToken();
          const userId = userCredential.user.uid;
          dispatch(authSuccess(idToken, userId));
        })
        .catch((error) => {
          console.log(error);
          dispatch(authFail(error.message));
        });
    }
  };
};
