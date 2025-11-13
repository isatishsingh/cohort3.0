async function signup(e) {
  e.preventDefault();
  const userName = document.getElementById("signupName").value;
  const password = document.getElementById("signupPassword").value;
  document.getElementById("signupName").value = "";
  document.getElementById("signupPassword").value = "";

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
    } else if (data?.error) {
      alert(data.error);
    } else {
      alert("Unexpected error occurred");
    }
  }
}

async function signin(e) {
  e.preventDefault();
  const userName = document.getElementById("loginName").value;
  const password = document.getElementById("loginPassword").value;
  document.getElementById("loginName").value = "";
  document.getElementById("loginPassword").value = "";
  try {
    const response = await axios.post("http://localhost:3000/signin", {
      userName,
      password,
    });
    localStorage.setItem("token", response.data.message);
    alert(response.data.message);
  } catch (error) {
    const data = error.response?.data;

    if (data?.invalidInput) {
      alert(data.invalidInput);
    } else if (data?.error) {
      alert(data.error);
    } else {
      alert("Unexpected error occurred");
    }
  }
}

async function fetchDetail(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const response = await axios.get("http://localhost:3000/me", {
      headers: {
        token: token,
      },
    });

    document.getElementById("fetchUserName").innerText = response.data.userName;
    document.getElementById("fetchPassword").innerText = response.data.password;
  } catch (error) {
    const data = error.response?.data;
    if (!data?.error && data?.message) {
      alert(data.message);
    } else {
      alert(data.message + " " + data.error);
    }
  }
}

async function logout(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const response = await axios.get("http://localhost:3000/logout", {
      headers: {
        token: token,
      },
    });
    localStorage.removeItem("token");
    alert(response.data.message);
    document.getElementById("fetchUserName").innerText = "";
    document.getElementById("fetchPassword").innerText = "";
  } catch (error) {
    const data = error.response?.data;
    if (!data?.error && data?.message) {
      alert(data.message);
    } else {
      alert(data.message + " " + data.error);
    }
  }
}
