import * as actions from '../constants/platform';

export const signIn = (user) => ({
  type: actions.PLATFORM_SIGN_IN,
  user,
});

export const signOut = () => ({
  type: actions.PLATFORM_SIGN_OUT,
});

export const loading = () => ({
  type: actions.PLATFORM_LOADING,
});

export const loaded = () => ({
  type: actions.PLATFORM_LOADED,
});

export const insertError = (errorMsg) => ({
  type: actions.PLATFORM_ERROR,
  errorMsg,
});

export const clearError = () => ({
  type: actions.PLATFORM_ERROR_CLEAR,
});
