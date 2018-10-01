import { UPDATE_COURSE } from '../actions';

export function course(state: object = null, action): object {
  switch (action.type) {
    case UPDATE_COURSE: {
      return action.course;
    }
    default:
      return state;
  }
}
