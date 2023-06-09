const mongoose = require("mongoose");
const fs = require("fs");

const dictionarySchema = new mongoose.Schema({
  palabra: {
    type: String,
    required: [true, "Must have a review"],
  },
});
//const readGood = fs.readFileSync(`../data/palabras-positivas.txt`, "latin1");

//const final = String(readGood.replace(/(\r\n|\n|\r)/gm, ",")).split(",");
dictionarySchema.index({ palabra: "text" });
const Bad = mongoose.model("Bad", dictionarySchema);

module.exports = Bad;
