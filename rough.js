function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

const day = 49;

let b = ordinal_suffix_of(day);

console.log(b);

var date = new Date();
console.log(date.getYear()); // prints 113
console.log(date.getFullYear()); // prints 2013
