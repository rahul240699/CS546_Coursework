// This data file should export all functions using the ES6 standard as shown in the lecture code
import { ObjectId } from "mongodb";
import { teams } from "../config/mongoCollections.js";
import {teamData} from "./index.js";
import { dbConnection } from "../config/mongoConnection.js";

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

const  findTeambyGameId = async (gameId) => {
  checkStringParams(gameId);
    const teamsCollection = await teams();
    
    return await teamsCollection
      .find({'games._id': new ObjectId(gameId)})
      .toArray();
  
}


export const createGame = async (
  teamId,
  gameDate,
  opposingTeamId,
  homeOrAway,
  finalScore,
  win
) => {
  checkStringParams(teamId);
  checkStringParams(gameDate);
  checkStringParams(opposingTeamId);
  checkStringParams(homeOrAway);
  checkStringParams(finalScore);

  if(typeof win !== 'boolean'){
    throw `Win should be boolean.`;
  }

  teamId = teamId.trim();
  gameDate = gameDate.trim();
  homeOrAway = homeOrAway.trim();
  // console.log(homeOrAway);
  finalScore = finalScore.trim();

  if(!ObjectId.isValid(teamId)){
    throw `${teamId} is not a valid ObjectID.`;
  }

  if(!ObjectId.isValid(opposingTeamId)){
    throw `${opposingTeamId} is not a valid ObjectID.`;
  }

  if(teamId === opposingTeamId){
    throw `A team cannot play itself.`
  }

  if(homeOrAway !== 'Home' & homeOrAway !== 'Away'){
    throw `Invalid Value for Home or Away.`
  }

  let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

  if(!dateRegex.test(gameDate)){
    throw `The Game Date is not in mm/dd/yyyy format.`;
  }

  let [month, day, year] = gameDate.split('/').map(Number);

  let date = new Date(year, month - 1, day);

  if(date.getFullYear() !== year || date.getMonth() !== month -1 || date.getDate() !== day){
    throw `Invalid Date.`
  }
  
  let today = new Date();

  if(date > today){
    throw `Date cannot be in the future.`
  }

  let scoreRegex = /^\d+-\d+$/;

  if(!scoreRegex.test(finalScore)){
    throw `The score is not in the valid format.`
  }

  let [home, away] = finalScore.split('-').map(Number);

  if(home < 0 || away < 0){
    throw `The Scores cannot be negative.`;
  }

  if(home === away){
    throw `The Scores cannot be equal.`
  }

  const teamsCollection = await teams();

  const team = await teamsCollection.findOne({_id: new ObjectId(teamId)});

  if (!team) {
    throw `Team with the id ${teamId} does not exist.`;
  }

  const opposingTeam = await teamsCollection.findOne({_id: new ObjectId(opposingTeamId)});

  if (!opposingTeam) {
    throw `Team with the id ${opposingTeamId} does not exist.`;
  }

  if(team.sport.toLowerCase() !== opposingTeam.sport.toLowerCase()){
    throw `Teams not in the same sport cannot play each other.`;
  }

  if(year < team.yearFounded || year < opposingTeam.yearFounded){
    throw `The Game cannot be played before the team is founded.`
  }

  let winLossCount = team.winLossCount;

  let [wins, losses] = winLossCount.split("-").map(Number);

  if(win){
    wins += 1;
  }else{
    losses += 1;
  }

  let newWinLossCount = `${wins}-${losses}`;

  let gameCreate = {
    _id : new ObjectId(),
    gameDate: gameDate,
    opposingTeamId: opposingTeamId,
    homeOrAway: homeOrAway,
    finalScore: finalScore,
    win: win
  };

  const result = await teamsCollection.findOneAndUpdate(
    {_id: new ObjectId(teamId)},
    {$push:{games :{$each : [gameCreate]}}} ,
    {returnDocument: 'after'}
  );

  if(!result){
    throw `Could Not add game.`
  }

  const result2 = await teamsCollection.findOneAndUpdate(
    {_id: new ObjectId(teamId)},
    {$set: {winLossCount: newWinLossCount}},
    {returnDocument: 'after'}
  );

  if(!result2){
    throw `Could Not Update Win/Loss count.`
  }

  let teamObj = await teamData.getTeamById(teamId);

  return teamObj;
};



export const getAllGames = async (teamId) => {
  checkStringParams(teamId);
  teamId = teamId.trim();

  if(!ObjectId.isValid(teamId)){
    throw `${teamId} is not a valid ObjectID.`;
  }

  const teamsCollection = await teams();

  const team = await teamsCollection.findOne({_id: new ObjectId(teamId)});

  if (!team) {
    return [];
  }

  let games = team.games;

  return games;
};


export const getGame = async (gameId) => {
  checkStringParams(gameId);

  gameId = gameId.trim();

  if(!ObjectId.isValid(gameId)){
    throw `${gameId} is not a valid ObjectID.`;
  }

  const teamsCollection = await teams();

  const game = await teamsCollection.findOne(
    {'games._id': new ObjectId(gameId)},
    {projection: {_id:0, 'games.$':1}}
  );

  if(!game){
    throw `The game with ${gameId} does not exist.`
  }

  return game.games[0];
  
};



