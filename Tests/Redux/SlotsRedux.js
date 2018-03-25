import {
  slotActionCreators,
  slotReducer,
  INITIAL_STATE
} from '../../App/Redux/SlotsRedux';

const testSlots1 = [
  {
    id: 1,
    start_time: '2018-01-23',
    driving_lesson_id: 1,
    employee_driving_school_id: 2
  },
  {
    id: 2,
    start_time: '2018-01-23',
    driving_lesson_id: 1,
    employee_driving_school_id: 2
  },
];

const store1 = {
  [testSlots1[0].id]: testSlots1[0],
  [testSlots1[1].id]: testSlots1[1]
};

const testSlots2 = [
  {
    id: 3,
    start_time: '2018-01-23',
    driving_lesson_id: 1,
    employee_driving_school_id: 3
  },
  {
    id: 4,
    start_time: '2018-01-23',
    driving_lesson_id: 1,
    employee_driving_school_id: 3
  },
];

const store2 = {
  ...store1,
  [testSlots2[0].id]: testSlots2[0],
  [testSlots2[1].id]: testSlots2[1]
};

const testSlot3 = {
  id: 5,
  start_time: '2018-01-23',
  driving_lesson_id: 1,
  employee_driving_school_id: 3
};

const store3 = {
  ...store2,
  testSlot3
};

test('correctly populates empty store', () => {
  const state = slotReducer(INITIAL_STATE, slotActionCreators.save(testSlots1));

  expect(state.data).toBe(store1);
});

test('correctly adds new slots to existing ones', () => {
  const state = slotReducer(store1, slotActionCreators.save(testSlots2));

  expect(state.data).toBe(store2);
});

test('correctly adds single slot to existing ones', () => {
  const state = slotReducer(store2, slotActionCreators.save(testSlot3));

  expect(state.data).toBe(store3);
});
