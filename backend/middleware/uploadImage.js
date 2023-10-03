import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// router.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

const uploadFile = upload.single("image");

export { uploadFile };

// import multer from "multer";
// import mime from "mime-types";
// import fs from "fs";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// async function uploadToS3(path, originalFilename, mimetype) {
//   const client = new S3Client({
//     region: "us-east-1",
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY,
//       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     },
//   });
//   const parts = originalFilename.split(".");
//   const ext = parts[parts.length - 1];
//   const newFilename = Date.now() + "." + ext;
//   await client.send(
//     new PutObjectCommand({
//       Bucket: bucket,
//       Body: fs.readFileSync(path),
//       Key: newFilename,
//       ContentType: mimetype,
//       ACL: "public-read",
//     })
//   );
//   return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
// }

// const photosMiddleware = multer({ dest: "/tmp" });
// app.post(
//   "/api/upload",
//   photosMiddleware.array("photos", 100),
//   async (req, res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//       const { path, originalname, mimetype } = req.files[i];
//       const url = await uploadToS3(path, originalname, mimetype);
//       uploadedFiles.push(url);
//     }
//     res.json(uploadedFiles);
//   }
// );

// export default photosMiddleware;
