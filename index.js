import express from "express";
import bodyParser from "body-parser";
import moment from 'moment';
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Eliasaf17",
  port: 5432,
});

db.connect();

moment().format();

const app = express();
const port = 3000;
const date = moment().format("dddd, MMMM D");
const year = moment().format("yyyy");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Show daily activities
app.get("/", async(req, res)=>{
  try {
    if(req.originalUrl == '/') {
      // Si la URL es '/', ejecuta la consulta
      const result = await db.query('SELECT * FROM items');
      const tasks = result.rows;
      res.render("index.ejs",
      {day:date, tasks:tasks, year});
    }
  } catch (error) {
    res.status(500).send('Error with database');
  }
});

// Show work tasks
app.get("/work", async(req, res)=>{
  try {
    if (req.originalUrl == '/work') {
      // Si la URL actual es '/work', ejecuta la consulta específica
      const result = await db.query('SELECT * FROM works');
      res.render("index.ejs",
      {day:"Work List", tasks:result.rows, year});
    }
  } catch (error) {
    res.status(500).send('Error with database');
  }
});

// Add new task
app.post("/submit", async(req, res)=>{
  try {
    if (req.body.actualRoute == `http://localhost:${port}/work`) {
      // Si el endpoint actual es '/work', ejecuta el INSERT
      await db.query("INSERT INTO works(title) VALUES($1)", [req.body.task]);
      res.redirect("/work");
    } else if(req.body.actualRoute == `http://localhost:${port}/`) {
      // Si el endpoint es '/'
      await db.query("INSERT INTO items(title) VALUES($1)", [req.body.task]);
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send('Error with database');
  }
});

// Update task
app.post("/edit", async(req, res)=>{
  try {
    if (req.body.actualRoute == `http://localhost:${port}/work`) {
      // Si el endpoint actual es '/work', ejecuta el UPDATE
      await db.query("UPDATE works SET title = $1 WHERE id = $2", [req.body.updatedItemTitle, req.body.updatedItemId]);
      res.redirect("/work");
    } else if(req.body.actualRoute == `http://localhost:${port}/`) {
      // Si el endpoint es '/'
      await db.query("UPDATE items SET title = $1 WHERE id = $2", [req.body.updatedItemTitle, req.body.updatedItemId]);
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send('Error with the database');
  }
});

// Delete task with checkbox
app.post("/delete", async(req, res)=>{
  try {
    if (req.body.actualRoute == `http://localhost:${port}/work`) {
      await db.query("DELETE FROM works WHERE id = $1", [req.body.deleteItemId]);
      res.redirect("/work");
    } else if(req.body.actualRoute == `http://localhost:${port}/`) {
      await db.query("DELETE FROM items WHERE id = $1", [req.body.deleteItemId]);
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send('Error with the database');
  }
});

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})