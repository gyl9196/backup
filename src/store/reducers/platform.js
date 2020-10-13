import * as actions from '../constants/platform';

const initialState = {
  user: null,
  dynamoUser: null,
  statuses: {
    loading: true,
  },
  error: null,
};

export const PlatformReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLATFORM_SIGN_IN:
      return { ...state, user: action.user.user, dynamoUser: action.user.dynamoUser };
    case actions.PLATFORM_SIGN_OUT:
      return initialState;
    case actions.PLATFORM_LOADING:
      return { ...state, statuses: { loading: true } };
    case actions.PLATFORM_LOADED:
      return { ...state, statuses: { loading: false } };
    case actions.PLATFORM_ERROR:
      return { ...state, error: action.errorMsg };
    case actions.PLATFORM_ERROR_CLEAR:
      return { ...state, error: null };
    default:
      return state;
  }
};
