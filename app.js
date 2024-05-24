const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path")
const Person = require("./models/person");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


mongoose.connect("mongodb://localhost:27017/people", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/person", async (req, res) => {
  const persons = await Person.find({});
  res.render("persons/index", { persons });
});

app.get("/person/new", (req, res) => {
  res.render("persons/new");
});

app.get("/person/:id/edit", async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render("persons/edit", { person });
});

app.post("/person", async (req, res) => {
  const p = new Person(req.body.person);
  await p.save();
  res.redirect(`/person`);
});

app.put("/person/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Person.findByIdAndUpdate(id, {
    ...req.body.person,
  });
  res.redirect(`/person`);
});

app.delete("/person/:id", async (req, res) => {
  const { id } = req.params;
  await Person.findByIdAndDelete(id);
  res.redirect("/person");
});

 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
