import * as actions from '../constants/layout';

const initialState = {
  shrinkSidebar: false
};

export const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHRINK_SIDEBAR:
      return {...state, shrinkSidebar: action.shrink}
    default:
      return state;
  }
};