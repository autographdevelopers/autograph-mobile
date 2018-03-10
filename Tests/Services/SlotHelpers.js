import { slotHelper } from '../../App/Lib/SlotHelpers';


test('correctly creates summary of taken slots', () => {
  const dailySlots = [0,1,2,3,7,8,9,10,22,23,24,46,47];
  const summarizedSlots = ['00:00 - 02:00', '03:30 - 05:30', '11:00 - 12:30', '23:00 - 00:00'];
  const summary = slotHelper.summarizeDay(dailySlots);

  expect(summary).toEqual(summarizedSlots)
});

test('correctly map id to hour', () => {
  expect(slotHelper.idToHour(0)).toEqual('00:00');
  expect(slotHelper.idToHour(1)).toEqual('00:30');
  expect(slotHelper.idToHour(2)).toEqual('01:00');
  expect(slotHelper.idToHour(3)).toEqual('01:30');
  expect(slotHelper.idToHour(4)).toEqual('02:00');
  expect(slotHelper.idToHour(46)).toEqual('23:00');
  expect(slotHelper.idToHour(47)).toEqual('23:30');
});
