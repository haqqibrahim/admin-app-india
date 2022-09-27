const mongoose = require("mongoose");

const imageUploadSchema = new mongoose.Schema({
  summary: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const ImageUpload = new mongoose.model("Image Upload", imageUploadSchema);
module.exports = ImageUpload;
