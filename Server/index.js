const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error while connecting the database", err);
  });

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { status: true }).then(result => res.json(result)).catch(err => res.json(err))
})
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id }).then(result => res.json(result)).catch(err => res.json(err))
})

app.post("/add", (req, res) => {
  const task = req.body.task;
  console.log("Received data: ", task);
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  console.log("Server is Running!");
});
