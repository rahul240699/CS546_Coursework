export const questionOne = (arr) => {
  // Implement question 1 here

  let composite = 0;
  let prime = 0;

  let findPrime = (num) => {
    if (num === 1 || num <= 0){
      return false;
    }
    else{
      for(let i = 2; i <= num/2; i++){
        if (num % i === 0){
          return false;
        }
      }
      return true;
    }
  }

  arr.forEach(x => {
    if(findPrime(x)){
      prime += x
    }else{
      composite += x
    }
  });

  let bool = false;
  let totalSum = prime + composite;
  if (totalSum % 2 === 0){
    bool = true;
  }

  return [prime, composite, bool]; //return result
};


export const questionTwo = (index, multiplier) => {
  // Implement question 2 here
  let fibonacci = (n) => {
    if (n <= 0){
      return 0;
    }
    if (n === 1){
      return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  let fib = fibonacci(index);

  let resultObj = {};

  resultObj[fib] = multiplier * fib;

  return resultObj; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  let s = str.trim();
  // console.log(s);
  let strArr = s.split(` `);
  // console.log(strArr);
  let finalArr = [];

  strArr.forEach((word) => {
    let newStr = "";

    for(let x in word){
      let n = word.charCodeAt(x);

      if((n >= 65 && n <= 90) || (n >= 97 && n <= 122)){
        newStr += word.charAt(x);
      }

    }

    if (newStr.length > 0){
      // console.log(newStr);
      finalArr.push(newStr);
    }

  });
  // console.log(finalArr);
  return finalArr.length; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  let cubeArr = arr.map(x => x ** 3);

  let sum = 0;

  cubeArr.forEach(i => {
    sum += i;
  });

  let mean = Math.round(sum/cubeArr.length);

  return mean; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING OR NOT CHANGED.
export const studentInfo = {
  firstName: 'Rahul',
  lastName: 'Sohandani',
  studentId: '20022124'
};
