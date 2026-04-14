import * as teamSponsorService from "../services/team-sponsor.service.js";
import ApiResponse from "../../../common/utils/api-response.js";

const attachSponsor = async (req, res) => {
  const teamSponsor = await teamSponsorService.attachSponsor(req.body);
  return ApiResponse.created(
    res,
    "Team Sponsor created successfully",
    teamSponsor
  );
};

const detachSponsor = async (req, res) => {
  const existing = await teamSponsorService.detachSponsor(req.body);
  return ApiResponse.ok(res, "Team Sponsor detached successfully", existing);
};

export { attachSponsor, detachSponsor };
