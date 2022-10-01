const express = require("express");
const multer = require("multer");
const data = require("./store");

const app = express();
const port = 3000;
const upload = multer();

app.use(express.json({ extended: false }));
app.use(express.static("./view"));
app.set("view engine", "ejs");
app.set("views", "./view");

console.log(data);

app.get("/", (req, res) => {
    return res.render("index", { data: data });
});

app.post("/", upload.fields([]), (req, res) => {
    data.push(req.body);
    // console.log(data);
    return res.redirect("/");
});

app.post("/delete", upload.fields([]), (req, res) => {
    const { maMonHoc } = req.body;

    data.map((item, index) => {
        if (item.maMonHoc === maMonHoc) {
            data.splice(index, 1);
        }
    });

    // const temp = data.filter(
    //     (item, index) => !listItem.includes(item.maMonHoc)
    // );

    return res.redirect("/");
});

app.listen(port, () => {
    console.log("listening on port : ", port);
});
