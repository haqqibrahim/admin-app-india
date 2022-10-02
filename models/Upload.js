const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  summary: String,
  email: String,
  file: {
    data: Buffer,
    contentType: String,
  },
});

const FileUpload = new mongoose.model("Image Upload", fileUploadSchema);
module.exports = FileUpload;
