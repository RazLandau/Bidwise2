export const UPDATE_GET_COURSES_ID = 'UPDATE_GET_COURSES_ID';

export function updateGetCoursesId(getCoursesId: string) {
  return {
    type: UPDATE_GET_COURSES_ID,
    getCoursesId,
  };
}
