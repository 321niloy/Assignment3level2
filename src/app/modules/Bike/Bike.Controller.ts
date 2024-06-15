import { Request, Response } from 'express';
import catchAsync from '../../middleware/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { bikeService } from './Bike.service';
import { Tbike } from './Bike.Interface';

const createBike = catchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.createBikeIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bike added successfully',
    data: result,
  });
});

const getBike = catchAsync(async (req: Request, res: Response) => {
  const result = await bikeService.getBikeIntoDb(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bikeService.updatedBikeIntoDb(id , req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bikeService.delatedBikeIntoDb(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const bikeController = {
  createBike,
  getBike,
  updateBike,
  deleteBike,
};
