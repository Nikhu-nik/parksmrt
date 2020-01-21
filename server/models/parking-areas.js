const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model("parking-areas", parkingSchema, "parking-areas");
