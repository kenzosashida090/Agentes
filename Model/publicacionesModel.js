const mongoose = require("mongoose");
const fs = require("fs");

const comentarioSchema = new mongoose.Schema({
  autor: {
    type: String,
    required: [true, "Must have Autor"],
  },
  comentario: {
    type: String,
    required: [true, "Must have a review"],
  },
  estrellas: {
    type: Number,
  },
});
//const readGood = fs.readFileSync(`../data/palabras-positivas.txt`, "latin1");

//const final = String(readGood.replace(/(\r\n|\n|\r)/gm, ",")).split(",");
comentarioSchema.index({ comentario: "text" });
const Comentario = mongoose.model("Comentario", comentarioSchema);

module.exports = Comentario;
