export const getCurrentStudent = state => {
  const id = state.support.context.currentStudentID;

  return state.entities.students.active[id]
};
