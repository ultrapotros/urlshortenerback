
const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://santi:otraContra@cluster0.ez5kx.mongodb.net/UrlShortener";

const myClient = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error));
};

module.exports = myClient