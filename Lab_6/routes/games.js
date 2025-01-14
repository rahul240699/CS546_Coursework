// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
import { teamData, gameData } from '../data/index.js';
import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import { ObjectId }  from 'mongodb';
import { error } from 'console';
import { teams } from '../config/mongoCollections.js';

const  findTeambyGameId = async (gameId) => {
    const teamsCollection = await teams();
    
    return await teamsCollection
      .find({'games._id': new ObjectId(gameId)})
      .toArray();
  
}

const router = express.Router();

router
  .route('/:teamId')
  .get(async (req, res) => {
    try{
      let teamId = req.params.teamId.trim();
      
      if(!teamId){
        return res
        .status(400)
        .json({error: 'Team Id has not been provided.'});
      }

      if(typeof teamId !== 'string'){
        return res
        .status(400)
        .json({error: 'Invalid Type for Team Id.'});
      }

      if(teamId.trim() === ''){
        return res
        .status(400)
        .json({error: 'Team Id is an empty string.'});
      }


      if(!ObjectId.isValid(teamId)){
        return res
        .status(400)
        .json({error: `${teamId} is not a valid Id.`});
      }

      let allGames = await gameData.getAllGames(teamId);
      return res.status(200).json(allGames);
    }catch(e){
      return res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    try{
    let teamId = req.params.teamId.trim();
      
    if(!teamId){
      return res
      .status(400)
      .json({error: 'Team Id has not been provided.'});
    }

    if(typeof teamId !== 'string'){
      return res
      .status(400)
      .json({error: 'Invalid Type for Team Id.'});
    }

    if(teamId.trim() === ''){
      return res
      .status(400)
      .json({error: 'Team Id is an empty string.'});
    }


    if(!ObjectId.isValid(teamId)){
      return res
      .status(400)
      .json({error: `${teamId} is not a valid Id.`});
    }

    teamId = teamId.trim();

    const newGame = req.body;

    if(!newGame.gameDate || !newGame.opposingTeamId || !newGame.homeOrAway || !newGame.finalScore){
        return res
        .status(400)
        .json({error: 'All fields need to be supplied.'});
    }

    if(typeof newGame.gameDate !== 'string' || typeof newGame.opposingTeamId !== 'string' || typeof newGame.homeOrAway !== 'string' ||
      typeof newGame.finalScore !== 'string'){
        return res
        .status(400)
        .json({error: 'Invalid Data Type, String should be supplied.'});  
    }

    if(newGame.gameDate.trim() === '' || newGame.opposingTeamId.trim() === '' || newGame.homeOrAway.trim() === '' ||
    newGame.finalScore.trim() === ''){
            return res
          .status(400)
          .json({error: 'Strings cannot be just empty spaces.'});     
    }

    newGame.gameDate = newGame.gameDate.trim();
    newGame.opposingTeamId = newGame.opposingTeamId.trim();
    newGame.homeOrAway = newGame.homeOrAway.trim();
    newGame.finalScore = newGame.finalScore.trim();


    let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    if(!dateRegex.test(newGame.gameDate)){
      return res
        .status(400)
        .json({error: `The Game Date is not in mm/dd/yyyy format.`});
    }

    let [month, day, year] = newGame.gameDate.split('/').map(Number);

    let date = new Date(year, month - 1, day);

    if(date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day){
      return res
        .status(400)
        .json({error: `Invalid Date.`});
    }
    
    let today = new Date();

    if(date > today){
      return res
        .status(400)
        .json({error: `Date cannot be in the future.`});
    }

    if(!ObjectId.isValid(newGame.opposingTeamId)){
      return res
        .status(400)
        .json({error: `${newGame.opposingTeamId} is not a valid ObjectID.`});
    }
  
    if(teamId === newGame.opposingTeamId){
      return res
        .status(400)
        .json({error: `A team cannot play itself.`});
    }

    const teamsCollection = await teams();

    const team = await teamsCollection.findOne({_id: new ObjectId(teamId)});

    if (!team) {
      return res
        .status(404)
        .json({error: `Team with the id ${teamId} does not exist.`});
    }

    const opposingTeam = await teamsCollection.findOne({_id: new ObjectId(newGame.opposingTeamId)});

    if (!opposingTeam) {
      return res
        .status(400)
        .json({error: `Team with the id ${newGame.opposingTeamId} does not exist.`});
    }

    if(team.sport.toLowerCase() !== opposingTeam.sport.toLowerCase()){
      return res
            .status(400)
            .json({error: `Both the teams need to play the same sport.`});
    }

    if(newGame.homeOrAway !== 'Home' & newGame.homeOrAway !== 'Away'){
      return res
        .status(400)
        .json({error: `Invalid Value for Home or Away.`});
    }

    let scoreRegex = /^\d+-\d+$/;

    if(!scoreRegex.test(newGame.finalScore)){
      return res
        .status(400)
        .json({error: `The score is not in the valid format.`});
    }

    let [home, away] = newGame.finalScore.split('-').map(Number);

    if(home < 0 || away < 0){
      return res
        .status(400)
        .json({error: `The Scores cannot be negative.`});
    }

    if(home === away){
      return res
        .status(400)
        .json({error: `The Scores cannot be equal.`});
    }


    if(typeof newGame.win !== 'boolean'){
      return res
        .status(400)
        .json({error: `Win should be boolean.`});

    }

    let game = await gameData.createGame(teamId, newGame.gameDate, newGame.opposingTeamId, newGame.homeOrAway , newGame.finalScore, newGame.win);

    return res.status(200).json({
      gameDate: newGame.gameDate, 
      opposingTeamId: newGame.opposingTeamId, 
      homeOrAway: newGame.homeOrAway, 
      finalScore: newGame.finalScore, 
      win: newGame.win
    });

    }catch(e){
      // console.log(e);
      return res.status(500).json({error: e});
    }

  });

router
  .route('/game/:gameId')
  .get(async (req, res) => {
    try{
    let gameId = req.params.gameId.trim();
      
    if(!gameId){
      return res
      .status(400)
      .json({error: 'Team Id has not been provided.'});
    }

    if(typeof gameId !== 'string'){
      return res
      .status(400)
      .json({error: 'Invalid Type for Team Id.'});
    }

    if(gameId.trim() === ''){
      return res
      .status(400)
      .json({error: 'Team Id is an empty string.'});
    }


    if(!ObjectId.isValid(gameId)){
      return res
      .status(400)
      .json({error: `${gameId} is not a valid Id.`});
    }

    gameId = gameId.trim();
    let game = await gameData.getGame(gameId);
    return res.status(200).json(game);
  }catch(e){
    return res
      .status(404)
      .json({error: e});
  }
  })
  .patch(async (req, res) => {
    try{
      const teamsCollection = await teams();
      let gameId = req.params.gameId.trim();

      let updateObject = {};
      
      if(!gameId){
        return res
        .status(400)
        .json({error: 'Team Id has not been provided.'});
      }

      if(typeof gameId !== 'string'){
        return res
        .status(400)
        .json({error: 'Invalid Type for Team Id.'});
      }

      if(gameId.trim() === ''){
        return res
        .status(400)
        .json({error: 'Team Id is an empty string.'});
      }


      if(!ObjectId.isValid(gameId)){
        return res
        .status(400)
        .json({error: `${gameId} is not a valid Id.`});
      }

      gameId = gameId.trim();

      let game = await gameData.getGame(gameId);


      if(!game){
        return res.status(404).json({error: e})
      }

      let team = await findTeambyGameId(gameId);

      const newGame = req.body;

      if(newGame.gameDate){
        if(typeof newGame.gameDate !== 'string'){
          return res
          .status(400)
          .json({error: 'Invalid Type of Input.'});
        }
    
        if(newGame.gameDate.trim() === ''){
          return res
          .status(400)
          .json({error: 'The Input is an empty string.'});
        }
    
        newGame.gameDate = newGame.gameDate.trim();

        let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

        if(!dateRegex.test(newGame.gameDate)){
          return res
            .status(400)
            .json({error: `The Game Date is not in mm/dd/yyyy format.`});
        }

        let [month, day, year] = newGame.gameDate.split('/').map(Number);

        let date = new Date(year, month - 1, day);

        if(date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day){
          return res
            .status(400)
            .json({error: `Invalid Date.`});
        }
        
        let today = new Date();

        if(date > today){
          return res
            .status(400)
            .json({error: `Date cannot be in the future.`});
        }
        updateObject["gameDate"] = newGame.gameDate;
      }
      if(newGame.opposingTeamId){
        if(typeof newGame.opposingTeamId !== 'string'){
          return res
          .status(400)
          .json({error: 'Invalid Type of Input.'});
        }
    
        if(newGame.opposingTeamId.trim() === ''){
          return res
          .status(400)
          .json({error: 'The Input is an empty string.'});
        }
    
        newGame.opposingTeamId = newGame.opposingTeamId.trim();

        if(!ObjectId.isValid(newGame.opposingTeamId)){
          return res
            .status(400)
            .json({error: `${newGame.opposingTeamId} is not a valid ObjectID.`});
        }

        if(newGame.opposingTeamId === team[0]._id.toString()){
          return res
            .status(400)
            .json({error: `A team cannot play itself.`});
        }

        const opposingTeam = await teamsCollection.findOne({_id: new ObjectId(newGame.opposingTeamId)});

        if (!opposingTeam) {
          return res
            .status(400)
            .json({error: `Team with the id ${newGame.opposingTeamId} does not exist.`});
        }

        if(opposingTeam.sport.toLowerCase() !== team[0].sport.toLowerCase()){
          return res
            .status(400)
            .json({error: `Both the teams need to play the same sport.`});
        }

        updateObject["opposingTeamId"] = newGame.opposingTeamId;
      }

      if(newGame.homeOrAway){
        if(typeof newGame.homeOrAway !== 'string'){
          return res
          .status(400)
          .json({error: 'Invalid Type of Input.'});
        }
    
        if(newGame.homeOrAway.trim() === ''){
          return res
          .status(400)
          .json({error: 'The Input is an empty string.'});
        }
    
        newGame.homeOrAway = newGame.homeOrAway.trim();

        if(newGame.homeOrAway !== 'Home' & newGame.homeOrAway !== 'Away'){
          return res
            .status(400)
            .json({error: `Invalid Value for Home or Away.`});
        }
        updateObject["homeOrAway"] = newGame.homeOrAway;
      }

      if(newGame.finalScore){
        if(typeof newGame.finalScore !== 'string'){
          return res
          .status(400)
          .json({error: 'Invalid Type of Input.'});
        }
    
        if(newGame.finalScore.trim() === ''){
          return res
          .status(400)
          .json({error: 'The Input is an empty string.'});
        }
    
        newGame.finalScore = newGame.finalScore.trim();  

        let scoreRegex = /^\d+-\d+$/;

        if(!scoreRegex.test(newGame.finalScore)){
          return res
            .status(400)
            .json({error: `The score is not in the valid format.`});
        }

        let [home, away] = newGame.finalScore.split('-').map(Number);

        if(home < 0 || away < 0){
          return res
            .status(400)
            .json({error: `The Scores cannot be negative.`});
        }

        if(home === away){
          return res
            .status(400)
            .json({error: `The Scores cannot be equal.`});
        }

        updateObject["finalScore"] = newGame.finalScore;
        }

        if(Object.keys(newGame).includes("win")){
          if(typeof newGame.win !== 'boolean'){
            return res
            .status(400)
            .json({error: `Win should be boolean.`});
          }
          updateObject["win"] = newGame.finalScore;
        }

        let updatedGame = await gameData.updateGame(gameId, updateObject);
        return res.status(200).json(updateObject);

      }catch(e){
        console.log(e);
        return res.status(500).json({error: e});
      }
  })
  .delete(async (req, res) => {
    try{
      let gameId = req.params.gameId.trim();
        
      if(!gameId){
        return res
        .status(400)
        .json({error: 'Team Id has not been provided.'});
      }
  
      if(typeof gameId !== 'string'){
        return res
        .status(400)
        .json({error: 'Invalid Type for Team Id.'});
      }
  
      if(gameId.trim() === ''){
        return res
        .status(400)
        .json({error: 'Team Id is an empty string.'});
      }
  
  
      if(!ObjectId.isValid(gameId)){
        return res
        .status(400)
        .json({error: `${gameId} is not a valid Id.`});
      }
  
      gameId = gameId.trim();
      let game = await gameData.removeGame(gameId);
      return res.status(200).json(game);
    }catch(e){
      return res
        .status(404)
        .json({error: e});
    }
  });

export default router;