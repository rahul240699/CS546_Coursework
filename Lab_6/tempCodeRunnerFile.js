await db.dropDatabase();

let allTeams = undefined;
let lakers = undefined;
let celtics  = undefined;
let mavericks = undefined;
let warriors = undefined;

let game = undefined;
let game2 = undefined;
 
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


try{
    celtics = await teamData.createTeam("   Celtics", "Basketball", 1946, "Boston", "MA", "TD Garden", 18, 
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
    allTeams = await teamData.getAllTeams();
    console.log(allTeams);
}catch(e){
    console.log(e);
}

try{
    mavericks = await teamData.createTeam("Mavericks", "Basketball", 1980, "Dallas", "TX", "American Airlines Center", 1, 
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
    game = await gameData.createGame(lakers._id.toString(),'03/29/2023', mavericks._id.toString(), "Away     ", "101-99", true);
    console.log(game);
}catch(e){
    console.log(e);
}

try{
    game2 = await gameData.createGame(lakers._id.toString(),'03/31/2023', celtics._id.toString(), "Away     ", "108-113", false);
    console.log(game2);
}catch(e){
    console.log(e);
}

try{
    let allgames = await gameData.getAllGames(celtics._id.toString());
    console.log(allgames);
}catch(e){
    console.log(e);
}