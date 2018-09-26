import { UPDATE_IS_ADD_MODAL_OPEN } from '../actions';

export function isAddModalOpen(state: boolean = false, action): boolean {
  switch (action.type) {
    case UPDATE_IS_ADD_MODAL_OPEN: {
      return action.isAddModalOpen;
    }
    default:
      return state;
  }
}
