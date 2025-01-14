/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

const checkIfArray = (arr) => {
      if (!Array.isArray(arr)){
        throw `${arr || "The input"} is not an Array.`;
      }
    }
    
const checkIfArrayEmpty = (arr) => {
if (arr.length === 0){
      throw `The input is an Empty Array.`;
}
}

const checkIfArrayHasObjects = (arr) => {
      for(let i = 0; i < arr.length; i++){
            if(typeof arr[i] !== 'object'){
                  throw `${arr[i] || 'The element'} is not an object.`;
            }

            let obj = arr[i];

            if(Object.keys(obj).length === 0){
                  throw `The element at index ${i} is an empty object.`
            }

            for(let x in obj){
                  if(typeof obj[x] !== 'number'){
                        throw `${obj[x] || 'The value'} in the object at index ${i} for the key ${obj[x]} is not a number.`
                  }
            }
      }
}

const checkIfFunction = (func) => {
      if(typeof func !== 'function'){
            throw `The second parameter is not a function.`;
      }
}

const checkIfObject = (obj) => {
      if(typeof obj !== 'object' || Array.isArray(obj) || obj === null || obj === undefined){
            throw `${obj || 'The input'} is not an object.`
      }
}

const checkIfObjectEmpty = (obj) => {
      if(Object.keys(obj).length === 0){
            throw `The input is an empty object.`
      }
}

export const processObjects = (objArr, func) => {
      checkIfArray(objArr);
      checkIfArrayEmpty(objArr);
      checkIfArrayHasObjects(objArr);

      checkIfFunction(func);

      let resObj = {};
      
      for(let i = 0;i < objArr.length;i++){
            let obj = objArr[i];

            for(let x in obj){
                  if(x in resObj){
                        let v = resObj[x]*func(obj[x]);
                        resObj[x] = v;
                  }else{
                        resObj[x] = func(obj[x]);
                  }
            }
      }

      return resObj;

};

export const similarKeysValues = (obj1, obj2) => {
      checkIfObject(obj1);
      checkIfObject(obj2);

      if(Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0){
            return {};
      }

      let keys1 = Object.keys(obj1);
      let keys2 = Object.keys(obj2);

      let resObj = {}

      for(let k of keys1){
            if(keys2.includes(k)){
                  if(typeof obj1[k] === 'object' & typeof obj2[k] === 'object'){
                        resObj[k] = similarKeysValues(obj1[k], obj2[k]);
                  }else{
                        if(obj1[k] == obj2[k]){
                              resObj[k] = obj1[k];
                        }
                  }
            }
      }

      return resObj;

};

export const flipKeysForStringsAndNumbers = (obj) => {
      checkIfObject(obj);
      checkIfObjectEmpty(obj);

      let resObj = {};

      let keys = Object.keys(obj);

      for(let k of keys){
            if(obj[k] === null || obj[k] === undefined || Number.isNaN(obj[k])){
                  throw `Invalid input type.`;
            }
            if(typeof obj[k] === 'number'){
                  resObj[obj[k]] = k;
            }else if(typeof obj[k] === 'string'){
                  if(obj[k].trim() === ''){
                        throw `The input has an empty string.`
                  }
                  resObj[obj[k]] = k;
            }else if(Array.isArray(obj[k])){
                  checkIfArrayEmpty(obj[k]);
                  let arr = obj[k];
                  for(let i = 0;i<arr.length;i++){
                        if(typeof arr[i] !== 'string' & (typeof arr[i] !== 'number' || Number.isNaN(arr[i]))){
                              throw `The input in the array is not a string or number.`
                        }
                  }
                  resObj[k] = arr;
            }else if (typeof obj[k] === 'object'){
                  let objIn = obj[k];
                  let inValues = Object.values(objIn);
                  for(let j = 0; j < inValues.length; j++){
                        if(typeof inValues[j] !== 'string' & (typeof inValues[j] !== 'number' || Number.isNaN(inValues[j]))){
                              throw `The input in the object is not a string or number.`
                        }
                  }
                  resObj[k] = flipKeysForStringsAndNumbers(obj[k]);
            }
      }

      return resObj;
      
};