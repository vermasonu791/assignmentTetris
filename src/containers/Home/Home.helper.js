import { randomInteger } from "../../utils/globalFunctions";

export const getIndex = function(e) {
  let rowInex = parseInt(e.target.getAttribute("data-rowindex"));
  let colIndex = parseInt(e.target.getAttribute("data-colindex"));
  const newObj = {
    i: rowInex,
    j: colIndex
  };
  return newObj;
};

export const checkIfActive = (row, col, arr) => {
  const indexObj = {
    i: row,
    j: col
  };
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) == JSON.stringify(indexObj)) {
      return true;
    }
  }
};

export const getRandomArray = colValue => {
  let newArray = [];
  for (let i = 0; i < colValue; i++) {
    let randomNumber = randomInteger(1, 10);
    newArray.push(randomNumber);
  }
  return newArray;
};

export const getArraySum = arr => {
  const sum = arr.reduce(function(prev, cur) {
    return prev + cur;
  });
  return sum;
};

export const makeMatrixValueZero = (arr, matrix) => {
  for (let i = 0; i < arr.length; i++) {
    matrix[arr[i].i][arr[i].j] = 0;
  }
  return matrix;
};

export const moveArrayElement = (input, from, to) => {
  let numberOfDeletedElm = 1;
  const elm = input.splice(from, numberOfDeletedElm)[0];
  numberOfDeletedElm = 0;
  input.splice(to, numberOfDeletedElm, elm);
  return input;
};
