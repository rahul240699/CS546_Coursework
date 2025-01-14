// This data file should export all functions using the ES6 standard as shown in the lecture code
import { teams } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";



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

const checkState = (state) => {
  if(!state){
    throw `The state is an empty paramter.`;
  }
  if(typeof state !== 'string'){
    throw `The state is not a string.`;
  }
  
  if(state.trim() === ''){
    throw `The state is an empty string.`;
  }

  let usStateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  if(!usStateAbbreviations.includes(state.trim().toUpperCase())){
    throw `${state} is not a valid State Abbreviation.`;
  }
}

const checkYearFounded = (yearFounded) => {
  if(!yearFounded){
    throw `${yearFounded || 'The input'} is not a valid input for the year founded.`;
  }

  if(typeof yearFounded !== 'number' || yearFounded === NaN){
    throw `The yearFounded should be a number.`;
  }

  if(!Number.isInteger(yearFounded)){
    throw `The yearFounded should be a number.`
  }
  
  const currYear = new Date().getFullYear();
  if((yearFounded < 1850) || (yearFounded > currYear)){
    throw `${yearFounded} is not a valid year.`;
  }
}

const checkChampionshipsWon = (championshipsWon) =>{
  if(typeof championshipsWon !== 'number' || championshipsWon === NaN){
    throw `${championshipsWon || 'The input'} is not valid for the championships won.`;
  }

  if(!Number.isInteger(championshipsWon)){
    throw `The number of championships won should be non-negative whole number.`;
  }

  if(championshipsWon < 0){
    throw `The number of championships won should be non-negative whole number.`;
  }
}


//The Functions


export const createTeam = async (
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {
  checkStringParams(name);
  checkStringParams(sport);
  checkStringParams(city);
  checkStringParams(stadium);
  checkState(state);
  checkYearFounded(yearFounded);
  checkChampionshipsWon(championshipsWon);

  name = name.trim();
  sport = sport.trim();
  city = city.trim();
  stadium = stadium.trim();
  state = state.trim().toUpperCase();

  if(!Array.isArray(players)){
    throw `${players || 'Players'} is not an array.`;
  }
  if(players.length === 0){
    throw `There should be atleast one player in the team.`;
  }

  for(let i = 0; i < players.length; i++){
    let player = players[i];
    if(Array.isArray(player) || player === null || player === undefined){
      throw `The player input should be an object.`;
    }

    if(typeof player !== 'object'){
      throw `The player input should be an object.`;
    }
    
    if(!Object.keys(player).includes('firstName') || !Object.keys(player).includes('lastName') || !Object.keys(player).includes('position')){
      throw `The Player Object should contain firstName, lastName and position keys.`;
    }

    checkStringParams(player.firstName);
    checkStringParams(player.lastName);
    checkStringParams(player.position);

    player.firstName = player.firstName.trim();
    player.lastName = player.lastName.trim();
    player.position = player.position.trim().toUpperCase();
  }

  let winLossCount = "0-0";
  let games = [];

  let newTeam = {
    name: name,
    sport: sport,
    city: city,
    stadium: stadium,
    state: state,
    yearFounded: yearFounded,
    championshipsWon: championshipsWon,
    players: players,
    winLossCount: winLossCount,
    games: games
  }

  const teamsCollection = await teams();

  const result = await teamsCollection.insertOne(newTeam);
  if (!result.acknowledged || !result.insertedId)
    throw 'Could not create the team.';

  const newId = result.insertedId.toString();

  const team = await getTeamById(newId);

  team._id = team._id.toString();

  return team;

};

export const getAllTeams = async () => {
  const teamsCollection = await teams();

  let allTeams = await teamsCollection.find({}).toArray();

  if(!allTeams){
    return [];
  }

  allTeams = allTeams.map((team) =>({
    _id : team._id.toString(),
    name: team.name
  }));

  return allTeams;
};

export const getTeamById = async (id) => {
  checkStringParams(id);

  id = id.trim();

  if (!ObjectId.isValid(id)) {
    throw 'Invalid object ID.';
  }

  const teamsCollection = await teams();

  const team = await teamsCollection.findOne({_id: new ObjectId(id)});

  if (!team) {
    throw `Team with the id ${id} does not exist.`;
  }

  team._id = team._id.toString();
  return team;
};

export const removeTeam = async (id) => {
  checkStringParams(id);
  id = id.trim();

  if(!ObjectId.isValid(id)){
    throw `${id} is not a valid ObjectID.`;
  }

  const teamsCollection = await teams();

  const team = await teamsCollection.findOne({_id: new ObjectId(id)});

  if (!team) {
    throw `Team with the id ${id} does not exist.`;
  }

  let result = await teamsCollection.deleteOne({_id: new ObjectId(id)});
  if(!result === 0){
    throw `Team with the id ${id} does not exist, Hence could not delete.`;
  }

  return `${team.name} have been successfully deleted!`;
};


export const updateTeam = async (
  id,
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {
  checkStringParams(id);

  id = id.trim();

  if (!ObjectId.isValid(id)) {
    throw 'Invalid object ID.';
  }

  checkStringParams(name);
  checkStringParams(sport);
  checkStringParams(city);
  checkStringParams(stadium);
  checkState(state);
  checkYearFounded(yearFounded);
  checkChampionshipsWon(championshipsWon);

  name = name.trim();
  sport = sport.trim();
  city = city.trim();
  stadium = stadium.trim();
  state = state.trim().toUpperCase();

  if(!Array.isArray(players)){
    throw `${players || 'Players'} is not an array.`;
  }
  if(players.length === 0){
    throw `There should be atleast one player in the team.`;
  }

  for(let i = 0; i < players.length; i++){
    let player = players[i];
    if(Array.isArray(player) || player === null || player === undefined){
      throw `The player input should be an object.`;
    }

    if(typeof player !== 'object'){
      throw `The player input should be an object.`;
    }
    
    if(!Object.keys(player).includes('firstName') || !Object.keys(player).includes('lastName') || !Object.keys(player).includes('position')){
      throw `The Player Object should contain firstName, lastName and position keys.`;
    }

    checkStringParams(player.firstName);
    checkStringParams(player.lastName);
    checkStringParams(player.position);

    player.firstName = player.firstName.trim();
    player.lastName = player.lastName.trim();
    player.position = player.position.trim().toUpperCase();
  }

  const teamUpdate = {
    name: name,
    sport: sport,
    city: city,
    stadium: stadium,
    state: state,
    yearFounded: yearFounded,
    championshipsWon: championshipsWon,
    players: players
  };

  const teamsCollection = await teams();

  let result = await teamsCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: teamUpdate},
    {returnDocument: 'after'}
  );

  if(!result){
    throw `Could not Update the team.`;
  }

  result._id = result._id.toString();

  return result;

};

// export default teamDataFunctions;