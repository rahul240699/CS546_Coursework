/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import {arrayAnalysis, mergeKeyValuePairs, deepArrayEquality} from './arrayUtils.js';
import {replaceCharsAtIndexes, anagrams, charSwap} from './stringUtils.js';
import { processObjects, similarKeysValues, flipKeysForStringsAndNumbers } from './objectUtils.js';

console.log("ArrayAnalysis");
try{
    console.log(arrayAnalysis([9999, 7262.0, 9999, 100002, 21334, 22, -29183, 9999, 777, 777, 777, 2635, 21, 32, -4857, -29]));

}catch(e){
    console.log(e);
}

try{
    console.log(arrayAnalysis([undefined, 1.29382837, 221.38763229, 292.32039029302, 321.3998743847,3733.3, 1121.020283]));
}catch(e){
    console.log(e);
}




console.log("MergeKeyValuePairs");
try{
    console.log(mergeKeyValuePairs(['a',9],['A', 99], ['b', 10],['c',21], ['          b              ', 11], ['        c', '      Okay                        ']));
}catch(e){
    console.log(e);
}

try{
    console.log(mergeKeyValuePairs(['   key1      ', 1290], ['key2      ', 11210], ['        key3', '          olalalala'], ['key1   ', '1111'],['key2',923],{a: [9, 'yo!']}));
}catch(e){
    console.log(e);
}


console.log("DeepArrayEquality");
const arr1 = [111111, null, 9283, 8, [1, 333, {a:999, c:101, d:{f:' helllo!!!!'}}, 682109, [827, undefined, 0, false, null, true]], {'h':true}]; 
const arr2 = [77262, [[21,[223, [725, {a: '            a             '}, null, true, false, [undefined, 'pain', [{b:'b99', c:{cc:'yellow    '}}]]]]]]]; 
const arr3 = [77262, [[21,[223, [725, {a: '            a             '}, null, true, false, [undefined, 'pain', [{b:'b99', c:{cc:'yellow   '}}]]]]]]]; 
const arr4 = [111111, null, 9283, 8, [1, 333, {c:101, d:{f:' helllo!!!!'}, a:999}, 682109, [827, undefined, 0, false, null, true]], {'h':true}]; 


try{
    console.log(deepArrayEquality(arr1, arr4));
}catch(e){
    console.log(e);
}

try{
    console.log(deepArrayEquality(arr2, arr3, null));
}catch(e){
    console.log(e);
}



console.log("ReplaceCharAtIndexes");
try{
    console.log(replaceCharsAtIndexes('la lala lalala lalalala lalalalala lalalalalala lalalalalalala lalalalalalalala lalalalalalalalala', [2, 4 , 6 , 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]));
}catch(e){
    console.log(e);
}

try{
    console.log(replaceCharsAtIndexes('', [2, 8, 16, 32]));
}catch(e){
    console.log(e);
}



console.log("Anagrams");
try{
    console.log(anagrams('Asper! !spear pares prase, apres, reaps pears', 'spear'));
}catch(e){
    console.log(e);
}

try{
    console.log(anagrams("   The best!seat is the aisle     ", null));
}catch(e){
    console.log(e);
}



console.log("charSwap");
try{
    console.log(charSwap("                  Hola                 ", "                       yo                     "));
}catch(e){
    console.log(e);
}

try{
    console.log(charSwap("                            Jellyfish is a       ", "            really weird fish       "));
}catch(e){
    console.log(e);
}


console.log("ProcessObjects");
const first = { 'x': 771, 'y': 2737 }; 
const second = { a: 8121, '  x   ': -23221, z: 50202 }; 
const third = { 'x     ': 29828, y: undefined, q: -1010101 };


try{
    console.log(processObjects([first, second], x => x / 33 + x * 99));
}catch(e){
    console.log(e);
}


try{
    console.log(processObjects([first, second, third], x => x * 7 - x * 40 ));
}catch(e){
    console.log(e);
}


console.log("similarKeysValues");
const obj1 = { '   a': 1, 'b': 2, 'c': "3" };
const obj2 = { 'a': "1", 'b  ': "2", 'c': 3, 'd': 4 };
const obj3 = { 'a': { ' x ': 1, 'y': 2 }, 'b  ': 3 };
const obj4 = null;


try{
    console.log(similarKeysValues(obj1, obj2));
}catch(e){
    console.log(e);
}

try{
    console.log(similarKeysValues(obj3, obj4));
}catch(e){
    console.log(e);
}


console.log('flipKeysForStringsAndNumbers');
const example1 = { a: null, b: 7, c: "hello" }; 
const example2 = { a: "test", b: ["apple", "banana"], d: { y: 5, z: "ok" } };


try{
    console.log(flipKeysForStringsAndNumbers(example1));
}catch(e){
    console.log(e);
}

try{
    console.log(flipKeysForStringsAndNumbers(example2));
}catch(e){
    console.log(e);
}