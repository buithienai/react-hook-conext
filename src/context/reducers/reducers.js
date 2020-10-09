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