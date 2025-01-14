// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from 'express';
import { teamData, gameData } from '../data/index.js';
import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import { ObjectId }  from 'mongodb';
import { error } from 'console';

let usStateAbbreviations = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];


const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try{
      let teams = await teamData.getAllTeams();
      return res.status(200).json(teams);
    }catch(e){
      return res.status(500).json({e});
    }
  })
  .post(async (req, res) => {
    const newTeam = req.body;

    if (!newTeam || Object.keys(newTeam).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body.'});
    }

    if(!newTeam.name || !newTeam.sport || !newTeam.yearFounded || !newTeam.city || !newTeam.state || !newTeam.stadium ||
      !newTeam.championshipsWon || !newTeam.players){
        return res
        .status(400)
        .json({error: 'All fields need to be supplied.'});
    }

    if(typeof newTeam.name !== 'string' || typeof newTeam.sport !== 'string' || typeof newTeam.city !== 'string' ||
      typeof newTeam.state !== 'string'  || typeof newTeam.stadium !== 'string'){
        return res
        .status(400)
        .json({error: 'Invalid Data Type, String should be supplied.'});  
    }

    if(newTeam.name.trim() === '' || newTeam.sport.trim() === '' || newTeam.state.trim() === '' ||
    newTeam.city.trim() === '' || newTeam.stadium.trim() === ''){
            return res
          .status(400)
          .json({error: 'Strings cannot be just empty spaces.'});     
    }
    
    if(!usStateAbbreviations.includes(newTeam.state.trim().toUpperCase())){
      return res
      .status(400)
      .json({error: `${newTeam.state} is not a valid State Abbreviation.`});
    }


    if(typeof newTeam.yearFounded !== 'number' || newTeam.yearFounded === NaN){
      return res
      .status(400)
      .json({error: 'Year Founded should be a valid number.'});
    }

    if(!Number.isInteger(newTeam.yearFounded)){
      return res
      .status(400)
      .json({error: 'Year Founded should be a valid number.'});
    }

    const currYear = new Date().getFullYear();
    if((newTeam.yearFounded < 1850) || (newTeam.yearFounded > currYear)){
      return res
      .status(400)
      .json({error: `${newTeam.yearFounded} is not a valid year.`});
    }


    if(typeof newTeam.championshipsWon !== 'number' || newTeam.championshipsWon === NaN){
      return res
      .status(400)
      .json({error: 'Championships Won should be a valid number.'});
    }

    if(!Number.isInteger(newTeam.championshipsWon)){
      return res
      .status(400)
      .json({error: `The number of championships won should be non-negative whole number.`});
    }
  
    if(newTeam.championshipsWon < 0){
      return res
      .status(400)
      .json({error: `The number of championships won should be non-negative whole number.`});
    }


    if(!Array.isArray(newTeam.players)){
      return res
      .status(400)
      .json({error: `${newTeam.players || 'Players'} is not an array.`});
    }
    if(newTeam.players.length === 0){
      return res
      .status(400)
      .json({error: `There should be atleast one player in the team.`});
    }
  
    for(let i = 0; i < newTeam.players.length; i++){
      let player = newTeam.players[i];
      if(Array.isArray(player) || player === null || player === undefined){
        return res
      .status(400)
      .json({error: `The player input should be an object.`});
      }
  
      if(typeof player !== 'object'){
        return res
      .status(400)
      .json({error: `The player input should be an object.`});
      }
      
      if(!Object.keys(player).includes('firstName') || !Object.keys(player).includes('lastName') || !Object.keys(player).includes('position')){
        return res
      .status(400)
      .json({error: `The Player Object should contain firstName, lastName and position keys.`});
      }
      
      if(!player.firstName || !player.lastName || !player.position){
        return res
      .status(400)
      .json({error: `Player has empty input(s).`});
      }

      if(typeof player.firstName !== 'string' || typeof player.lastName !== 'string' || typeof player.position !== 'string'){
        return res
      .status(400)
      .json({error: `Player has an invalid input.`});
      }

      if(player.firstName.trim() === '' || player.lastName.trim() === '' || player.position === ''){
        return res
      .status(400)
      .json({error: `Strings cannot be empty spaces.`});
      }
    }

    try{
      let teamCreate = await teamData.createTeam(newTeam.name, newTeam.sport, newTeam.yearFounded, newTeam.city, newTeam.state, newTeam.stadium,
        newTeam.championshipsWon, newTeam.players
      )

      return res.status(200).json(teamCreate);
    }catch(e){
      return res.status(500).json({error: e});
    }

  });

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

      let team = await teamData.getTeamById(teamId);
      return res.status(200).json(team);
    }catch(e){
      return res
      .status(404)
      .json({error: e});
    }
  })
  .delete(async (req, res) => {
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

      let team = await teamData.removeTeam(teamId);
      return res.status(200).json({_id: teamId, deleted: "true"});
    }catch(e){
      return res
      .status(404)
      .json({error: e});
    }
  })
  .put(async (req, res) => {
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

      const newTeam = req.body;

    if (!newTeam || Object.keys(newTeam).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body.'});
    }

    if(!newTeam.name || !newTeam.sport || !newTeam.yearFounded || !newTeam.city || !newTeam.state || !newTeam.stadium ||
      !newTeam.championshipsWon || !newTeam.players){
        return res
        .status(400)
        .json({error: 'All fields need to be supplied.'});
    }

    if(typeof newTeam.name !== 'string' || typeof newTeam.sport !== 'string' || typeof newTeam.city !== 'string' ||
      typeof newTeam.state !== 'string'  || typeof newTeam.stadium !== 'string'){
        return res
        .status(400)
        .json({error: 'Invalid Data Type, String should be supplied.'});  
    }

    if(newTeam.name.trim() === '' || newTeam.sport.trim() === '' || newTeam.state.trim() === '' ||
    newTeam.city.trim() === '' || newTeam.stadium.trim() === ''){
            return res
          .status(400)
          .json({error: 'Strings cannot be just empty spaces.'});     
    }
    
    if(!usStateAbbreviations.includes(newTeam.state.trim().toUpperCase())){
      return res
      .status(400)
      .json({error: `${newTeam.state} is not a valid State Abbreviation.`});
    }


    if(typeof newTeam.yearFounded !== 'number' || newTeam.yearFounded === NaN){
      return res
      .status(400)
      .json({error: 'Year Founded should be a valid number.'});
    }

    if(!Number.isInteger(newTeam.yearFounded)){
      return res
      .status(400)
      .json({error: 'Year Founded should be a valid number.'});
    }

    const currYear = new Date().getFullYear();
    if((newTeam.yearFounded < 1850) || (newTeam.yearFounded > currYear)){
      return res
      .status(400)
      .json({error: `${newTeam.yearFounded} is not a valid year.`});
    }


    if(typeof newTeam.championshipsWon !== 'number' || newTeam.championshipsWon === NaN){
      return res
      .status(400)
      .json({error: 'Championships Won should be a valid number.'});
    }

    if(!Number.isInteger(newTeam.championshipsWon)){
      return res
      .status(400)
      .json({error: `The number of championships won should be non-negative whole number.`});
    }
  
    if(newTeam.championshipsWon < 0){
      return res
      .status(400)
      .json({error: `The number of championships won should be non-negative whole number.`});
    }


    if(!Array.isArray(newTeam.players)){
      return res
      .status(400)
      .json({error: `${newTeam.players || 'Players'} is not an array.`});
    }
    if(newTeam.players.length === 0){
      return res
      .status(400)
      .json({error: `There should be atleast one player in the team.`});
    }
  
    for(let i = 0; i < newTeam.players.length; i++){
      let player = newTeam.players[i];
      if(Array.isArray(player) || player === null || player === undefined){
        return res
      .status(400)
      .json({error: `The player input should be an object.`});
      }
  
      if(typeof player !== 'object'){
        return res
      .status(400)
      .json({error: `The player input should be an object.`});
      }
      
      if(!Object.keys(player).includes('firstName') || !Object.keys(player).includes('lastName') || !Object.keys(player).includes('position')){
        return res
      .status(400)
      .json({error: `The Player Object should contain firstName, lastName and position keys.`});
      }
      
      if(!player.firstName || !player.lastName || !player.position){
        return res
      .status(400)
      .json({error: `Player has empty input(s).`});
      }

      if(typeof player.firstName !== 'string' || typeof player.lastName !== 'string' || typeof player.position !== 'string'){
        return res
      .status(400)
      .json({error: `Player has an invalid input.`});
      }

      if(player.firstName.trim() === '' || player.lastName.trim() === '' || player.position === ''){
        return res
      .status(400)
      .json({error: `Strings cannot be empty spaces.`});
      }
    }

    let updateTeam = await teamData.updateTeam(teamId, newTeam.name, newTeam.sport, newTeam.yearFounded, newTeam.city, newTeam.state, newTeam.stadium,
      newTeam.championshipsWon, newTeam.players);
      return res
      .status(200)
      .json(updateTeam);

    }catch(e){
      return res.status(500).json({error: e});
    }
  });

export default router;