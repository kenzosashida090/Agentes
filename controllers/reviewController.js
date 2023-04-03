const express = require("express");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const fs = require("fs");
const xlsx = require("xlsx");
const { log } = require("console");
const util = require("util");
const timeElapsed = Date.now();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/uploads`);
  },
  filename: (req, file, cb) => {
    const today = new Date(timeElapsed);
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
const multerFilter = async (req, file, cb) => {
  if (
    file.mimetype.startsWith(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
  ) {
    cb(null, true);
  } else {
    cb("error", false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadFile = upload.single("file");

exports.postReview = async (req, res, next) => {
  try {
    if (req.file) {
      res.status(202).json({
        status: "Success",
        path: `${__dirname}/uploads/${Date.now()}__${req.file.originalname}`,
      });
      console.log(req.file);
      // const sheet = util.promisify(
      //   xlsx.parse(
      //     fs.readFileSync(
      //       `${__dirname}/uploads/${Date.now()}__${req.file.originalname}`
      //     )
      //   )
      // );
    }

    //let data = fs.createReadStream(req.file.buffer, "utf-8");
    //console.log(data);
  } catch (err) {
    console.log(err);
  }
  next();
};
exports.functionTest = async (req, res, next) => {
  console.log(req.file.path);
  const data = xlsx.readFile(`${req.file.path}`);
  console.log(data);
};
exports.getReviews = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "HOLA",
    });
    console.log("FUNXIONA");
  } catch (err) {
    console.log(err);
  }
};
