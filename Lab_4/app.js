/*

Create a team of your choice.
Log the newly created team. (Just that team, not all teams)
Create another team of your choice.
Query all team, and log them all
Create the 3rd team of your choice.
Log the newly created 3rd team. (Just that team, not all team)
Move the first team
Log the first team with the updated info. 
Remove the second team you created.
Query all teams, and log them all
Try to create a team with bad input parameters to make sure it throws errors.
Try to remove a team that does not exist to make sure it throws errors.
Try to rename a team that does not exist to make sure it throws errors.
Try to rename a team passing in invalid data to make sure it throws errors.
Try getting a team by ID that does not exist to make sure it throws errors.

*/
import * as teams from "./data/teams.js";
import {dbConnection, closeConnection} from './config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

let allTeams = undefined;
let lakers = undefined;
let celtics  = undefined;
let mavericks = undefined;
let warriors = undefined;
 
try{
    lakers = await teams.createTeam("Lakers", "Basketball   ", 1946, "Los Angeles", "ca", "Staples Center", 18, 
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


try{
    celtics = await teams.createTeam("   Celtics", "Basketball", 1946, "Boston", "MA", "TD Garden", 18, 
        [
  { firstName: "Jayson", lastName: "Tatum", position: "SF" },
  { firstName: "Kristaps", lastName: "Porzingis", position: "C" },
  { firstName: "Jrue", lastName: "Holiday", position: "PG" },
  { firstName: "Jaylen", lastName: "Brown", position: "SG" },
  { firstName: "Al", lastName: "Horford", position: "PF" }
]
);
    // console.log(celtics);
}catch(e){
    console.log(e);
}
    
try{
    allTeams = await teams.getAllTeams();
    console.log(allTeams);
}catch(e){
    console.log(e);
}

try{
    mavericks = await teams.createTeam("Mavericks", "Basketball", 1980, "Dallas", "TX", "American Airlines Center", 1, 
        [
  { firstName: "Luka", lastName: "Doncic", position: "PG" },
  { firstName: "Kyrie", lastName: "Irwing", position: "SG" },
  { firstName: "Derrick", lastName: "Lively", position: "C" },
  { firstName: "Klay", lastName: "Thompson", position: "SG" },
  { firstName: "PJ", lastName: "Washington", position: "PF" }
]
);
    console.log(mavericks);
}catch(e){
    console.log(e);
}

try{
    let moveLakers = await teams.moveTeam(lakers._id.toString(), "New York", "NY ", "Madison Square Garden"); 
    console.log(moveLakers); 
}catch(e){
    console.log(e);
}

try{
    const removeCeltics = await teams.removeTeam(celtics._id.toString());
    console.log(removeCeltics);
}catch(e){
    console.log(e);
}

try{
    allTeams = await teams.getAllTeams();
    console.log(allTeams);
}catch(e){
    console.log(e);
}


try{
    warriors = await teams.createTeam("Golden State Warriors", "Basketball", 1946, "San Francisco", "ca", "Chase Center", NaN, 
        [
  { firstName: "Steph", lastName: "Curry", position: "PG" },
  { firstName: "Buddy", lastName: "Hield", position: "" },
  { firstName: "Jonathan", lastName: "Kuminga", position: {} },
  { firstName: "Gary", lastName: "Payton", position: "SG" },
  { firstName: "Andrew", lastName: "Wiggins", position: "SF" }
]
);
    console.log(warriors);
}catch(e){
    console.log(e);
}

try{
    const removeWarriors = await teams.removeTeam(`5706afbe57ca5048c3d1d91b`);
    console.log(removeWarriors);
}catch(e){
    console.log(e);
}


try{
    let moveWarriors = await teams.moveTeam('5706afbe57ca5048c3d1d91b', "Brooklyn", "NY ", "Barclays Center"); 
    console.log(moveWarriors); 
}catch(e){
    console.log(e);
}

try{
    warriors = await teams.createTeam("Golden State Warriors", "Basketball", 1846, "San Francisco", "gs", "Chase Center", 7, 
        [
    { firstName: "Steph", lastName: "Curry", position: "PG" },
    { firstName: "Buddy", lastName: "Hield", position: "SG" },
    { firstName: "Jonathan", lastName: "Kuminga", position: "" },
    { lastName: "Payton", position: "SG" },
    { firstName: "Andrew", lastName: "Wiggins"}
    ]
    );
    console.log(warriors);
}catch(e){
    console.log(e);
}

try{
    warriors = await teams.getTeamById('5706afbe57ca5048c3d1d91b');
}catch(e){
    console.log(e);
}

await closeConnection();