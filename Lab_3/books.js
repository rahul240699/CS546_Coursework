//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import axios from "axios";


const getData = async (url) => {
    try{
        const {data} = await axios.get(url);
        return data;
    }catch(e){
        console.log(e);
    }
};

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


export const getBookById = async (id) => {
    checkString(id);
    id = id.trim();
    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
    
    let book = data.find(b => b.id.trim() === id.trim());
    if(!book){
        throw `Book not found.`;
    }
    return book;
};

export const booksByFormat = async () => {
    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
    
    let allFormats = {};
    for(let i in data){
        let book = data[i];
        let formats = book.format;

        for(let j in formats){
            if(Object.keys(allFormats).includes(formats[j])){
                allFormats[formats[j]] += 1;
            }else{
                allFormats[formats[j]] = 1;
            }
        }
    }
    return allFormats;
};

export const mostPopularGenre = async () => {
    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
    
    let allGenres = {};
    for(let i in data){
        let book = data[i];
        let genres = book.genres;

        for(let j in genres){
            if(Object.keys(allGenres).includes(genres[j])){
                allGenres[genres[j]] += 1;
            }else{
                allGenres[genres[j]] = 1;
            }
        }
    }

    let totals = Object.values(allGenres);
    let maxValue =  Math.max(...totals);

    let maxGenres = Object.keys(allGenres).filter(k => allGenres[k] === maxValue);

    if(maxGenres.length === 1){
        return maxGenres[0];
    }

    maxGenres.sort((a,b) =>{
        if(a > b){
            return 1;
        }else if(a < b){
            return -1;
        }
        return 0;
        });

    return maxGenres;
};

export const booksByPublisher = async (publisher) => {
    checkString(publisher);

    publisher = publisher.trim();
    publisher = publisher.charAt(0).toUpperCase() + publisher.slice(1).toLowerCase();

    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
    
    let publishersBooks = [];

    for(let i in data){
        let book = data[i];

        if(book.publisher === publisher){
            publishersBooks.push(book);
        }
    }

    if(publishersBooks.length === 0){
        throw `The publisher ${publisher}, does not exist in the dataset.`
    }

    return publishersBooks;

};

export const averagePriceByGenre = async (genre) => {
    checkString(genre);

    genre = genre.trim();

    genre = genre.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");

    const data = await getData(`https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json`);
    
    let count = 0;
    let sum = 0;

    for(let i in data){
        let book = data[i];

        if(book.genres.includes(genre)){
            count += 1;
            sum += book.price;
        }
    }

    if(count === 0){
        throw `The Genre ${genre}, does not exist in the dataset.`
    }

    let avg = sum/count;

    avg = Math.round(avg * 100)/100;

    return avg;
};
