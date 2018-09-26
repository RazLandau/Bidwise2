import { UPDATE_COURSE } from '../actions';

export function course(state: string = '', action): string {
  switch (action.type) {
    case UPDATE_COURSE: {
      return action.course;
    }
    default:
      return state;
  }
}
