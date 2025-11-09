// creating todo using express or middleware
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const todo = './todo.json';


app.use(express.json());

function loadTodo() {
  return JSON.parse(fs.readFileSync(todo, "utf-8"));
}

function writeTodo(newTodo) {
  fs.writeFileSync(todo, JSON.stringify(newTodo, null, 2));
}

app.get("/", (req, res) => {
  fs.readFile(todo, "utf-8", (err, data) => {
    if (err) {
      res.send("There is some error during fetching todo");
    } else {
      res.send(data.length == 0 ? "No todo found" : data);
    }
  });
});

app.post("/add-todo", (req, res) => {
  if (!req.body || !req.body.title || req.body.status == null) {
    return res.status(400).send("Please provide both title and status.");
  }

  let freshTodo = loadTodo();
  const newTodo = {
    id: freshTodo.length > 0 ? freshTodo[freshTodo.length - 1].id + 1 : 1,
    title: req.body.title,
    status: req.body.status,
  };
  freshTodo.push(newTodo);
  writeTodo(freshTodo);

  res.send("New todo added successfully");
});

app.delete("/delete-todo/:id", (req, res) => {
  let freshTodo = loadTodo();
  let pos = freshTodo.findIndex((item) => item.id == req.params.id);
  if (pos == -1) {
    res.send("Todo not found");
  } else {
    freshTodo.splice(pos, 1);
    writeTodo(freshTodo);
    res.send("Todo deleted successfully");
  }
});

app.put("/update-todo/:id", (req, res) => {
  let freshTodo = loadTodo();
  let pos = freshTodo.findIndex((item) => item.id == req.params.id);
  if (pos == -1) {
    res.send("Sorry, No todo found to update");
  } else {
    freshTodo[pos] = {...freshTodo[pos], ...req.body};
    writeTodo(freshTodo);
    res.send(`Todo with id ${req.params.id} is updated successfully`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
