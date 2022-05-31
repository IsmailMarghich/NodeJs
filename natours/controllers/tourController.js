import fs from "fs";

const tours = JSON.parse(
  fs.readFileSync(`././dev-data/data/tours-simple.json`)
);
/*helper function to check whether provided ID is valid or not*/
export const checkID = (req, res, next) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  next();
};
export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.duration) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
export const getTour = (req, res) => {
  const id = req.params.id * 1; /*turn string into number*/
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};
export const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    "dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};
export const updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated Tour>",
    },
  });
};
export const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
