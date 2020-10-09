import React, { createContext, useReducer } from "react";
import { useActions } from "../actions";
import { initialState, reducer } from "../reducers/reducers";

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
