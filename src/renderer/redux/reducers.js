import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recentFiles from './modules/recents';
import groups from './modules/groups';
import workspace from './modules/workspace';
import ui from './modules/ui';
import entries from './modules/entries';
import manager from './modules/file-manager';

export default combineReducers({
  workspace,
  recentFiles,
  groups,
  ui,
  entries,
  manager,
  form: formReducer
});
