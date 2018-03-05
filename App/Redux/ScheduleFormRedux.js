import { createReducer, createActions } from 'reduxsauce';
import { deepClone, FETCHING_STATUS, generateDailySlots, SLOT_STATUS } from '../Lib/utils';

const { Types, Creators } = createActions({
  toggleSlot: ['weekDay', 'id'],
  changeStatus: ['status'],
  updateRequest: ['data'],
  initializeForm: ['data', 'schedule_type']
}, { prefix: 'SCHEDULE_FORM_' });

export const scheduleFormActionCreators = Creators;
export const scheduleFormActionTypes = Types;

export const TEMPLATE_TYPES = { NEW_TEMPLATE: 'new_template', CURRENT_TEMPLATE: 'current_template' };

const INITIAL_STATE = {
  template: {
    monday: generateDailySlots(),
    tuesday: generateDailySlots(),
    wednesday: generateDailySlots(),
    thursday: generateDailySlots(),
    friday: generateDailySlots(),
    saturday: generateDailySlots(),
    sunday: generateDailySlots(),
  },
  new_template_binding_from: null,
  status: FETCHING_STATUS.READY,
  type: TEMPLATE_TYPES.CURRENT_TEMPLATE
};

export const initializeFormHandler = (state, { data, schedule_type }) => {
  const newState = deepClone(state);
  newState.schedule_type = schedule_type;

  newState.template = Object.keys(data).reduce((acc, current, index, array) => {
    acc[current] = acc[current].map((item, index) => {
      if(data[current].includes(item.id))
        item.status = FETCHING_STATUS.BOOKED;

      return item;
    });

    return acc;
  }, newState.template);

  return newState;
};

export const toggleSlotHandler = (state, { weekDay, id }) => {
  const newState = deepClone(state),
    template = newState.template[weekDay],
    slot = template.find( item => item.id === id ) ;

    slot.status = slot.status === SLOT_STATUS.BOOKED ? SLOT_STATUS.ACTIVE : SLOT_STATUS.BOOKED;

    return newState;
};

export const changeStatusHandler = (state, { status }) => {
  return { ...deepClone(state), status };
};

export const scheduleFormReducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE_FORM]: initializeFormHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.TOGGLE_SLOT]: toggleSlotHandler,
});
