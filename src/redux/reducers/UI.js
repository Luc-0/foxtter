import { OPEN_REPLY, CLOSE_REPLY } from '../actions/actionTypes';

const initialState = {
  isReplyOpen: false,
};

const UI = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_REPLY: {
      return {
        ...state,
        isReplyOpen: true,
      };
    }
    case CLOSE_REPLY: {
      return {
        ...state,
        isReplyOpen: false,
      };
    }
    default:
      return state;
  }
};

export default UI;
