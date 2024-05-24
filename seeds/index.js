const mongoose = require("mongoose");
const people = require("./people");

const Person = require("../models/person");

mongoose.connect("mongodb://localhost:27017/people", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Person.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const randomPerson = new Person({
      name: `${people[random1000].name}`,
      age: `${people[random1000].age}`,
      gender: `${people[random1000].gender}`,
      mobileNumber: `${people[random1000].mobileNumber}`,
    });
    await randomPerson.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});