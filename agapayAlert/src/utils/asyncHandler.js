export const asyncHandler = (asyncFn, requestType, successType, failType) => {
    return (...args) => async (dispatch) => {
      dispatch({ type: requestType });
      try {
        const data = await asyncFn(...args);
        dispatch({ type: successType, payload: data });
      } catch (error) {
        dispatch({ type: failType, payload: error.response?.data?.message || error.message });
      }
    };
  };