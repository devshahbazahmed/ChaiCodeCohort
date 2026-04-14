import Broadcaster from "../models/broadcaster.model.js";
import ApiError from "../../../common/utils/api-error.js";

const createBroadcaster = async ({ name }) => {
  const newBroadcaster = await Broadcaster.create({
    name,
  });
  return newBroadcaster;
};

const getAllBroadcasters = async () => {
  const allBroadcasters = await Broadcaster.find();
  if (!allBroadcasters) {
    throw ApiError.notfound("Broadcasters not found");
  }
  return allBroadcasters;
};

const getBroadcasterById = async (id) => {
  const broadcaster = await Broadcaster.findById(id);
  if (!broadcaster) {
    throw ApiError.notfound("Broadcaster not found");
  }
  return broadcaster;
};

const updateBroadcaster = async (id, { name }) => {
  const broadcaster = await Broadcaster.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );
  if (!broadcaster) {
    throw ApiError.notfound("Broadcaster not found");
  }
  return broadcaster;
};

const deleteBroadcaster = async (id) => {
  const broadcaster = await Broadcaster.findByIdAndDelete(id);
  if (!broadcaster) {
    throw ApiError.notfound("Broadcaster not found");
  }
  return broadcaster;
};

export {
  createBroadcaster,
  getAllBroadcasters,
  getBroadcasterById,
  updateBroadcaster,
  deleteBroadcaster,
};
