import Sponsor from "../models/sponsor.model.js";
import ApiError from "../../../common/utils/api-error.js";

const createSponsor = async ({ name }) => {
  const sponsor = await Sponsor.create({
    name,
  });
  return sponsor;
};

const getAllSponsors = async () => {
  const allSponsors = await Sponsor.find();
  if (!allSponsors) {
    throw ApiError.notfound("Sponsors not found");
  }
  return allSponsors;
};

const getSponsorById = async (id) => {
  const sponsor = await Sponsor.findById(id);
  if (!sponsor) {
    throw ApiError.notfound("Sponsor not found");
  }
  return sponsor;
};

const updateSponsor = async (id, { name }) => {
  const updatedSponsor = await Sponsor.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );

  if (!updatedSponsor) {
    throw ApiError.notfound("Sponsor not found");
  }
  return updatedSponsor;
};

const deleteSponsor = async (id) => {
  const sponsor = await Sponsor.findByIdAndDelete(id);
  if (!sponsor) {
    throw ApiError.notfound("Sponsor not found");
  }
  return sponsor;
};

export {
  createSponsor,
  getAllSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
};
