// const fs = require("fs");
// const Diccionario = require("./Model/dictionaryModel");
// const readGood = fs.readFileSync(
//   `${__dirname}/data/palabras-positivas.txt`,
//   "latin1"
// );

// const final = String(readGood.replace(/(\r\n|\n|\r)/gm, ",")).split(",");
// //console.log(typeof(final))
// console.log([...final][51]);

// const importData = new Diccionario({
//   buenasPalabras: [...final],
// });
// importData
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
