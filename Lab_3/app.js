/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.


import * as authors from "./authors.js";

    try{
        const authorData = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c");
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import { getAuthorById, averagePageCount, authorsMultipleGenres, getAuthorsByAgeRange, authorsByGenre } from "./authors.js";
import { getBookById, booksByFormat, booksByPublisher, mostPopularGenre, averagePriceByGenre } from "./books.js";

console.log("-------getAuthorById-----------");

try{
    console.log(await getAuthorById("        1871e6d7-551f-41cb-9a07-08240b86c95c         "));
}catch(e){
    console.log(e);
}

try{
    console.log(await getAuthorById(-1));
}catch(e){
    console.log(e);
}

try{
    console.log(await getAuthorById(1001));
}catch(e){
    console.log(e);
}

try{
    console.log(await getAuthorById());
}catch(e){
    console.log(e);
}

console.log("-------getBookById-----------");

try{
    console.log(await getBookById("         99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e          "));
}catch(e){
    console.log(e);
}

try{
    console.log(await getBookById("1871e6d7-551f-41cb-9a07-08240b86c95c             "));
}catch(e){
    console.log(e);
}

try{
    console.log(await getBookById(-1));
}catch(e){
    console.log(e);
}

try{
    console.log(await getBookById(1001));
}catch(e){
    console.log(e);
}

try{
    console.log(await getBookById(""));
}catch(e){
    console.log(e);
}

try{
    console.log(await getBookById());
}catch(e){
    console.log(e);
}

try{
    console.log(await getBookById("      7989fa5e-5617-43f7-a931-46036f9dbcff         "));
}catch(e){
    console.log(e);
}

console.log("-------authorsMultipleGenres-----------");

try{
      console.log(await authorsMultipleGenres());

}catch(e){
    console.log(e);
}

console.log("-------averagePageCount-----------");

try{
    console.log(await averagePageCount("       MADELAINE", "ARMATAGE                "));
}catch(e){
    console.log(e);
}

try{
    console.log(await averagePageCount("Madelaine", 2));
}catch(e){
    console.log(e);
}

try{
    console.log(await averagePageCount("Madelaine"));
}catch(e){
    console.log(e);
}

try{
    console.log(await averagePageCount("Madelaine", ""));
}catch(e){
    console.log(e);
}

try{
    console.log(await averagePageCount("John", "Doe"));
}catch(e){
    console.log(e);
}

console.log("-------getAuthorsByAgeRange-----------");

try{
    console.log(await getAuthorsByAgeRange(80, 85));
}catch(e){
    console.log(e);
}

try{
    console.log(await getAuthorsByAgeRange(123, 122));
}catch(e){
    console.log(e);
}

try{
    console.log(await getAuthorsByAgeRange("10", "100"));
}catch(e){
    console.log(e);
}

try{
    console.log(await getAuthorsByAgeRange("Patrick", "Hill"));
}catch(e){
    console.log(e);
}

try{
    console.log(await getAuthorsByAgeRange(-1, 0));
}catch(e){
    console.log(e);
}

console.log("-------authorsByGenre-----------");

try{
    console.log(await authorsByGenre("SCIENCE FICTION"));
}catch(e){
    console.log(e);
}

try{
    console.log(await authorsByGenre("         Hello world                    "));
}catch(e){
    console.log(e);
}

try{
    console.log(await authorsByGenre(""));
}catch(e){
    console.log(e);
}

try{
    console.log(await authorsByGenre(65));
}catch(e){
    console.log(e);
}

console.log("-------booksByFormat-----------");

try{
    console.log(await booksByFormat());
}catch(e){
    console.log(e);
}

console.log("-------mostPopularGenre-----------");

try{
    console.log(await mostPopularGenre());
}catch(e){
    console.log(e);
}

console.log("-------booksByPublisher-----------");

try{
    console.log(await booksByPublisher("               avamm                    "));
}catch(e){
    console.log(e);
}

try{
    console.log(await booksByPublisher("foo"));
}catch(e){
    console.log(e);
}

try{
    console.log(await booksByPublisher(5));
}catch(e){
    console.log(e);
}

try{
    console.log(await booksByPublisher("                                        "));
}catch(e){
    console.log(e);
}

try{
    console.log(await booksByPublisher());
}catch(e){
    console.log(e);
}

console.log("-------averagePriceByGenre-----------");
try{
    console.log(await averagePriceByGenre("SCIENCE FICTION"));
}catch(e){
    console.log(e);
}

try{
    console.log(await averagePriceByGenre("Hello World"));
}catch(e){
    console.log(e);
}

try{
    console.log(await averagePriceByGenre(""));
}catch(e){
    console.log(e);
}

try{
    console.log(await averagePriceByGenre());
}catch(e){
    console.log(e);
}