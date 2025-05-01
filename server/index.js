require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//fetch all notes
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching note." });
  }
});

app.get("/", (req, res) => {
  res.json("hello");
});

//fetch note by ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;

    const data = await Notes.findById(noteID);
    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching note." });
  }
});

//Create a note
app.post("/api/notes/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("An error occured while creating a note.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating a note." });
  }
});

//Update a note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const { title, description } = req.body;

    const data = await Notes.findByIdAndUpdate(noteID, { title, description });
    if (!data) {
      throw new Error("An error occured while updating a note.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while updating a note." });
  }
});

//Delete a note by ID
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;

    const data = await Notes.findByIdAndDelete(noteID);
    if (!data) {
      throw new Error("An error occured while deleting a note.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting a note." });
  }
});

app.get("/", (req, res) => {
  res.json("hello");
});

//express version 4:
// app.get("*", (req, res) => {
//express version 5:
// app.get("/{*any}", (req, res) => {
app.get(/(.*)/, (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