export const updateGame = async (gameId, updateObject) => {
  checkStringParams(gameId);

  if(typeof updateObject !== 'object' || Array.isArray(updateObject) || updateObject === null || updateObject === undefined){
    throw `The updateObject is not an object.`;
  }

  if(Object.keys(updateObject).length === 0){
    throw `The updateObject is empty`;
  }

  let team = await findTeambyGameId(gameId);
  // console.log(team[0]._id.toString());

  let opposingTeam = undefined;

  gameId = gameId.trim();

  let updatedGame = {};

  if(!ObjectId.isValid(gameId)){
    throw `${gameId} is not a valid ObjectID.`;
  }

  const teamsCollection = await teams();


  if(updateObject.gameDate){
    checkStringParams(updateObject.gameDate);
    updateObject.gameDate = updateObject.gameDate.trim();
  }

  if(updateObject.gameDate){
    checkStringParams(updateObject.gameDate);

    updateObject.gameDate = updateObject.gameDate.trim();

    let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    if(!dateRegex.test(updateObject.gameDate)){
      throw `The Game Date is not in mm/dd/yyyy format.`;
    }

    let [month, day, year] = updateObject.gameDate.split('/').map(Number);

    let date = new Date(year, month - 1, day);

    if(date.getFullYear() !== year || date.getMonth() !== month -1 || date.getDate() !== day){
      throw `Invalid Date.`
    }
    
    let today = new Date();

    if(date > today){
      throw `Date cannot be in the future.`
    }

    updatedGame['games.$.gameDate'] = updateObject.gameDate;
  }

  if(updateObject.homeOrAway){
    checkStringParams(updateObject.homeOrAway);
    updateObject.homeOrAway = updateObject.homeOrAway.trim();

    if(updateObject.homeOrAway !== 'Home' & updateObject.homeOrAway !== 'Away'){
      throw `Invalid Value for Home or Away.`
    }

    updatedGame['games.$.homeOrAway'] = updateObject.homeOrAway;
  }

  if(updateObject.finalScore){
    checkStringParams(updateObject.finalScore);
    updateObject.finalScore = updateObject.finalScore.trim();
    
    let scoreRegex = /^\d+-\d+$/;

    if(!scoreRegex.test(updateObject.finalScore)){
      throw `The score is not in the valid format.`
    }

    let [home, away] = updateObject.finalScore.split('-').map(Number);

    if(home < 0 || away < 0){
      throw `The Scores cannot be negative.`;
    }

    if(home === away){
      throw `The Scores cannot be equal.`
    }

    updatedGame['games.$.finalScore'] = updateObject.finalScore;
  }

  if(updateObject.opposingTeamId){
    checkStringParams(updateObject.opposingTeamId);

    updateObject.opposingTeamId = updateObject.opposingTeamId.trim();

    if(!ObjectId.isValid(updateObject.opposingTeamId)){
      throw `${updateObject.opposingTeamId} is not a valid ObjectID.`;
    }

    if(updateObject.opposingTeamId === team[0]._id.toString()){
      throw `A team cannot play itself.`
    }

    opposingTeam = await teamsCollection.findOne({_id: new ObjectId(updateObject.opposingTeamId)});

    if (!opposingTeam) {
      throw `Team with the id ${updateObject.opposingTeamId} does not exist.`;
    }

    if(opposingTeam.sport.toLowerCase() !== team[0].sport.toLowerCase()){
      throw `Both the teams need to play the same sport.`
    }


    updatedGame['games.$.opposingTeamId'] = updateObject.opposingTeamId;
  }

  if(updateObject.win){
    if(typeof updateObject.win !== 'boolean'){
      throw `Win should be boolean.`;
    }

    updatedGame['games.$.win'] = updateObject.win;
  }

  

  let result = await teamsCollection.findOneAndUpdate(
    {'games._id': new ObjectId(gameId)},
    {$set: updatedGame},
    {returnDocument: 'after'}
  );

  if(!result){
    throw `Could not update the game as, the game with id ${gameId} does not exist.`
  }

  let games = await getAllGames(result._id.toString());

  let newWins = 0
  let newlosses = 0;

  for (let i in games){
    if(games[i].win){
      newWins += 1;
    }else{
      newlosses += 1;
    }
  }
  // console.log(newWins);

  let newWinLossCount = `${newWins}-${newlosses}`;

  let result2 = await teamsCollection.findOneAndUpdate(
    {_id: result._id},
    {$set: {winLossCount: newWinLossCount}},
    {returnDocument: 'after'}
  );

  if(!result2){
    throw `Could Not Update Win/Loss count.`
  }


  return result2;
};

export const removeGame = async (gameId) => {
  checkStringParams(gameId);
  gameId = gameId.trim();

  if(!ObjectId.isValid(gameId)){
    throw `${gameId} is not a valid ObjectID.`;
  }

  const teamsCollection = await teams();

  let game = await getGame(gameId);

  if(!game){
    throw `Could not find the game with ${gameId}.`
  }

  const result = await teamsCollection.findOneAndUpdate(
    {'games._id': new ObjectId(gameId)},
    {$pull: {games: {_id: new ObjectId(gameId)}}},
    {returnDocument: 'after'}
  );

  if(!result){
    throw `Could not delete game, as game with ${gameId} does not exist.`
  }

  let winLossCount = result.winLossCount;

  let win = game.win;

  let [wins, losses] = winLossCount.split("-").map(Number);

  if(win){
    wins -= 1;
  }else{
    losses -= 1;
  }

  let newWinLossCount = `${wins}-${losses}`;

  let result2 = await teamsCollection.findOneAndUpdate(
    {_id: result._id},
    {$set: {winLossCount: newWinLossCount}},
    {returnDocument: 'after'}
  );

  if(!result2){
    throw `Could Not Update Win/Loss count.`
  }


  return result2;

};
