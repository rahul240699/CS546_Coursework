/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
const checkIfString = (str) => {
      if(typeof(str) !== 'string'){
            throw `${str || 'The input'} is not a string.`
      }
}

const checkIfStringEmpty = (str) => {
      if(str.trim() === ''){
            throw `The input is an empty string.`
      }
}

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

const checkIfStrLengthGreaterThanTwo = (str) => {
      if(!(str.length > 2)){
            throw `${str || 'The input'} is less than expected input size.`
      }
}


export const replaceCharsAtIndexes = (str, idxArr) => {
      checkIfString(str);
      checkIfStringEmpty(str);
      checkIfArray(idxArr);
      checkIfArrayEmpty(idxArr);

      str = str.trim();

      // let resStr = '';

      let resStrArr = str.split('');

      for(let i = 0; i < idxArr.length; i++){
            if(!(typeof idxArr[i] === 'number')){
                  throw `The input is not a valid index.`;
            }
            if(!(idxArr[i] > 0) || !(idxArr[i] <= str.length - 2)){
                  throw `The input is not a valid index inside the range.`;
            }
            
            let prevNext = 0;
            let curr = '';
            let prevNextArr = [];
            
            
            

            for(let j = 0; j < str.length; j++){
                  
                  
                  if(idxArr[i] === j){
                        curr = str[j];
                        
                        prevNextArr[0] = str[j - 1];
                        prevNextArr[1] = str[j + 1];
                        
                        continue;
                  }
                  else if(str[j] === curr){
                        
                        resStrArr[j] = prevNextArr[prevNext];

                        if (prevNext === 0){
                              prevNext = 1;
                        }else if(prevNext === 1){
                              prevNext = 0;
                        }
                  }
                  
            }
      }
      let resStr =  '';
      resStr = resStrArr.join('')
      return resStr;
};

export const anagrams = (str, target) => {
      checkIfString(str);
      checkIfStringEmpty(str);
      checkIfString(target);
      checkIfStringEmpty(target);

      let newStr = str.trim().toLowerCase();
      let newTarget = target.trim().toLowerCase();

      let strArr = str.trim().split(' ');

      let newStrArr = newStr.split(' ');
      let targetArr = newTarget.split('');

      let finalResultArr = [];

      let wordArr = [];
      
      let anagArr = [];

      
      for(let i = 0; i < newStrArr.length; i++){
            
            anagArr = []
            wordArr = newStrArr[i].split('');
            
            if(wordArr.length !== targetArr.length){
                  continue;
            }
            
            for(let j = 0; j < wordArr.length; j++){

                  
                  if(targetArr.includes(wordArr[j])){
                        if(!anagArr.includes(wordArr[j])){
                              anagArr.push([wordArr[j]]);
                        }
                  }
            }
            if(anagArr.length === targetArr.length){
                  finalResultArr.push(strArr[i]);
            }

      }
      return finalResultArr;
};

export const charSwap = (str1, str2) => {
      checkIfString(str1);
      checkIfStringEmpty(str1);
      checkIfString(str2);
      checkIfStringEmpty(str2)
      checkIfStrLengthGreaterThanTwo(str1.trim());
      checkIfStrLengthGreaterThanTwo(str2.trim());

      str1 = str1.trim();
      str2 = str2.trim();

      let len = Math.min(Math.floor(str1.length / 2), Math.floor(str2.length / 2));

      let strArr1 = str1.split('');
      let strArr2 = str2.split('');

      let strArrRes1 = strArr2.slice(strArr2.length - len).concat(strArr1.slice(len));
      let strArrRes2 = strArr2.slice(0, strArr2.length - len).concat(strArr1.slice(0, len));
      
      let finalStr1 = strArrRes1.join('');
      let finalStr2 = strArrRes2.join('');
      
      return `${finalStr1} ${finalStr2}`
};
