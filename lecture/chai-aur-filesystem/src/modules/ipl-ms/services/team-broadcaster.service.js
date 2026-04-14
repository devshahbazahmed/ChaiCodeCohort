import Team from "../models/team.model.js";
import Broadcaster from "../models/broadcaster.model.js";
import TeamBroadcaster from "../models/team-broadcaster.model.js";
import ApiError from "../../../common/utils/api-error.js";

const assignBroadcaster = async ({ teamId, broadcasterId }) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw ApiError.notfound("Team not found");
  }
  const broadcaster = await Broadcaster.findById(broadcasterId);
  if (!broadcaster) {
    throw ApiError.notfound("Broadcaster not found");
  }

  const existing = await TeamBroadcaster.findOne({ teamId, broadcasterId });
  if (existing) {
    throw ApiError.conflict("Broadcaster already assigned to this team");
  }

  const teamBroadcaster = await TeamBroadcaster.create({
    teamId,
    broadcasterId,
  });
  return teamBroadcaster;
};

const unassignBroadcaster = async ({ teamId, broadcasterId }) => {};

export { assignBroadcaster };
