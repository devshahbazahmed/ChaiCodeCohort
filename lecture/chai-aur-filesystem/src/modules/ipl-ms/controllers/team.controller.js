import ApiResponse from "../../../common/utils/api-response.js";
import * as teamServices from "../services/team.service.js";

const createTeam = async (req, res) => {
  const team = await teamServices.createTeam(req.body);
  return ApiResponse.created(res, "Team created successfully", team);
};

const getAllTeams = async (req, res) => {
  const allTeams = await teamServices.getAllTeams();
  return ApiResponse.ok(res, "Teams fetched successfully", allTeams);
};

const getTeamById = async (req, res) => {
  const team = await teamServices.getTeamById(req.params.id);
  return ApiResponse.ok(res, "Team fetched successfully", team);
};

const getTeamsByOwners = async (req, res) => {
  const teams = await teamServices.getTeamsByOwners(req.params.ownerId);
  return ApiResponse.ok(res, "Teams fetched successfully", teams);
};

const updateTeam = async (req, res) => {
  const updatedTeam = await teamServices.updateTeam(req.params.id, req.body);
  return ApiResponse.ok(res, "Team updated successfully", updatedTeam);
};

const deleteTeam = async (req, res) => {
  await teamServices.deleteTeam(req.params.id);
  return ApiResponse.ok(res, "Team deleted successfully");
};

export {
  createTeam,
  getAllTeams,
  getTeamById,
  getTeamsByOwners,
  updateTeam,
  deleteTeam,
};
