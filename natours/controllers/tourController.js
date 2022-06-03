import { Tour } from "../models/tourModel.js";
import { query } from "express";

export const getAllTours = async (req, res) => {
  try {
    /*filtering*/

    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    /*remove fields we dont want to use for filtering*/
    excludedFields.forEach((el) => delete queryObj[el]);

    /*advanced filtering*/
    let queryString = JSON.stringify(queryObj);
    /*replacing operators with mongoose operators*/
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    let query = Tour.find(JSON.parse(queryString));

    /*sorting*/
    if (req.query.sort) {
      const sortby = req.query.sort
        .split(",")
        .join(
          " "
        ); /*remove commas from query string, so we can have multiple sort parameters*/
      query = query.sort(sortby);
    } else {
      /*default sorting based on creation date*/
      query = query.sort("-createdAt");
    }

    /*field limiting*/
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      /*remove __v which is from mongodb and not relevant to user*/
      query = query.select("-__v");
    }

    /*pagination*/
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    /*if user requests a page that doesnt exist, throw error*/
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error("This page does not exist");
      }
    }

    /*execute query*/
    const tours = await query;

    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: "Invalid data has been sent",
      },
    });
  }
};
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: "Invalid data has been sent",
      },
    });
  }
};
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        data: null,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        message: "Invalid data has been sent",
      },
    });
  }
};
