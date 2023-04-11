const express = require("express");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const fs = require("fs");
const xlsx = require("xlsx");
const { log } = require("console");
const util = require("util");

const timeElapsed = Date.now();
const mongoose = require("mongoose");

const Bad = require("../Model/dictionaryModel");
const Good = require("../Model/dictionaryGood");
const Comentario = require("../Model/publicacionesModel");

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

// mongoose
//   .connect(DB, {
//     dbName: "Diccionario",
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("db connection successful");
//   });

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
  try {
    //console.log(req.file.path);
    const data = xlsx.readFile(`${req.file.path}`);
    const dataSheets = data.SheetNames;
    const sheet = dataSheets[0];
    let dataExcel = xlsx.utils.sheet_to_json(data.Sheets[sheet]);
    // const kaka = await Comentario.aggregate([
    //   { $match: { $text: { $search: "hOLA" } } },
    //   { $group: { _id: { $meta: "textScore" }, count: { $sum: 1 } } },
    // ]);
    //console.log(kaka);
    // const newData = await Good.find({}).select("palabra -_id").exec();
    // console.log(newData);
    // const newkaka = await Comentario.find(
    //   { $text: { $search: "hola caca" } },
    //   { score: { $meta: "textScore" }, count: { $sum: 1 } }
    // );
    // console.log(...newkaka);
    //console.log(newData.palabra);
    //const oldData = await Review.findOne({ buenasPalabras: "bueno" });

    //console.log(newData);
    //console.log(newData[0].buenasPalabras[0]);
    //console.log(dataExcel[0]["Fecha de publicacion"]);
    //console.log(dataExcel[0]);
    let newMap = dataExcel.map((el) => ({
      Autor: el["Autor de la publicacion"],
      Comentario: el.Comentario.split(" "),
    }));
    // const newkaka = await Comentario.find(
    //   { $text: { $search: "hola caca" } },
    //   { score: { $meta: "textScore" }, count: { $sum: 1 } }
    // );
    let compare = newMap.map((el) => {
      //{ $match: { score: { $gta: 1.0 } }, count: { $sum: 1 } }
      el.Comentario.forEach(async (element) => {
        // const newData = await Good.aggregate([
        //   { $match: { $text: { $search: element } } },
        //   { $project: { title: 1, _id: 0, score: { $meta: "textScore" } } },
        //   { $match: { score: { $gt: 1.0 } } },
        // ]);
        // if (newData !== [{}]) {
        //   console.log(newData);
        // }
        // if (newData) {
        //   console.log(el.Autor, newData);
        // }
        const goodData = await Good.findOne({ palabra: element }).select(
          "palabra -_id"
        );

        if (goodData) {
          //console.log(el.Autor, badData);
          const goodStuff = {
            autor: el.Autor,
            buenaPalabra: goodData.palabra,
          };
          console.log(goodStuff);
        }
        const badData = await Bad.findOne({ palabra: element }).select(
          "palabra -_id"
        );

        if (badData) {
          //console.log(el.Autor, badData);
          const badStuff = {
            autor: el.Autor,
            malaPalabra: badData.palabra,
          };
          console.log(badStuff);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
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
