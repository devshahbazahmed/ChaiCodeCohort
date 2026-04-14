import * as sponsorService from "../services/sponsor.service.js";
import ApiResponse from "../../../common/utils/api-response.js";

const createSponsor = async (req, res) => {
  const newSponsor = await sponsorService.createSponsor(req.body);
  return ApiResponse.created(res, "Sponsor created successfully", newSponsor);
};

const getAllSponsors = async (req, res) => {
  const allSponsors = await sponsorService.getAllSponsors();
  return ApiResponse.ok(res, "Fetched all sponsors successfully", allSponsors);
};

const getSponsorById = async (req, res) => {
  const sponsor = await sponsorService.getSponsorById(req.params.id);
  return ApiResponse.ok(res, "Sponsor fetched successfully", sponsor);
};

const updateSponsor = async (req, res) => {
  const updatedSponsor = await sponsorService.updateSponsor(
    req.params.id,
    req.body
  );
  return ApiResponse.ok(res, "Sponsor updated successfully", updatedSponsor);
};

const deleteSponsor = async (req, res) => {
  await sponsorService.deleteSponsor(req.params.id);
  return ApiResponse.ok(res, "Sponsor deleted successfully");
};

export {
  createSponsor,
  getAllSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
};
