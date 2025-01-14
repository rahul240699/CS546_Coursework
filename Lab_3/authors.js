//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import axios from "axios";
import { getBookById } from "./books.js";

const getData = async (url) => {
    try{
        const {data} = await axios.get(url);
        return data;
    }catch(e){
        console.log(e);
    }
};

const checkAuthorId = (id) => {
    if(typeof id !== 'string'){
        throw `${id || 'The input'} is not a string.`
    }
    if(id.trim() === ''){
        throw `The input is an empty string.`
    }
}

const checkParams = (firstName, lastName) => {
    if(typeof firstName !== 'string'){
        throw `${firstName || 'The input'} is not a string.`
    }

    if(typeof lastName !== 'string'){
        throw `${lastName || 'The input'} is not a string.`
    }

    if(firstName.trim() === ''){
        throw `The first name is an empty string.`
    }

    if(lastName.trim() === ''){
        throw `The last name is an empty string.`
    }
}

const checkAgeParams = (minAge, maxAge) =>{
    if(typeof minAge !== 'number'){
        throw `${minAge || 'The input'} is not a number.`
    }

    if(typeof maxAge !== 'number'){
        throw `${maxAge || 'The input'} is not a number.`
    }

    if(!(minAge >= 1)){
        throw `${minAge} is out of the expected range.`
    }

    if(!(maxAge >= 1)){
        throw `${maxAge} is out of the expected range.`
    }

    if(!(maxAge >= minAge)){
        throw ` The Minimum Age cannot be greater than the maximum age.`
    }
}

const checkGenre = (genre) => {
    if(typeof genre !== 'string'){
        throw `${genre || 'The input'} is not a string.`;
    }
    if(genre.trim() === ''){
        throw `The input is an empty string.`
    }
    // if(genre.trim().split(" ").length > 1){
    //     throw `Genre cannot contain spaces.`
    // }
}

export const getAuthorById = async (id) => {
    checkAuthorId(id);
    id = id.trim();
    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json`);
    
    let author = data.find(a => a.id.trim() === id.trim());
    if(!author){
        throw `Author not found`;
    }
    return author;
};

export const authorsMultipleGenres = async () => {
    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json`);
    let authorsWithMultipleGenres = [];
    const bookData = await getData(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
    for(let i in data){
        let author = data[i];
        let books = author.books;
        let genres = [];
        for(let j in books){
            let bookId = books[j];
            let book = bookData.find(b => b.id.trim() === bookId.trim());
            let bookGenres = book.genres;
            bookGenres.forEach(genre => {
                if(!genres.includes(genre.trim())){
                    genres.push(genre);
                }
            });
        }
        if(genres.length > 1){
            if(!authorsWithMultipleGenres.includes(`${author.first_name} ${author.last_name}`)){
                authorsWithMultipleGenres.push(`${author.first_name} ${author.last_name}`);
            }
        }
    }
    

    authorsWithMultipleGenres.sort((a,b) =>{
        let lastNameA = a.split(' ').slice(1).join(' ').replace(/'/g, '');
        let lastNameB = b.split(' ').slice(1).join(' ').replace(/'/g, '');

        return lastNameA.localeCompare(lastNameB);
    });
    return authorsWithMultipleGenres;
};

export const averagePageCount = async (firstName, lastName) => {
    checkParams(firstName, lastName);
    
    firstName = firstName.trim();
    lastName = lastName.trim();

    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json`);
    
    let author = data.find(a => a.first_name === firstName & a.last_name === lastName);
    if(!author){
        throw `Author not found.`
    }

    let books = author.books;

    if(books.length === 0){
        return 0;
    }

    let sum = 0;

    for(let i in books){
        let bookId = books[i];
        let book = await getBookById(bookId);

        sum += book.pageCount;
    }

    let avg = sum/books.length;

    avg = Math.round(avg * 100)/100;

    return avg;

};

export const getAuthorsByAgeRange = async (minAge, maxAge) => {
    checkAgeParams(minAge, maxAge);

    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json`);
    
    let today = new Date();
    let authorsWithinAgeRange = [];

    for(let i in data){
        let author = data[i];
        let dob = new Date(author.date_of_birth);

        let age = today.getFullYear() - dob.getFullYear();
        let md = today.getMonth() - dob.getMonth();

        if(md < 0 || (md === 0 & today.getDate() < dob.getDate)){
            age --;
        }
        
        if(age >= minAge & age <= maxAge){
            authorsWithinAgeRange.push(author);
        }
    }

    if(authorsWithinAgeRange.length === 0){
        throw `There are no authors within the age range ${minAge} to ${maxAge}.`
    }

    return authorsWithinAgeRange;

};

export const authorsByGenre = async (genre) => {
    checkGenre(genre);

    genre = genre.trim();

    // genre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();

    genre = genre.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    
   const booksData = await getData(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
   
   const authorData = await getData(`https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json`);

   let authors = [];
   for(let i in booksData){
        let book = booksData[i];

        let genres = book.genres;

        if(genres.includes(genre)){
            let author = authorData.find(a => a.id.trim() === book.authorId.trim());
            if(!authors.includes(`${author.first_name} ${author.last_name}`)){
                authors.push(`${author.first_name} ${author.last_name}`);
            }
        }
   }

   if(authors.length === 0){
    throw `The Genre ${genre}, does not exist in the dataset.`
   }

   authors.sort((a,b) =>{
    let lastNameA = a.split(' ').slice(1).join(' ').replace(/'/g, '');
    let lastNameB = b.split(' ').slice(1).join(' ').replace(/'/g, '');

    return lastNameA.localeCompare(lastNameB);
    });

    return authors;
};
