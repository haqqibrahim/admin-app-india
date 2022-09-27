const ImageUpload = require("../models/Upload");
const fs = require("fs");

module.exports.admin_upload_get = async (req, res) => {
  ImageUpload.find({}, (err, data) => {
    res.render("admin_page", {data})
  })
    .sort({ _id: -1 })
    .limit(4);
};

module.exports.admin_upload_post = async (req, res) => {
  const img = fs.readFileSync(req.file.path);
  const encode_img = img.toString("base64");
  const finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer.from(encode_img, "base64"),
  };
  const newUpload = new ImageUpload({
    summary: req.body.summary,
    image: {
      data: finalImg.image,
      contentType: finalImg.contentType,
    },
  });
  await newUpload.save().then(() => {
    console.log("Successfully uploaded");
    res.redirect("/admin");
  });
};
