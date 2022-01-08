export const cx = (...className) => {
  return className.reduce((acc, item, index) => {
    if (index >= 1 && item) acc = acc + " " + item;
    else if (item) acc = item;
    return acc;
  }, "");
};

export const randomInteger = function(min, max = max - 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getMatrix = function(rows, cols, defaultValue) {
  var arr = [];

  // Creates all lines:
  for (var i = 0; i < rows; i++) {
    // Creates an empty line
    arr.push([]);

    // Adds cols to the empty line:
    arr[i].push(new Array(cols));

    for (var j = 0; j < cols; j++) {
      // Initializes:
      arr[i][j] = defaultValue;
    }
  }

  return arr;
};
