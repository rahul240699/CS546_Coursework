/*Here, you can export the data functions
to get the authors, books, getAuthorByID, getBookById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import axios from "axios";

const checkString = (id) => {
    if(!id){
        throw `The input is empty.`;
    }
    if(typeof id !== 'string'){
        throw `${id || 'The input'} is not a string.`
    }
    if(id.trim() === ''){
        throw `The input is an empty string.`
    }
}

export const getAuthors = async () => {
    try{
        const {data} = await axios.get(`https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json`);
        return data;
    }catch(e){
        console.log(e);
    }
};


export const getBooks = async () => {
    try{
        const {data} = await axios.get(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
        return data;
    }catch(e){
        console.log(e);
    }
};


export const getAuthorById = async (id) => {
    checkString(id);
    id = id.trim();
    const data = await getAuthors();
    
    let author = data.find(a => a.id.trim() === id.trim());
    if(!author){
        throw `Author not found`;
    }
    return author;
};

export const getBookById = async (id) => {
    checkString(id);
    id = id.trim();
    const data = await getBooks();
    
    let book = data.find(b => b.id.trim() === id.trim());
    if(!book){
        throw `Book not found.`;
    }
    return book;
};
