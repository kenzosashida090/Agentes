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
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose
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

// const dictionarySchema = new mongoose.Schema({
//   buenasPalabras: {
//     type: [String],
//     required: [true, "Must have a review"],
//   },
//   malasPalabras: {
//     type: [String],
//     required: [true, "Must have a bad review"],
//   },
// });

// const readGood = fs.readFileSync(`./data/palabras-positivas.txt`, "latin1");
// const readBad = fs.readFileSync("./data/palabras-negativas.txt", "latin1");
// const final = String(readGood.replace(/(\r\n|\n|\r)/gm, ",")).split(",");
// const finalBad = String(readBad.replace(/(\r\n|\n|\r)/gm, ",")).split(",");

// //console.log(typeof(final))
// //console.log([...final][51]);

// const Review = mongoose.model("Review", dictionarySchema);
// const importData = new Review({
//   buenasPalabras: [...final],
//   malasPalabras: [...finalBad],
// });
// importData
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// module.exports = Review;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
