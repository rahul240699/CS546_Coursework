// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

// import * as teams from "./data/teams.js";
import { teamData, gameData } from './data/index.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';

const db = await dbConnection();
// await db.dropDatabase();

// let allTeams = undefined;
// let lakers = undefined;
// let celtics  = undefined;
// let mavericks = undefined;
// let warriors = undefined;

// let game = undefined;
// let game2 = undefined;
 
try{
    lakers = await teamData.createTeam("Lakers", "Basketball   ", 1946, "Los Angeles", "ca", "Staples Center", 18, 
        [
  { firstName: "Lebron", lastName: "James", position: "SF" },
  { firstName: "Anthony", lastName: "Davis", position: "C" },
  { firstName: "D'Angelo", lastName: "Russell  ", position: "PG" },
  { firstName: "Austin  ", lastName: "Reaves", position: "SG" },
  { firstName: "Rui", lastName: "Hachimura", position: "PF" }
]
);
    console.log(lakers);
}catch(e){
    console.log(e);
}


// try{
//     celtics = await teamData.createTeam("   Celtics", "Basketball", 1946, "Boston", "MA", "TD Garden", 18, 
//         [
//   { firstName: "Jayson", lastName: "Tatum", position: "SF" },
//   { firstName: "Kristaps", lastName: "Porzingis", position: "C" },
//   { firstName: "Jrue", lastName: "Holiday", position: "PG" },
//   { firstName: "Jaylen", lastName: "Brown", position: "SG" },
//   { firstName: "Al", lastName: "Horford", position: "PF" }
// ]
// );
//     // console.log(celtics);
// }catch(e){
//     console.log(e);
// }
    
// try{
//     allTeams = await teamData.getAllTeams();
//     console.log(allTeams);
// }catch(e){
//     console.log(e);
// }

// try{
//     mavericks = await teamData.createTeam("Mavericks", "Basketball", 1980, "Dallas", "TX", "American Airlines Center", 1, 
//         [
//   { firstName: "Luka", lastName: "Doncic", position: "PG" },
//   { firstName: "Kyrie", lastName: "Irwing", position: "SG" },
//   { firstName: "Derrick", lastName: "Lively", position: "C" },
//   { firstName: "Klay", lastName: "Thompson", position: "SG" },
//   { firstName: "PJ", lastName: "Washington", position: "PF" }
// ]
// );
//     console.log(mavericks);
// }catch(e){
//     console.log(e);
// }

// try{
//     game = await gameData.createGame(lakers._id.toString(),'03/29/2023', mavericks._id.toString(), "Away     ", "101-99", true);
//     console.log(game);
// }catch(e){
//     console.log(e);
// }

// try{
//     game2 = await gameData.createGame(lakers._id.toString(),'03/31/2023', celtics._id.toString(), "Away     ", "108-113", false);
//     console.log(game2);
// }catch(e){
//     console.log(e);
// }

// try{
//     let allgames = await gameData.getAllGames(celtics._id.toString());
//     console.log(allgames);
// }catch(e){
//     console.log(e);
// }



try{
    let updatedGame = await gameData.updateGame('67194bfb2143f939845ccde5', {gameDate: '01/31/2023', opposingTeamId: '67194bfb2143f939845ccde1', homeOrAway:"Away     ",finalScore:"115-113", win: false});
    // console.log(updatedGame);
}catch(e){
    console.log(e);
}


// console.log(game._id);

// try{
//     let displayGame = await gameData.getGame('67180cb7e631c4867fbc11ff           ');
//     console.log(displayGame);
// }catch(e){
//     console.log(e);
// }

// try{
//     let deleteGame =  await gameData.removeGame('67191827fe408225cb56e85d      ');
//     console.log(deleteGame);
// }catch(e){
//     console.log(e);
// }

// try{
//     let moveLakers = await teamData.updateTeam(lakers._id.toString(),"Lakers", "Basketball    ", 1946, "New York", "NY", "Madison Square Garden   ", 18, 
//         [
//   { firstName: "Lebron", lastName: "James", position: "SF" },
//   { firstName: "Anthony", lastName: "Davis", position: "C" },
//   { firstName: "D'Angelo", lastName: "Russell  ", position: "PG" },
//   { firstName: "Austin  ", lastName: "Reaves", position: "SG" },
//   { firstName: "Rui", lastName: "Hachimura", position: "PF" }
// ]); 
//     console.log(moveLakers); 
// }catch(e){
//     console.log(e);
// }

// try{
//     const removeCeltics = await teamData.removeTeam(celtics._id.toString());
//     console.log(removeCeltics);
// }catch(e){
//     console.log(e);
// }

// try{
//     allTeams = await teamData.getAllTeams();
//     console.log(allTeams);
// }catch(e){
//     console.log(e);
// }


// try{
//     warriors = await teamData.createTeam("Golden State Warriors", "Basketball", 1946, "San Francisco", "ca", "Chase Center", NaN, 
//         [
//   { firstName: "Steph", lastName: "Curry", position: "PG" },
//   { firstName: "Buddy", lastName: "Hield", position: "" },
//   { firstName: "Jonathan", lastName: "Kuminga", position: {} },
//   { firstName: "Gary", lastName: "Payton", position: "SG" },
//   { firstName: "Andrew", lastName: "Wiggins", position: "SF" }
// ]
// );
//     console.log(warriors);
// }catch(e){
//     console.log(e);
// }

// try{
//     const removeWarriors = await teamData.removeTeam(`5706afbe57ca5048c3d1d91b`);
//     console.log(removeWarriors);
// }catch(e){
//     console.log(e);
// }


// try{
//     let moveWarriors = await teamData.updateTeam('5706afbe57ca5048c3d1d91b', "Brooklyn", "NY ", "Barclays Center"); 
//     console.log(moveWarriors); 
// }catch(e){
//     console.log(e);
// }

// try{
//     warriors = await teamData.createTeam("Golden State Warriors", "Basketball", 1846, "San Francisco", "gs", "Chase Center", 7, 
//         [
//     { firstName: "Steph", lastName: "Curry", position: "PG" },
//     { firstName: "Buddy", lastName: "Hield", position: "SG" },
//     { firstName: "Jonathan", lastName: "Kuminga", position: "" },
//     { lastName: "Payton", position: "SG" },
//     { firstName: "Andrew", lastName: "Wiggins"}
//     ]
//     );
//     console.log(warriors);
// }catch(e){
//     console.log(e);
// }

// try{
//     warriors = await teamData.getTeamById('5706afbe57ca5048c3d1d91b');
// }catch(e){
//     console.log(e);
// }

await closeConnection();