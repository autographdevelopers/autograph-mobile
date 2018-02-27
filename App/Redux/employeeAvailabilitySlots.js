import { createReducer, createActions } from 'reduxsauce';
import { deepClone, FETCHING_STATUS, generateDailySlots, SLOT_STATUS } from '../Lib/utils';

const { Types, Creators } = createActions({
  indexRequest: null,
  save: ['data'],
  toggleSlot: ['weekDay', 'id'],
  changeStatus: ['status'],
}, { prefix: 'EMPLOYEE_AVAILABILITY_SLOTS_' });

export const employeeAvailabilitySlotsActionCreators = Creators;
export const employeeAvailabilitySlotsActionTypes = Types;

const INITIAL_STATE = {
  schedule: {
    monday: generateDailySlots(),
    tuesday: generateDailySlots(),
    wednesday: generateDailySlots(),
    thursday: generateDailySlots(),
    friday: generateDailySlots(),
    saturday: generateDailySlots(),
    sunday: generateDailySlots(),
  },
  status: FETCHING_STATUS.READY,
};

export const saveHandler = (state, { schedule }) => ( { ...state, schedule } );

export const toggleSlotHandler = (state, { weekDay, id }) => {
  const newState = deepClone(state),
    schedule = newState.schedule[weekDay],
    slot = schedule.find( item => item.id === id ) ;

    slot.status = slot.status === SLOT_STATUS.BOOKED ? SLOT_STATUS.ACTIVE : SLOT_STATUS.BOOKED;

    return newState;
};

export const changeStatusHandler = (state, { status }) => {
  return { ...deepClone(state), status };
};

export const employeeAvailabilitySlotsReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: saveHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.TOGGLE_SLOT]: toggleSlotHandler,
});
