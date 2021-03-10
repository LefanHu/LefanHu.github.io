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
      block.width,
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
    }
    drawInstructions();
  }
});

//show the data at the start
drawData();
drawInstructions();
