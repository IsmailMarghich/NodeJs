import { Tour } from "../models/tourModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
/*we can use middleware to prefill query string in case its necessary for the end user*/
export const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

export const getAllTours = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});
export const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError("No tour find with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
});

export const createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});
export const updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError("No tour find with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
});
export const deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndRemove(req.params.id);
  if (!tour) {
    return next(new AppError("No tour find with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
});
/*aggregation to get tour statistics*/
export const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        num: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    {
      $match: { _id: { $ne: "EASY" } },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      tour: stats,
    },
  });
});
/*aggregation to show what tours are starting per month in the year provided by user*/
export const getMonthlyPLan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    { $addFields: { month: "$_id" } },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { month: 1 },
    },
    {
      $limit: 6,
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      tour: plan,
    },
  });
});
