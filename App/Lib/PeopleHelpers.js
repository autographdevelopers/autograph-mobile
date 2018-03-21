import R from '../../node_modules/ramda/index';

export const peopleHelper = {
  groupAlphabetically: function(data) {
    data = data.sort((a, b) => a.name.localeCompare(b.name));
    return data.reduce((acc, current, index, array) => {
      const lastIndex = acc.length-1;

      if (current.name[0] ===  R.path([lastIndex, 'data', 0, 'name', 0], acc)) {
        acc[lastIndex].data.push(current)
      } else {
        acc.push({ title: current.name[0], data: [current] });
      }
      return acc;
    }, []);
  }
};
