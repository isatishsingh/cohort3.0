document.addEventListener("DOMContentLoaded", function () {
  checkToken();
});

// dom buttons
function logout(e) {
  e.preventDefault();

  document.getElementById("todo-form-section").innerHTML = "";
  document.getElementById("todos").innerHTML = "";
  localStorage.removeItem("token");
  alert("user logging out successfully");
  checkToken();
}

function showTodoForm(e) {
  e.preventDefault();
  document.getElementById("todos").innerHTML = "";
  const formElement = `<div>Todo Form</div>
      <form method="POST" onsubmit="submitTodo(event)">
        <label>Enter todo info</label>
        <input type="text" id="todo-value" />
        <label>Todo status</label>
        <input type="text" id="todo-status" />
        <button type="submit">Submit</button>
      </form>`;
  document.getElementById("todo-form-section").innerHTML = formElement;
}

function showSignInForm(e) {
  e.preventDefault();
  document.getElementById("signup-section").innerHTML = "";

  document.getElementById("signin-section").innerHTML = `
    <div>This is Signin form </div>
    <form method="POST" onsubmit="signIn(event)">
        <label>Enter your userName</label>
        <input type="text" id="signin-userName" />
        <label>Enter your password</label>
        <input type="text" id="signin-password" />
        <button type="submit">SignIn</button>
      </form>`;
}

function showSignUpForm(e) {
  e.preventDefault();
  document.getElementById("signin-section").innerHTML = "";

  document.getElementById("signup-section").innerHTML = `
    <div>This is Signup form </div>
    <form method="POST" onsubmit="signUp(event)">
        <label>Enter your userName</label>
        <input type="text" id="signup-userName" />
        <label>Enter your password</label>
        <input type="text" id="signup-password" />
        <button type="submit">SignUp</button>
      </form>`;
}

function checkToken() {
  const token = localStorage.getItem("token");
  if (token) {
    document.getElementById("show-user-auth").innerHTML = "";
    document.getElementById("show-client-view").innerHTML = `
    <button onclick="showTodoForm(event)">Show Todo Form</button>
    <button onclick="showTodos(event)">Show Todo</button>
    <button onclick="logout(event)">logout</button>`;
  } else {
    document.getElementById("show-user-auth").innerHTML = `
      <button onclick="showSignInForm(event)">Signin</button>
      <button onclick="showSignUpForm(event)">SignUp</button>`;
    document.getElementById("show-client-view").innerHTML = "";
  }
}

async function signIn(e) {
  e.preventDefault();

  const userName = document.getElementById("signin-userName").value;
  const password = document.getElementById("signin-password").value;
  document.getElementById("signin-userName").value = "";
  document.getElementById("signin-password").value = "";
  try {
    const response = await axios.post("http://localhost:3000/signin", {
      userName,
      password,
    });

    alert(response.data.message);
    localStorage.setItem("token", response.data.message);
    document.getElementById("signin-section").innerHTML = "";
    checkToken();
  } catch (error) {
    const data = error.response?.data;

    if (data?.InvalidInput) {
      alert(data.InvalidInput);
    } else if (!data?.error && data?.message) {
      alert(data.message);
    } else {
      alert("undefined error");
    }
  }
}

async function signUp(e) {
  e.preventDefault();
  const userName = document.getElementById("signup-userName").value;
  const password = document.getElementById("signup-password").value;
  document.getElementById("signup-userName").value = "";
  document.getElementById("signup-password").value = "";
  if (!userName || !password) {
    alert("Please fill the userName and password properly");
    return;
  }
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      userName,
      password,
    });

    alert(response.data.message);
  } catch (error) {
    const data = error.response?.data;
    if (data?.invalidInput) {
      alert(data.invalidInput);
    } else if (data?.message) {
      alert(data.message);
    } else {
      alert("undefined error occurred");
    }
  }
}

async function submitTodo(e) {
  e.preventDefault();

  const todoValue = document.getElementById("todo-value").value;
  const todoStatus = document.getElementById("todo-status").value;
  document.getElementById("todo-value").value = "";
  document.getElementById("todo-status").value = "";
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/insert-todo",
      {
        todoValue,
        todoStatus,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    alert(response.data.message);
  } catch (error) {
    const data = error.response?.data;

    if (data?.invalidInput) {
      alert(data.invalidInput);
    } else if (data?.message) {
      alert(data.message);
    } else {
      alert("undefined error occurred");
    }
  }
}

async function showTodos(e) {
  e.preventDefault();
  document.getElementById("todo-form-section").innerHTML = "";

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/get-todo", {
      headers: {
        token: token,
      },
    });
    const todos = response.data.todos;
    if (todos.todos && todos.todos.length) {
      let mainTitle = `<div>current todo status</div>`;
      document.getElementById("todos").innerHTML = mainTitle;
      let olElm = document.createElement("ol");
      let h1Elm = document.createElement("h1");
      h1Elm.innerText = todos.userName;
      document.getElementById("todos").appendChild(h1Elm);
      todos.todos.map((todo) => {
        let divElm = document.createElement("div");
        let h3Elm = document.createElement("h3");
        let pElm = document.createElement("p");
        h3Elm.innerText = `Todo Title: ` + todo.todoValue;
        pElm.innerText = `Todo Status: ` + todo.todoStatus;
        divElm.appendChild(h3Elm);
        divElm.appendChild(pElm);
        olElm.appendChild(divElm);
      });
      alert("All todo fetched successfully");
      document.getElementById("todos").appendChild(olElm);
    } else {
      let mainTitle = `<div>Oop! No Todo Found</div>`;
      document.getElementById("todos").innerHTML = mainTitle;
    }
  } catch (error) {
    const data = error.response?.data;

    if (data?.message) {
      alert(data.message);
    } else {
      alert("undefined error occurred");
    }
  }
}
