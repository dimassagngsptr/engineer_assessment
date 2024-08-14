const miniMaxSum = (arr) => {
  arr.sort((a, b) => a - b);

  let minSum = arr.slice(1).reduce((acc, val) => acc + val, 0);

  let maxSum = arr.slice(0, 4).reduce((acc, val) => acc + val, 0);

  return `${maxSum} ${minSum}`;
};

console.log(miniMaxSum([1, 3, 5, 7, 9]));
