import { generalActions } from './generalActions'
import { userActions } from './userActions'

export const useActions = (state, dispatch) => {
  return {
    generalActions: generalActions({ state, dispatch }),
    userActions: userActions({ state, dispatch })
  }
};