import * as broadcasterServices from "../services/broadcaster.service.js";
import ApiResponse from "../../../common/utils/api-response.js";

const createBroadcaster = async (req, res) => {
  const newBroadcaster = await broadcasterServices.createBroadcaster(req.body);
  return ApiResponse.created(
    res,
    "Broadcaster created successfully",
    newBroadcaster
  );
};

const getAllBroadcasters = async (req, res) => {
  const allBroadcasters = await broadcasterServices.getAllBroadcasters();
  return ApiResponse.ok(
    res,
    "All broadcasters fetched successfully",
    allBroadcasters
  );
};

const getBroadcasterById = async (req, res) => {
  const broadcaster = await broadcasterServices.getBroadcasterById(
    req.params.id
  );
  return ApiResponse.ok(res, "Broadcaster fetched successfully", broadcaster);
};

const updateBroadcaster = async (req, res) => {
  const updatedBroadcaster = await broadcasterServices.updateBroadcaster(
    req.params.id,
    req.body
  );
  return ApiResponse.ok(
    res,
    "Broadcaster updated successfully",
    updatedBroadcaster
  );
};

const deleteBroadcaster = async (req, res) => {
  await broadcasterServices.deleteBroadcaster(req.params.id);
  return ApiResponse.ok(res, "Broadcaster deleted successfully");
};

export {
  createBroadcaster,
  getAllBroadcasters,
  getBroadcasterById,
  updateBroadcaster,
  deleteBroadcaster,
};
