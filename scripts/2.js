var items = [
  58,
  135,
  1,
  57,
  106,
  146,
  141,
  81,
  10,
  98,
  103,
  74,
  2,
  63,
  32,
  28,
  124,
  78,
  86,
  47,
  116,
  38,
  27,
  132,
  62,
  22,
  3,
  24,
  46,
  107,
  137,
  39,
  53,
  37,
  111,
  139,
  113,
  92,
  29,
  114,
  134,
  118,
  104,
  108,
  149,
  125,
  97,
  72,
  133,
  34,
  143,
  123,
  105,
  51,
  126,
  102,
  19,
  21,
  48,
  96,
  109,
  30,
  31,
  148,
  6,
  11,
  52,
  91,
  7,
  138,
  59,
  56,
  73,
  40,
  70,
  142,
  55,
  93,
  75,
  100,
  68,
  77,
  89,
  23,
  122,
  112,
  129,
  127,
  82,
  140,
  99,
  101,
  42,
  110,
  131,
  36,
  64,
  147,
  88,
  69,
];
function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right);
    }
  }
  return items;
}
// first call to quick sort
var sortedArray = quickSort(items, 0, items.length - 1);
console.log(sortedArray); //prints [2,3,5,6,7,9]
