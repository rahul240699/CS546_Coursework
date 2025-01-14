/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

const checkIfArray = (arr) => {
  
  if (!Array.isArray(arr) || arr === null || arr === undefined){
    throw `${arr || "The input"} is not an Array.`;
  }
}

const checkIfArrayEmpty = (arr) => {
  if (arr.length === 0){
    throw `The input is an Empty Array.`;
  }
}


const checkIfUndefined = (num) =>{
  if(!num){
    if (num === 0){
      
    }else{
      throw `${num || "The element of the array"} is undefined.`;
    }
  }
}

const checkIfAllElementsNumber = (arr) => {
  arr.forEach(num => {
    checkIfUndefined(num);
    if(typeof(num) !== "number" || Number.isNaN(num)){
      throw `${num || "The element of the array"} is not a number.`;
    }
  });
}



const checkArrayElements = (arr) => {
  if(!(arr.length === 2)){
    throw "The Length of the array is not equal to 2";
  }

  if(((typeof(arr[0]) !== "string")  & (typeof(arr[0]) !== "number")) || Number.isNaN(arr[0])){
    throw `${arr[0] || "The first element"} is not a string`;
  }

  if(((typeof(arr[1]) !== "string")  & (typeof(arr[1]) !== "number")) || Number.isNaN(arr[0])){
    throw `${arr[1] || "The first element"} is not a string or a number`;
  }
  
  if ((typeof(arr[0]) === "string")){
    if(arr[0].trim().length === 0){
      throw `The first element is an empty string.`
    }
  }

  if ((typeof(arr[1]) === "string")){
    if(arr[1].trim().length === 0){
      throw `The second element is an empty string.`
    }
  }
}

const checkDeepArrayElements = (arr) => {
  if(arr.length < 2){
    throw `The number of inputs is less than two.`
  }
}


export const arrayAnalysis = (arr) => {
  checkIfArray(arr);
  checkIfArrayEmpty(arr);
  checkIfAllElementsNumber(arr);

  let sortedArr = arr.sort((a,b) => a - b);

  // console.log(sortedArr);

  let resultObj = {};

  resultObj["totalCount"] = sortedArr.length;

  resultObj["lowest"] = sortedArr[0]
  resultObj["highest"] = sortedArr[resultObj.totalCount - 1];
  let sum = 0;
  let allCount = {};

  sortedArr.forEach(i => {
    sum += i;

    if(i.toString() in allCount){
      allCount[i] += 1;
    }else{
      allCount[i] = 1;
    }
  });

  resultObj["totalSum"] = sum;

  resultObj["average"] = sum/resultObj.totalCount;

  resultObj["span"] = resultObj.highest - resultObj.lowest;

  let middle = Math.floor(resultObj.totalCount / 2);


  if(resultObj.totalCount % 2 === 0){
    resultObj["middleValue"] = (sortedArr[middle - 1] + sortedArr[middle])/2;
  }else{
    resultObj["middleValue"] = sortedArr[middle];
  }  

  let values = Object.values(allCount);

  let maxVal = values.sort((a,b) => a - b)[values.length - 1];

  let keyArr = Object.keys(allCount);

  // console.log(allCount);

  let freq = keyArr.filter(i => allCount[i] === maxVal);
  // console.log(maxVal)

  resultObj["frequentValues"] = "null";

  if(freq.length === 1){
    resultObj["frequentValues"] = freq[0];
  }else if (freq.length < sortedArr.length){
    resultObj["frequentValues"] = freq;
  }
  // console.log(resultObj.frequentValues);

  return resultObj;
};





export const mergeKeyValuePairs = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  checkIfArray(arrays);
  checkIfArrayEmpty(arrays);

  let resultObj = {};

  let numArray = [];
  let strArray = [];

  arrays.forEach(arr =>{
    checkIfArray(arr);
    checkIfArrayEmpty(arr);
    checkArrayElements(arr);

    if(typeof arr[1] === 'number'){
      numArray.push(arr);
    }else if(typeof arr[1] === 'string'){
      strArray.push(arr);
    }
  });
  
  numArray.sort((a,b) => a[1] - b[1]);

  let sortedArr = [...numArray, ...strArray];

  sortedArr.forEach(arr => {
    

    let key = arr[0];
    let value = arr[1];

    checkIfUndefined(key);
    checkIfUndefined(value);


    if(typeof key === 'string'){
      key = key.trim();
    }

    if(typeof value === 'string'){
      value = value.trim();
    }


    if(key.toString() in resultObj){
      if(!(resultObj[key].includes(value))){
        resultObj[key] = `${resultObj[key]}, ${value}`;
      }
    }else{
      resultObj[key] = `${value}`;
    }
    

  });

  return resultObj;
};


const recursiveEqual = (ele1, ele2) => {
  if(typeof ele1 !== 'string' & 
    typeof ele1 !== 'number' &
    typeof ele1 !== 'boolean' &
    typeof ele1 !== 'undefined' &
    typeof ele1 !== 'null' &
    typeof ele1 !== 'object' &
    !Array.isArray(ele1)){
      throw `Invalid Element Type.`
  }

  if (Array.isArray(ele1) & Array.isArray(ele2)){
    if(ele1.length !== ele2.length){
      return false;
    }else{
      for(let i = 0; i < ele1.length; i++){
        if(!recursiveEqual(ele1[i], ele2[i])){
          return false;
        }
      }
    }
  }else if(typeof ele1 === 'object' & typeof ele2 === 'object' & ele1 !== null  & ele1 !== undefined & ele2 !== null & ele2 !== undefined){
    let keys1 = Object.keys(ele1);
    let keys2 = Object.keys(ele2);

    if(keys1.length !== keys2.length){
      return false;
    }else{
      for(let k of keys1){
        if(!recursiveEqual(ele1[k], ele2[k])){
          return false;
        }
      }
    }
  }else if((typeof ele1 === 'string' || 
    typeof ele1 === 'number' ||
    typeof ele1 === 'boolean' ||
    typeof ele1 === 'undefined' ||
    typeof ele1 === 'null')){
      if(ele1 !== ele2){
        return false;
      }
  }else if (typeof ele1 !== typeof ele2){
    return false;
  }
  return true;
}

export const deepArrayEquality = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    checkIfArray(arrays);
    checkIfArrayEmpty(arrays);
    checkDeepArrayElements(arrays);

    if (arrays.length < 2){
      throw `Number of input arrays is less than 2`;
    }

    // const arraysObj = {...arrays}

    let firstArr = arrays[0];

    checkIfArray(firstArr);
    checkIfArrayEmpty(firstArr);

    let bool = true;

    firstArr.forEach(i => {
      if(typeof i !== 'string' & 
        typeof i !== 'number' &
        typeof i !== 'boolean' &
        typeof i !== 'undefined' &
        typeof i !== 'null' &
        typeof i !== 'object' &
        !Array.isArray(i)){
          throw `Invalid Element Type.`
      }
    });

    let firstArlen = firstArr.length;

    // let keys = Object.keys(arraysObj);

    for (let k = 0; k < arrays.length; k++){
      let arr = arrays[k];
      // console.log(arraysObj[k]);
      checkIfArray(arr);
      checkIfArrayEmpty(arr);

      if(arr.length !== firstArlen){
        bool = false;
      }else{
        for(let i = 0; i < arr.length; i++){
          if(!recursiveEqual(arr[i], firstArr[i])){
            bool = false;
          }
        }
      }
    }
    return bool;
};
