import { createReducer, createActions } from 'reduxsauce';
import { deepClone, FETCHING_STATUS, generateDailySlots, SLOT_STATUS } from '../Lib/utils';

const { Types, Creators } = createActions({
  toggleSlot: ['weekDay', 'id'],
  changeStatus: ['status'],
  changeNewTemplateBindingFrom: ['date'],
  updateRequest: ['data'],
  initializeForm: ['data', 'schedule_type', 'new_template_binding_from']
}, { prefix: 'SCHEDULE_FORM_' });

export const scheduleFormActionCreators = Creators;
export const scheduleFormActionTypes = Types;

export const TEMPLATE_TYPES = { NEW_TEMPLATE: 'new_template', CURRENT_TEMPLATE: 'current_template' };

const INITIAL_STATE = {
  new_template_binding_from: null,
  status: FETCHING_STATUS.READY,
  schedule_type: TEMPLATE_TYPES.CURRENT_TEMPLATE
};

export const initializeFormHandler = (state, { data, schedule_type, new_template_binding_from }) => {
  const newState = deepClone(INITIAL_STATE);
  const templateToBeModified = deepClone(data);
  newState.template = templateToBeModified;
  newState.schedule_type = schedule_type;
  newState.status = FETCHING_STATUS.READY;
  newState.new_template_binding_from = new_template_binding_from;

  return newState;
};

export const toggleSlotHandler = (state, { weekDay, id }) => {
  const newState = deepClone(state),
    daySlots = newState.template[weekDay];

    if ((index = daySlots.indexOf(id)) === -1)
      daySlots.push(id);
    else
      daySlots.splice(index, 1);

    daySlots.sort((prev, next) => prev > next);

    return newState;
};

export const changeStatusHandler = (state, { status }) => {
  return { ...deepClone(state), status };
};

export const changeNewTemplateBindingFromHandler = (state, { date }) => {
  return { ...deepClone(state), new_template_binding_from: date };
};

export const scheduleFormReducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE_FORM]: initializeFormHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.TOGGLE_SLOT]: toggleSlotHandler,
  [Types.CHANGE_NEW_TEMPLATE_BINDING_FROM]: changeNewTemplateBindingFromHandler,
});
