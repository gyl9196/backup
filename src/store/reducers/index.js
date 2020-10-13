import { combineReducers } from 'redux';

import { PlatformReducer } from './platform';
import { LayoutReducer } from './layout';

export const combinedReducers = combineReducers({
  platform: PlatformReducer,
  layout: LayoutReducer
});
