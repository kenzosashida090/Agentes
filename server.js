const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
process.on("uncaughtException", (err) => {
  console.log("Error! Cerrando aplicacion....");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");
const Comentario = require("./Model/publicacionesModel");
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

const db = mongoose
  .connect(DB, {
    dbName: "Diccionario",
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection successful");
  });
const dictionarySchema = new mongoose.Schema({
  palabra: {
    type: String,
    required: [true, "Must have a review"],
  },
});
// const importData = new Comentario({
//   autor: "Kenzo",
//   comentario: "hOLA",
//   estrellas: 5,
// });
// importData
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// app.use(async (req, res, next) => {
//   const hola = await Comentario.createIndexes(
//     { comentario: "text" },
//     {
//       weights: {
//         content: 10,
//         keywords: 5,
//       },
//     }
//   );
//   console.log(hola);
//   console.log("hola");
//   next();
// });
// console.log(
//   db.comentario.createIndex(
//     { comentario: "text" },
//     {
//       weights: {
//         content: 10,
//         keywords: 5,
//       },
//     }
//   )
// );

const readGood = fs.readFileSync(`./data/palabras-positivas.txt`, "latin1");
const readBad = fs.readFileSync("./data/palabras-negativas.txt", "latin1");
const final = String(readGood.replace(/(\r\n|\n|\r)/gm, ",")).split(",");
const finalBad = String(readBad.replace(/(\r\n|\n|\r)/gm, ",")).split(",");

// //console.log(typeof(final))
// //console.log([...final][51]);

// final.forEach((el) => {
//   const importData = new Good({
//     palabra: el,
//   });
//   importData
//     .save()
//     .then((doc) => {
//       console.log(doc);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// finalBad.forEach((el) => {
//   const importData = new Bad({
//     palabra: el,
//   });
//   importData
//     .save()
//     .then((doc) => {
//       console.log(doc);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
//module.exports = Good;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//module.exports = Review;
