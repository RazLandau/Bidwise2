import { combineReducers } from 'redux';
import { course } from './course';
import { isAddModalOpen } from './isAddModalOpen';

export default combineReducers({
  course,
  isAddModalOpen,
});
