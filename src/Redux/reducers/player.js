import { SET_PLAYER, SET_SCORE, UPDATE_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER:
    return {
      ...INITIAL_STATE,
      name: action.payload.playerName,
      gravatarEmail: action.payload.playerEmail,
    };

  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };

  case SET_SCORE:
    return {
      ...state,
      score: action.payload.score + state.score,
    };

  default:
    return state;
  }
};

export default player;
