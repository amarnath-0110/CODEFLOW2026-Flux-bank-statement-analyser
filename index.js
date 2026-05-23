import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import PDFParser from "pdf2json";
import { defineFilePond } from 'filepond';
const upload = multer({ dest: 'uploads/' })
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.post("/upload", upload.single("files"), (req, res) => {

    console.log(req.file);

    res.send("Uploaded");
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});