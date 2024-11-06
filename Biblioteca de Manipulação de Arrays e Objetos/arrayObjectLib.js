const ArrayObjectLib = {
    filterByCondition(array, callback) {
      return array.filter(callback);
    },

    groupBy(array, key) {
      return array.reduce((result, item) => {
        const groupKey = item[key];
        if (!result[groupKey]) result[groupKey] = [];
        result[groupKey].push(item);
        return result;
      }, {});
    },
  
    sortBy(array, key, order = "asc") {
      return array.slice().sort((a, b) => {
        if (a[key] > b[key]) return order === "asc" ? 1 : -1;
        if (a[key] < b[key]) return order === "asc" ? -1 : 1;
        return 0;
      });
    },
  
    mapToKey(array, key) {
      return array.map(item => item[key]);
    },
  
    findByCondition(array, callback) {
      return array.find(callback);
    },
  
    everyCondition(array, callback) {
      return array.every(callback);
    },
  
    countByCondition(array, callback) {
      return array.reduce((count, item) => (callback(item) ? count + 1 : count), 0);
    }
  };
  
  export default ArrayObjectLib;
  