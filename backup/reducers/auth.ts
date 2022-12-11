import { useCallback, useReducer } from "react";

type ActionType =
    | { type: "AUTH", data: any }
    | { type: "LOGOUT" };

interface AuthState {

}

const authReducer = (state = { authData: null }, action: ActionType) => {
  switch (action?.type) {
    case "AUTH":
      console.log(action?.data);
      return state;
    default:
      return state;
  }
};

export default authReducer();
