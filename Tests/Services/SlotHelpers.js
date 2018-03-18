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

test('correctly map hour to id', () => {
  expect(slotHelper.hourToId('00:00')).toEqual(0);
  expect(slotHelper.hourToId('00:30')).toEqual(1);
  expect(slotHelper.hourToId('01:00')).toEqual(2);
  expect(slotHelper.hourToId('01:30')).toEqual(3);
  expect(slotHelper.hourToId('02:00')).toEqual(4);
  expect(slotHelper.hourToId('02:30')).toEqual(5);
  expect(slotHelper.hourToId('03:00')).toEqual(6);
  expect(slotHelper.hourToId('03:30')).toEqual(7);
  expect(slotHelper.hourToId('04:00')).toEqual(8);
  expect(slotHelper.hourToId('04:30')).toEqual(9);
  expect(slotHelper.hourToId('05:00')).toEqual(10);
  expect(slotHelper.hourToId('05:30')).toEqual(11);
  expect(slotHelper.hourToId('06:00')).toEqual(12);
  expect(slotHelper.hourToId('06:30')).toEqual(13);
  expect(slotHelper.hourToId('07:00')).toEqual(14);
  expect(slotHelper.hourToId('07:30')).toEqual(15);
  expect(slotHelper.hourToId('08:00')).toEqual(16);
  expect(slotHelper.hourToId('08:30')).toEqual(17);
  expect(slotHelper.hourToId('09:00')).toEqual(18);
  expect(slotHelper.hourToId('09:30')).toEqual(19);
  expect(slotHelper.hourToId('10:00')).toEqual(20);
  expect(slotHelper.hourToId('10:30')).toEqual(21);
  expect(slotHelper.hourToId('11:00')).toEqual(22);
  expect(slotHelper.hourToId('11:30')).toEqual(23);
  expect(slotHelper.hourToId('12:00')).toEqual(24);
  expect(slotHelper.hourToId('12:30')).toEqual(25);
  expect(slotHelper.hourToId('13:00')).toEqual(26);
  expect(slotHelper.hourToId('13:30')).toEqual(27);
  expect(slotHelper.hourToId('14:00')).toEqual(28);
  expect(slotHelper.hourToId('14:30')).toEqual(29);
  expect(slotHelper.hourToId('15:00')).toEqual(30);
  expect(slotHelper.hourToId('15:30')).toEqual(31);
  expect(slotHelper.hourToId('16:00')).toEqual(32);
  expect(slotHelper.hourToId('16:30')).toEqual(33);
  expect(slotHelper.hourToId('17:00')).toEqual(34);
  expect(slotHelper.hourToId('17:30')).toEqual(35);
  expect(slotHelper.hourToId('18:00')).toEqual(36);
  expect(slotHelper.hourToId('18:30')).toEqual(37);
  expect(slotHelper.hourToId('19:00')).toEqual(38);
  expect(slotHelper.hourToId('19:30')).toEqual(39);
  expect(slotHelper.hourToId('20:00')).toEqual(40);
  expect(slotHelper.hourToId('20:30')).toEqual(41);
  expect(slotHelper.hourToId('21:00')).toEqual(42);
  expect(slotHelper.hourToId('21:30')).toEqual(43);
  expect(slotHelper.hourToId('22:00')).toEqual(44);
  expect(slotHelper.hourToId('22:30')).toEqual(45);
  expect(slotHelper.hourToId('23:00')).toEqual(46);
  expect(slotHelper.hourToId('23:30')).toEqual(47);
});

test('correctly rounds time', () => {
  expect(slotHelper.roundTimeToHalfHourInterval('12:00')).toEqual('12:00');
  expect(slotHelper.roundTimeToHalfHourInterval('12:03')).toEqual('12:00');
  expect(slotHelper.roundTimeToHalfHourInterval('12:07')).toEqual('12:00');
  expect(slotHelper.roundTimeToHalfHourInterval('12:13')).toEqual('12:00');
  expect(slotHelper.roundTimeToHalfHourInterval('12:17')).toEqual('12:30');
  expect(slotHelper.roundTimeToHalfHourInterval('12:37')).toEqual('12:30');
  expect(slotHelper.roundTimeToHalfHourInterval('12:44')).toEqual('12:30');
  expect(slotHelper.roundTimeToHalfHourInterval('12:55')).toEqual('13:00');
  expect(slotHelper.roundTimeToHalfHourInterval('12:46')).toEqual('13:00');
});
