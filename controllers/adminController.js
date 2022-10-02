const FileUpload = require("../models/Upload");
const imgGen = require("js-image-generator");
const fs = require("fs");

module.exports.admin_upload_get = async (req, res) => {
  imgGen.generateImage(800, 600, 80, (err, image) => {
    FileUpload.find({}, (err, data) => {
      res.render("admin_page", { data, image:image.data });
    })
      .sort({ _id: -1 })
      .limit(4);
  });
};

module.exports.admin_upload_post = async (req, res) => {
  const img = fs.readFileSync(req.file.path);
  const encode_img = img.toString("base64");
  const finalFile = {
    contentType: req.file.mimetype,
    image: new Buffer.from(encode_img, "base64"),
  };
  const newUpload = new FileUpload({
    summary: req.body.summary,
    email: req.body.email,
    file: {
      data: finalFile.image,
      contentType: finalFile.contentType,
    },
  });
  await newUpload.save().then(() => {
    console.log("File Upload Success");
    res.redirect("/admin");
  });
};
