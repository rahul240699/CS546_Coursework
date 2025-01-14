// This file should import both data files and export them as shown in the lecture code
import { createTeam, getTeamById, getAllTeams, removeTeam, updateTeam } from './teams.js';
import { createGame, getAllGames, getGame, updateGame, removeGame } from './games.js';

export const teamData = { createTeam, getTeamById, getAllTeams, removeTeam, updateTeam };
export const gameData = { createGame, getAllGames, getGame, updateGame, removeGame };