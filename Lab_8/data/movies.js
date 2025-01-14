import axios from "axios";

const checkStringParams = (param) => {
  if(!param){
    throw `The input is an empty paramter.`;
  }
  if(typeof param !== 'string'){
    throw `The input is not a string.`;
  }
  
  if(param.trim() === ''){
    throw `The input is an empty string.`;
  }
}

export const searchMoviesByTitle = async (title) => {
  /*Function to make an axios call to search the api and return up to 50 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  checkStringParams(title);
  title = title.trim();
  let key = "";
  let moviesearch = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}`);
  let page1 = moviesearch.data.Search || [];
  
  let moviesearch2 = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}&page=2`);
  let page2 = moviesearch2.data.Search || [];

  let moviesearch3 = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}&page=3`);
  let page3 = moviesearch3.data.Search || [];
  
  let moviesearch4 = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}&page=4`);
  let page4 = moviesearch4.data.Search || [];

  let moviesearch5 = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}&page=5`);
  let page5 = moviesearch5.data.Search || [];

  let finalArray = [...page1, ...page2, ...page3, ...page4, ...page5]

  // console.log(finalArray);

  for(let i in finalArray){
    if(finalArray[i].Poster === 'N/A'){
      finalArray[i].Poster = "/public/css/no_image.png";
    }
  }

  return finalArray;
};

export const getMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  checkStringParams(id);
  id = id.trim();

  let key = "CS546";
  let movie = await axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${id}`);

  if(movie.data.Poster === "N/A"){
    movie.data.Poster = "/public/css/no_image.png";
  }
  console.log(movie);
  return movie.data;
};
