import shortid from 'shortid';

import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text,
        }
      ];
    case DELETE_FLASH_MESSAGE:
      let index = -1;
      index = state.map((message, count) => {
        if (message.id === action.id) {
          return count;
        }
      });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ];
      }
      return state;
    default:
      return state;
  }
}
