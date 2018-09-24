import { UPDATE_GET_COURSES_ID } from '../actions';

export function getCoursesId(state: string = '', action): string {
  switch (action.type) {
    case UPDATE_GET_COURSES_ID: {
      return action.getCoursesId;
    }
    default:
      return state;
  }
}
