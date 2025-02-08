import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    if (!file || !file.originalname) {
      return cb(new Error("File is missing or has no name"));
    }
    console.log("file", file);
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });
export default upload;
