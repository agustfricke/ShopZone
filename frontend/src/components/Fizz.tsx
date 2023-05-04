

const Fizz = () => {
  const arr = [1, 2, 3, 4, 5, 6, 6, 7, 8];

const findDuplicates = (arr) => {
  let duplicates = {};
    console.log(arr)
  arr.forEach((item) => {
    if (duplicates[item]) {
      duplicates[item]++;
    } else {
      duplicates[item] = 1;
    }
  });
  return duplicates;
};

console.log(findDuplicates(arr)); // {6: 2}

  return (
    <div>Fizz</div>
  )
}

export default Fizz
