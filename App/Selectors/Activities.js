const toObject = state => id => state.entities.activities.data[id];

export const getMyActivites = state =>
  state.views.myActivitiesScreen.ids.map(toObject(state));
