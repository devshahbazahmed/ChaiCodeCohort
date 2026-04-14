import * as teamBroadcasterService from "../services/team-broadcaster.service.js";
import ApiResponse from "../../../common/utils/api-response.js";

const assignBroadcaster = async (req, res) => {
  const teamBroadcaster = await teamBroadcasterService.assignBroadcaster(
    req.body
  );
  return ApiResponse.created(
    res,
    "Team Broadcaster assigned successfully",
    teamBroadcaster
  );
};

const unassignBroadcaster = async (req, res) => {
  const existing = await teamBroadcasterService.unassignBroadcaster(req.body);
  return ApiResponse.ok(
    res,
    "Team Broadcaster unassigned successfully",
    existing
  );
};

export { assignBroadcaster, unassignBroadcaster };
