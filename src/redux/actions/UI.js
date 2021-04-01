import { OPEN_REPLY, CLOSE_REPLY } from './actionTypes';

export const openReply = () => {
  return {
    type: OPEN_REPLY,
  };
};

export const closeReply = () => {
  return {
    type: CLOSE_REPLY,
  };
};
