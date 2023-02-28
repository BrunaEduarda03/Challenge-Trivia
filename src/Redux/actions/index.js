export const SET_PLAYER = 'SET_PLAYER';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';
export const SET_SCORE = 'SET_SCORE';

export const setPlayer = (payload) => ({
  type: SET_PLAYER,
  payload,
});

export const updateAssertions = () => ({
  type: UPDATE_ASSERTIONS,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const getToken = (payload) => async (dispatch) => {
  const urlToken = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(urlToken);
    const data = await response.json();
    dispatch(setPlayer(payload));
    localStorage.setItem('token', data.token);
  } catch (error) {
    return error;
  }
};
