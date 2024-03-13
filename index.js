const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const database = require("./db");

const upload = multer({ dest: "public"});
const app = express();
const port = 6001;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Get students
app.get("/students", async (req, res) => {
  try {
    const result = await database.query("SELECT * FROM students");
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await database.query("SELECT * FROM students WHERE id=$1", [id]);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Post
app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await database.query("INSERT INTO students (name, address) VALUES ($1, $2)", [name, address]);
    res.status(200).json({
      status: "success",
      message: "Data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update student
app.patch("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const result = await database.query("UPDATE students SET name=$1, address=$2 WHERE id=$3", [name, address, id]);
    res.status(200).json({
      status: "success",
      message: "Data berhasil diupdate",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete student
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await database.query("DELETE FROM students WHERE id=$1", [id]);
    res.status(200).json({
      status: "success",
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
