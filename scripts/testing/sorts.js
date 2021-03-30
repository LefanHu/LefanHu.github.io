var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//sets size
canvas.width = innerWidth - 50;
canvas.height = innerHeight - 60;

const FRAMES_PER_SEC = 60;
const numData = 150;

var swaps = 0;

var block = {
  width: canvas.width / numData,
  height: canvas.height / numData,
};

//creating dataset
var data = [];
for (var i = 0; i < numData; ++i) data[i] = i;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function shuffle(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      await drawData();
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}

async function bubblesort(data) {
  data = await shuffle(data);
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data.length - i - 1; j++) {
      //swap here
      if (data[j] > data[j + 1]) {
        temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
    }

    //draw data here
    await drawData();
  }
  await drawData();
  inProgress = false;
}

async function selectionSort(arr) {
  arr = await shuffle(arr);
  var minIdx,
    temp,
    len = arr.length;
  for (var i = 0; i < len; i++) {
    minIdx = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    //draw data here
    await drawData();
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  await drawData();
  inProgress = false;
}

async function insertionSort(inputArr) {
  inputArr = await shuffle(inputArr);
  let n = inputArr.length;
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    let current = inputArr[i];
    // The last element of our sorted subarray
    let j = i - 1;
    while (j > -1 && current < inputArr[j]) {
      inputArr[j + 1] = inputArr[j];
      j--;
    }
    inputArr[j + 1] = current;
    await drawData();
  }
  inProgress = false;
  return inputArr;
}

async function swap(items, leftIndex, rightIndex) {
  await drawData();
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

async function partition(items, left, right) {
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
      await swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }
  return items;
}

async function doQuickSort(items, left, right) {
  items = await shuffle(items);
  await quickSort(items, left, right);
  drawData();
  inProgress = false;
}

async function merge(left, right) {
  var result = [],
    lLen = left.length,
    rLen = right.length,
    l = 0,
    r = 0;
  while (l < lLen && r < rLen) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
    data = result.concat(left.slice(l)).concat(right.slice(r));
    await drawData();
  }
  //remaining part needs to be addred to the result
  return result.concat(left.slice(l)).concat(right.slice(r));
}

async function mergeSort(arr) {
  var len = arr.length;
  if (len < 2) return arr;
  var mid = Math.floor(len / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid);
  //send left and right to the mergeSort to broke it down into pieces
  //then merge those
  return await merge(await mergeSort(left), await mergeSort(right));
}

async function doMergeSort(arr) {
  arr = await shuffle(arr);
  await mergeSort(arr);
  await drawData();
  inProgress = false;
}

async function shellSort(arr) {
  arr = await shuffle(arr);
  var increment = arr.length / 2;
  while (increment > 0) {
    for (i = increment; i < arr.length; i++) {
      var j = i;
      var temp = arr[i];

      while (j >= increment && arr[j - increment] > temp) {
        arr[j] = arr[j - increment];
        j = j - increment;
        await drawData();
      }

      arr[j] = temp;
    }

    if (increment == 2) {
      increment = 1;
    } else {
      increment = parseInt((increment * 5) / 11);
    }
  }

  await drawData();
  inProgress = false;
  return arr;
}

async function radixBucketSort(arr) {
  arr = await shuffle(arr);
  var idx1, idx2, idx3, len1, len2, radix, radixKey;
  var radices = {},
    buckets = {},
    num,
    curr;
  var currLen, radixStr, currBucket;

  len1 = arr.length;
  len2 = 10; // radix sort uses ten buckets

  // find the relevant radices to process for efficiency
  for (idx1 = 0; idx1 < len1; idx1++) {
    radices[arr[idx1].toString().length] = 0;
  }

  // loop for each radix. For each radix we put all the items
  // in buckets, and then pull them out of the buckets.
  for (radix in radices) {
    // put each array item in a bucket based on its radix value
    len1 = arr.length;
    for (idx1 = 0; idx1 < len1; idx1++) {
      curr = arr[idx1];
      // item length is used to find its current radix value
      currLen = curr.toString().length;
      // only put the item in a radix bucket if the item
      // key is as long as the radix
      if (currLen >= radix) {
        // radix starts from beginning of key, so need to
        // adjust to get redix values from start of stringified key
        radixKey = curr.toString()[currLen - radix];
        // create the bucket if it does not already exist
        if (!buckets.hasOwnProperty(radixKey)) {
          buckets[radixKey] = [];
        }
        // put the array value in the bucket
        buckets[radixKey].push(curr);
      } else {
        if (!buckets.hasOwnProperty("0")) {
          buckets["0"] = [];
        }
        buckets["0"].push(curr);
      }
    }
    // for current radix, items are in buckets, now put them
    // back in the array based on their buckets
    // this index moves us through the array as we insert items
    idx1 = 0;
    // go through all the buckets
    for (idx2 = 0; idx2 < len2; idx2++) {
      // only process buckets with items
      if (buckets[idx2] != null) {
        currBucket = buckets[idx2];
        // insert all bucket items into array
        len1 = currBucket.length;
        for (idx3 = 0; idx3 < len1; idx3++) {
          arr[idx1++] = currBucket[idx3];
          await drawData();
        }
      }
    }
    buckets = {};
  }
  inProgress = false;
}

async function cocktailSort(nums) {
  nums = await shuffle(nums);
  let is_Sorted = true;
  while (is_Sorted) {
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] > nums[i + 1]) {
        let temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        is_Sorted = true;
      }
    }
    await drawData();

    if (!is_Sorted) break;

    is_Sorted = false;

    for (let j = nums.length - 1; j > 0; j--) {
      if (nums[j - 1] > nums[j]) {
        let temp = nums[j];
        nums[j] = nums[j - 1];
        nums[j - 1] = temp;
        is_Sorted = true;
      }
    }
    await drawData();
  }
  inProgress = false;
}

//currently not utilized
function drawComparisons() {
  ctx.font = "128px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.textAlign = "center";
  ctx.fillText(swaps, canvas.width / 2, canvas.height / 4);
}

async function drawData() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //drawComparisons();
  for (var i = 0; i < data.length; i++) {
    ctx.fillStyle = "#eee";
    ctx.fillRect(
      i * block.width,
      canvas.height - data[i] * block.height,
      block.width + 1,
      data[i] * block.height
    );
  }
  await sleep(1000 / FRAMES_PER_SEC);
}

function drawInstructions() {
  ctx.font = "128px Arial";
  ctx.fillStyle = "#eee";
  ctx.textAlign = "center";
  ctx.fillText("Space to start", canvas.width / 4, canvas.height / 4);
}

async function shuffleData() {
  data = await shuffle(data);
}

inProgress = false;
document.addEventListener("keydown", function (e) {
  // space key to restart
  if (e.which == 32 && !inProgress) {
    inProgress = true;
    selection = document.getElementById("sorts").value;
    switch (selection) {
      case "bubble":
        bubblesort(data);
        break;
      case "selection":
        selectionSort(data);
        break;
      case "insertion":
        insertionSort(data);
        break;
      case "quick":
        doQuickSort(data, 0, data.length - 1);
        break;
      case "merge":
        doMergeSort(data);
        break;
      case "shell":
        shellSort(data);
        break;
      case "radix":
        radixBucketSort(data);
        break;
      case "cocktail":
        cocktailSort(data);
        break;
    }
    drawInstructions();
  }
});

//show the data at the start
drawData();
drawInstructions();
