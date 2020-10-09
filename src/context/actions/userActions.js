export const userActions = (props) => {
  return {
    setData: (data) => {
      props.dispatch({ type: "UPDATE_DATA", data });
    }
  }
}