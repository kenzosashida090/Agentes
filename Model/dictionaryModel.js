const mongoose = require("mongoose");
const fs = require("fs");

const dictionarySchema = new mongoose.Schema({
  buenasPalabras: {
    type: String,
    required: [true, "Must have a review"],
  },
});

const readGood = fs.readFileSync(`../data/palabras-positivas.txt`, "latin1");

const final = String(readGood.replace(/(\r\n|\n|\r)/gm, ",")).split(",");

const Review = mongoose.model("Review", dictionarySchema);
const importData = new Review({
  buenasPalabras: "Hola",
});
importData
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Review;
