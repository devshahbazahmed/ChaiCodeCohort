import Team from "../models/team.model.js";
import Owner from "../models/owner.model.js";
import ApiError from "../../../common/utils/api-error.js";

const createTeam = async ({ name, ownerId }) => {
  const team = await Team.create({
    name,
    ownerId,
  });

  return team;
};

const getAllTeams = async () => {
  const teams = await Team.find();

  if (!teams) {
    throw ApiError.notfound("Teams not found");
  }

  return teams;
};

const getTeamById = async (id) => {
  const team = await Team.findById(id);

  if (!team) {
    throw ApiError.notfound("Team not found");
  }

  return team;
};

const updateTeam = async (id, { name }) => {
  const updatedTeam = await Team.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );
  if (!updatedTeam) {
    throw ApiError.notfound("Team not found");
  }
  return updatedTeam;
};

const deleteTeam = async (id) => {
  const deletedTeam = await Team.findByIdAndDelete(id);
  if (!deleteTeam) {
    throw ApiError.notfound("Team not found");
  }
  return deletedTeam;
};

export { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };
