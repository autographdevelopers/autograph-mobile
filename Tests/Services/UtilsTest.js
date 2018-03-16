import { groupBookedSlots } from '../../App/Lib/utils';
import { mapToBookedSlotsSummary } from '../../App/Lib/utils';
import { SLOT_STATUS } from '../../App/Lib/utils';

const testSlots = [
  { id: 0, start_hour: '8:00', end_hour: '8:30', status: SLOT_STATUS.BOOKED },
  { id: 1, start_hour: '8:30', end_hour: '9:00', status: SLOT_STATUS.BOOKED },
  { id: 2, start_hour: '9:00', end_hour: '9:30', status: SLOT_STATUS.BOOKED },
  { id: 3, start_hour: '9:30', end_hour: '10:00', status: SLOT_STATUS.BOOKED },
  { id: 4, start_hour: '10:00', end_hour: '10:30', status: SLOT_STATUS.FREE },
  { id: 5, start_hour: '10:30', end_hour: '11:00', status: SLOT_STATUS.FREE },
  { id: 6, start_hour: '11:00', end_hour: '11:30', status: SLOT_STATUS.BOOKED },
  { id: 7, start_hour: '11:30', end_hour: '12:00', status: SLOT_STATUS.FREE },
  { id: 8, start_hour: '12:00', end_hour: '12:30', status: SLOT_STATUS.BOOKED },
  { id: 9, start_hour: '12:30', end_hour: '13:00', status: SLOT_STATUS.BOOKED },
  { id: 10, start_hour: '13:00', end_hour: '13:30', status: SLOT_STATUS.FREE },
];

const testSummary = [
  [
    { id: 0, start_hour: '8:00', end_hour: '8:30', status: SLOT_STATUS.BOOKED },
    { id: 1, start_hour: '8:30', end_hour: '9:00', status: SLOT_STATUS.BOOKED },
    { id: 2, start_hour: '9:00', end_hour: '9:30', status: SLOT_STATUS.BOOKED },
    { id: 3, start_hour: '9:30', end_hour: '10:00', status: SLOT_STATUS.BOOKED }
  ],
  [
    { id: 6, start_hour: '11:00', end_hour: '11:30', status: SLOT_STATUS.BOOKED }
  ],
  [
    { id: 8, start_hour: '12:00', end_hour: '12:30', status: SLOT_STATUS.BOOKED },
    { id: 9, start_hour: '12:30', end_hour: '13:00', status: SLOT_STATUS.BOOKED }
  ]
];

const testSummaryReadable = [
  '8:00 - 10:00',
  '11:00 - 11:30',
  '12:00 - 13:00'
];


// test('correctly creates summary of taken slots', () => {
//   const summary = groupBookedSlots(testSlots);
//
//   expect(summary).toEqual(testSummary)
// });
//
// test('prints summary in readable form', () => {
//   const summary = groupBookedSlots(testSlots);
//   const summaryReadable = mapToBookedSlotsSummary(summary);
//
//   expect(summaryReadable).toEqual(testSummaryReadable)
// });

test('default', () => {
})
