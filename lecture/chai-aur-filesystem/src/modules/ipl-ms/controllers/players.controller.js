import * as playerService from "../services/player.service.js";
import ApiResponse from "../../../common/utils/api-response.js";

const createPlayer = async (req, res) => {
  const newPlayer = await playerService.createPlayer(req.body);
  return ApiResponse.created(res, "Player created successfully", newPlayer);
};

const getAllPlayers = async (req, res) => {
  const allPlayers = await playerService.getAllPlayers();
  return ApiResponse.ok(res, "Players fetched successfully", allPlayers);
};

const getPlayerById = async (req, res) => {
  const player = await playerService.getPlayerById(req.params.id);
  return ApiResponse.ok(res, "Player fetched successfully", player);
};

const updatePlayer = async (req, res) => {
  const player = await playerService.updatePlayer(req.params.id, req.body);
  return ApiResponse.ok(res, "Player updated successfully", player);
};

const deletePlayer = async (req, res) => {
  await playerService.deletePlayer(req.params.id);
  return ApiResponse.ok(res, "Player deleted successfully");
};

const transferPlayer = async (req, res) => {
  const player = await playerService.transferPlayer(
    req.params.id,
    req.body.teamId
  );
  return ApiResponse.ok(res, "Player transferred successfully", player);
};

const getPlayersByTeam = async (req, res) => {
  const players = await playerService.getPlayersByTeam(req.params.teamId);
  return ApiResponse.ok(res, "Players fetched by team successfully", players);
};

const updatePlayerRole = async (req, res) => {
  const player = await playerService.updatePlayerRole(
    req.params.id,
    req.body.role
  );
  return ApiResponse.ok(res, "Player role updated successfully", player);
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
