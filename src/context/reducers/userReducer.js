export const userStates = {
  userName: 'Thien Ai',
  address: '0x00',
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
