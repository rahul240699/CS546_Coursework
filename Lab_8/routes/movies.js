//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import express from "express";
import { searchMoviesByTitle, getMovieById } from "../data/movies.js";
import {static as staticDir} from 'express';


const router = express.Router();



router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try{
    res.render('home', {pageTitle : 'Movie Search'})
  }catch(e){
    return res.status(500).json({e});
  }
});

router.route('/moviesearch').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
  try{
    let title = req.body;
    if (!title || Object.keys(title).length === 0){
      return res.status(400).render('error', {searchError:"You must enter a search term!", pageTitle:"Error"});
    }

    if(typeof title.searchByTitle !== 'string'){
      return res.status(400).render('error', {searchError:"You must enter a search term!", pageTitle:"Error"});
    }


    if(!title.searchByTitle){
      return res.status(400).render('error', {searchError:"You must enter a search term!", pageTitle:"Error"});
    }

    if(title.searchByTitle.trim() === ''){
      return res.status(400).render('error', {searchError:"You must enter a search term!", pageTitle:"Error"});
    }

    title.searchByTitle = title.searchByTitle.trim();

    let result = await searchMoviesByTitle(title.searchByTitle);

    if(result.length === 0){
      return res.status(404).render('error',{searchByTitle: title.searchByTitle, pageTitle:"Error"})
    }

    // console.log(result);
    return res.render('searchResults',{movies:result, searchByTitle: title.searchByTitle, pageTitle:"Movies Found"})
  }catch(e){
    return res.status(500).json({e});
  }
});

router.route('/getmovie/:id').get(async (req, res) => {
  //code here for GET a single movie
  try{
    let id = req.params.id;
    
    if(!id){
      return res.status(400).render('error', {idError:"No ID Provided!!", pageTitle:"Error"});
    }

    if(typeof id !== 'string'){
      return res.status(400).render('error', {idError:"Invalid Type of ID!!", pageTitle:"Error"});
    }

    if(id == ''){
      return res.status(400).render('error', {idError:"No ID Provided!!", pageTitle:"Error"});
    }

    id = id.trim();

    let result = await getMovieById(id);

    

    if(result.Respose === false){
      return res.status(404).render('error', {idError:"No movie found with that id!", pageTitle:"Error"});
    }
    // console.log(result);
    return res.render('getmovie', {movie:result, pageTitle:result.Title.trim()});
  }catch(e){
    return res.status(500).json({e});
  }
});

export default router;
