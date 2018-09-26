export const UPDATE_COURSE = 'UPDATE_COURSE';
export const UPDATE_IS_ADD_MODAL_OPEN = 'UPDATE_IS_ADD_MODAL_OPEN';

export function updateCourse(course: string): object {
  return {
    type: UPDATE_COURSE,
    course,
  };
}

export function updateIsAddModalOpen(isAddModalOpen: boolean): object {
  return {
    type: UPDATE_IS_ADD_MODAL_OPEN,
    isAddModalOpen,
  };
}
