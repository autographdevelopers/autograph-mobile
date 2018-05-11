export const getActiveStudents = state => {
  const { students } = state.entities;

  return students.activeIds.map(id => students.active[id]);
};

export const getPendingStudents = state => {
  const { students } = state.entities;

  return students.pendingIds.map(id => students.pending[id])
};
