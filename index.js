import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let element=[];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



function listmaker(req, res, next) {
    const newElement = req.body["list"];
    element.push(newElement); 
    next();
  }
  

app.use(listmaker);

app.set("view engine", "ejs"); 

app.get("/", (req, res) => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    res.render("index.ejs", { liste: element, date: formattedDate });
});




app.post("/", (req, res) => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    res.render("index.ejs", { liste: element, date: formattedDate });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
