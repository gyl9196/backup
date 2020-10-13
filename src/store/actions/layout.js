import * as actions from '../constants/layout';

export const handleShrinkSidebar = (shrink) => ({
  type: actions.SHRINK_SIDEBAR,
  shrink
});

