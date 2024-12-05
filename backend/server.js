const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "password";

const users = [{ username: "admin", password: "password" }];
const tasks = [];

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Get all tasks
app.get("/tasks", (req, res) => {
  const token = req.headers["authorization"];
  try {
    jwt.verify(token, SECRET_KEY);
    res.json(tasks);
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
});

// Add a new task
app.post("/tasks", (req, res) => {
  const token = req.headers["authorization"];
  try {
    jwt.verify(token, SECRET_KEY);
    const { task } = req.body;
    tasks.push(task);
    res.status(201).send("Task added");
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
});

// Delete a task
app.delete("/tasks/:index", (req, res) => {
  const token = req.headers["authorization"];
  try {
    jwt.verify(token, SECRET_KEY);
    const { index } = req.params;
    if (index < 0 || index >= tasks.length) {
      return res.status(400).send("Invalid task index");
    }
    tasks.splice(index, 1);
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
});

// Update a task
app.put("/tasks/:index", (req, res) => {
  const token = req.headers["authorization"];
  try {
    jwt.verify(token, SECRET_KEY);
    const { index } = req.params;
    const { task } = req.body;

    if (!task || typeof task !== "string") {
      return res.status(400).send("Invalid task data");
    }

    if (index < 0 || index >= tasks.length) {
      return res.status(400).send("Invalid task index");
    }

    tasks[index] = task; // Update the task at the given index
    res.status(200).send("Task updated");
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));