import ApiError from "../../../common/utils/api-error.js";
import Team from "../models/team.model.js";
import Player from "../models/player.model.js";

const createPlayer = async ({ name, role, teamId }) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw ApiError.notfound("Team not found");
  }
  const newPlayer = await Player.create({
    name,
    role,
    teamId,
  });
  return newPlayer;
};

const getAllPlayers = async () => {
  const allPlayers = await Player.find();
  if (!allPlayers) {
    throw ApiError.notfound("Players not found");
  }
  return allPlayers;
};

const getPlayerById = async (id) => {
  const player = await Player.findById(id);
  if (!player) {
    throw ApiError.notfound("Player not found");
  }
  return player;
};

const updatePlayer = async (id, { name, role }) => {
  const updatedPlayer = await Player.findByIdAndUpdate(
    id,
    {
      name,
      role,
    },
    { new: true, runValidators: true }
  );
  if (!updatedPlayer) {
    throw ApiError.notfound("Player not found");
  }
  return updatedPlayer;
};

const deletePlayer = async (id) => {
  const player = await Player.findByIdAndDelete(id);
  if (!player) {
    throw ApiError.notfound("Player not found");
  }
  return player;
};

const transferPlayer = async (playerId, newTeamId) => {
  const team = await Team.findById(newTeamId);

  if (!team) {
    throw ApiError.notfound("Team not found");
  }

  const player = await Player.findByIdAndUpdate(
    playerId,
    {
      teamId: newTeamId,
    },
    { new: true, runValidators: true }
  ).populate("teamId", "name");

  if (!player) {
    throw ApiError.notfound("Player not found");
  }

  return player;
};

const getPlayersByTeam = async (teamId) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw ApiError.notfound("Team not found");
  }

  const players = await Player.find({ teamId });

  if (!players) {
    throw ApiError.notfound("Players not found");
  }

  return players;
};

const updatePlayerRole = async (playerId, role) => {
  const player = await Player.findByIdAndUpdate(
    playerId,
    {
      role,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!player) {
    throw ApiError.notfound("Player not found");
  }

  return player;
};

export {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  transferPlayer,
  getPlayersByTeam,
  updatePlayerRole,
};
