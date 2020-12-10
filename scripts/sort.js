/**
 * Return sorted array in given order
 * @param {Array} array array to be sorted
 * @param {String} order order to be sorted [asc , desc] 
 */
export const sort = (array, order) => {
    if (order === 'desc') {
        return array.sort(function(a, b){return b - a});
    }
    return array.sort(function(a, b){return a - b});
}
