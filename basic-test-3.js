const timeConversion = (s) => {
  const [hours, minutes, seconds, ampm] = s.split(/[: ]/);

  let hour24 = parseInt(hours, 10);
  if (ampm === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (ampm === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  return `${hour24.toString().padStart(2, "0")}:${minutes}:${seconds}`;
};
console.log(timeConversion("07:05:45 PM"));
