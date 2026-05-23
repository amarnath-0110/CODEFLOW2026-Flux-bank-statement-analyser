import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});