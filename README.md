# React Hooks Context
This is a boilerplate created whit create-react-app to use React Hooks and Context API like Redux Architecture

## Why?
Due to the new features of ReactJS, it is possible to create an architecture and state management as in Redux, but without adding any extra libraries.

This is possible working with the new ReactJS Context and Hooks APIs.

## Inspiration
I'd inspired by two articles of Medium 

1. [State Management with React Hooks and Context API in 10 lines of code!](https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c)
2. [Replace Redux state with React Hooks and Context](https://itnext.io/replace-redux-state-with-react-hooks-and-context-7906e0fd5521)

## Features
_React.js_ - **React >16.8.0**💎

## Quick start

1. Clone this repo using `git clone https://github.com/buithienai/react-hook-conext.git`
2. Run `yarn` or `npm install` to install dependencies.<br />
3. Run `npm start` to see the example app at `http://localhost:3000`.

Now you're ready build your React Application working with an architecture and store management like Redux!

## Documentation

### Structure

    ├── public                     
    ├── src                          
    ├──── components
    ├──── context
    ├────── actions
    ├──────── generalActions.js
    ├──────── userActions.js
    ├──────── index.js
    ├────── states
    ├──────── initialStates.js
    ├────── reducers
    ├──────── generalReducer.js
    ├──────── userReducer.js
    ├──────── reducer.js
    ├────── store
    ├──────── storeContext.js
    ├──── index.js
    ├──── App.js
    ├──── serviceWorker.js
    ├── package.json            
    ├── .gitignore
    └── README.md

### Index.js
Render StoreProvider App Principal with a child function.

`````
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./context/store/storeContext";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

`````

## Context Architecture
Here is the magic!

### ACTIONS

### actions/index.js
 Export object with functions for each separate action, that receives an object `{state,dispatch}`
 Return every actions 
 
`````
import { generalActions } from './generalActions'
import { userActions } from './userActions'

export const useActions = (state, dispatch) => {
  return {
    generalActions: generalActions({ state, dispatch }),
    userActions: userActions({ state, dispatch })
  }
};

`````

### actions/generalActions.js
Export actions receiving an object `{ state, dispatch }` to access to state or dispatch the actions.

You can externalize the functions for complex logic.

`````
export const generalActions = (props) => {
  return {
    increment:  () => {
      props.dispatch({ type: "INCREMENT" });
    },
    decrement: () => {
      props.dispatch({ type: "DECREMENT" });
    },
    reset: () => {
      props.dispatch({ type: "RESET" });
    },
    setValue: (data) => {
      // props.dispatch({ type: "SET_VALUE", data });
      externSetValue(props,data);
    }
  }
}

function externSetValue(props,data) {
  props.dispatch({ type: "SET_VALUE", data});
}

`````

### actions/userActions.js
Export actions receiving an object `{ state, dispatch }` to access to state or dispatch the actions.

You can externalize the functions for complex logic.

`````
export const userActions = (props) => {
  return {
    setData: (data) => {
      props.dispatch({ type: "UPDATE_DATA", data });
    }
  }
}

`````

### REDUCERS

### reducers/reducer.js
Export initialState and reducer reducer function, 

reducer function returns separate states, which is a separate reducer, who receives state and action.

`````
import { initialState } from "../state/initialStates";
import { generalReducer } from './generalReducer';
import { userReducer } from './userReducer';

const reducer = (state = initialState, action) => {
  return {
    userStates: userReducer(state.userStates, action),
    generalStates: generalReducer(state.generalStates, action),
  }
};

export { initialState, reducer };

`````

### reducers/generalReducer.js
Define and export states and reducer
`````
export const generalStates = {
  count: 0
}

export const generalReducer = (state = generalReducer, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };
    case "RESET":
      return {
        ...state,
        count: 0
      };
    case "SET_VALUE":
      return {
        ...state,
        count: action.data
      };
    default:
      return {
        ...state
      };
  }
};

`````

### reducers/userReducer.js
Define and export states and reducer
`````
export const userStates = {
  userName: 'Tommy',
  email: 'buithienai@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ai-bui-a08a93138/',
  listUser: []
}

export const userReducer = (state = userStates, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        ...action.data
      };
    default:
      return {
        ...state
      };
  }
};

`````

### STATES

### states/initialStates.js
Exports an object with all separate state from reducers

`````
import { generalStates } from '../reducers/generalReducer'
import { userStates } from '../reducers/userReducer'

export const initialState = {
  generalStates,
  userStates
};

`````

### STORE

### store/storeContext.js
Exports StoreContext and StoreProvider.


It get the state and dispatch from new API useReducer `[ state, dispatch ]`.

It get the actions from useActions and pass it to Context `actions`.

You can use all Hooks here like `useEffect`, in this case, to show the new state.

It's return a Provider that receive a value with `{ state, dispatch, actions }`, it's encapsulate a children function to render.
 
`````
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

`````
