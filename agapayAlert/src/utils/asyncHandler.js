export const asyncHandler = (asyncFn, requestType, successType, failType) => {
    return (...args) => async (dispatch) => {
      dispatch({ type: requestType });
      try {
        const data = await asyncFn(...args);
        console.log(`${successType} Success:` , data); 
        dispatch({ type: successType, payload: data });
      } catch (error) {
        console.log(`${failType} Failed:`, error.message);
        dispatch({ type: failType, payload: error.response?.data?.message || error.message });
      }
    };
  };