const getCurrentUser = state => state.access.currentUser;
const notMe = state => employee => employee.id !== getCurrentUser(state).id;

export const getCurrentEmployee = state => {
  const id = state.support.context.currentEmployeeID;

  return state.entities.employees.active[id]
};

export const getPendingEmployees = state => {
  return state.entities.employees.pendingIds
       .map(id => state.entities.employees.pending[id])
              .filter(notMe(state))

};

export const getActiveEmployees = state => {
  return state.entities.employees.activeIds
       .map(id => state.entities.employees.active[id])
              .filter(notMe(state))
};
