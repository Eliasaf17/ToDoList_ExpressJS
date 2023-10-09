import express from "express";
import bodyParser from "body-parser";
import moment from 'moment';


moment().format();

const app = express();
const port = 3000;
const date = moment().format("dddd, MMMM D");
var tasks = [];
const year = moment().format("yyyy");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
  res.render("index.ejs",
  {day:date, tasks, year});
});

app.get("/work", (req, res)=>{
  tasks = [];
  res.render("index.ejs",
  {day:"Work List", tasks, year});
});

app.post("/submit", (req, res)=>{
  const newTask = req.body['task'];

  tasks.push(newTask);

  res.redirect("/");
});

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})