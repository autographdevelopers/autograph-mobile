import { peopleHelper } from '../../App/Lib/PeopleHelpers';

const testData = [
  {name: 'Waldemar'},
  {name: 'Zuza'},
  {name: 'Anetka'},
  {name: 'Ferdynand'},
  {name: 'Krzysiek'},
  {name: 'Marcin'},
  {name: 'Ania'},
  {name: 'Wojtek'},
  {name: 'Kazimierz'},
  {name: 'Filip'},
  {name: 'Zenon'},
  {name: 'Zosia'},
];

const expectedOutput = [
  {
    title: 'A',
    data: [
      {name: 'Anetka'},
      {name: 'Ania'},
    ]
  },
  {
    title: 'F',
    data: [
      {name: 'Ferdynand'},
      {name: 'Filip'},
    ]
  },
  {
    title: 'K',
    data: [
      {name: 'Kazimierz'},
      {name: 'Krzysiek'},
    ]
  },
  {
    title: 'M',
    data: [
      {name: 'Marcin'},
    ]
  },
  {
    title: 'W',
    data: [
      {name: 'Waldemar'},
      {name: 'Wojtek'},
    ]
  },
  {
    title: 'Z',
    data: [
      {name: 'Zenon'},
      {name: 'Zosia'},
      {name: 'Zuza'},
    ]
  }
];

test('groups people correctly', () => {
  expect(peopleHelper.groupAlphabetically(testData)).toEqual(expectedOutput);
  expect(peopleHelper.groupAlphabetically([])).toEqual([]);
});
