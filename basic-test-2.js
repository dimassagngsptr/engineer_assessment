const plusMinus = (arr) => {
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      positiveCount++;
    } else if (arr[i] < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  }

  const positiveRatio = (positiveCount / arr.length).toFixed(6);
  const negativeRatio = (negativeCount / arr.length).toFixed(6);
  const zeroRatio = (zeroCount / arr.length).toFixed(6);

  return ` ${positiveRatio}, ${negativeRatio}, ${zeroRatio} `;
};

console.log(plusMinus([1, 1, 0, -1, -1]));
