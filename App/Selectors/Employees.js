export const getCurrentEmployee = state => {
  const id = state.support.context.currentEmployeeID;

  return state.entities.employees.active[id]
};
