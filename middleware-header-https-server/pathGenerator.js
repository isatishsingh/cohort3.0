function register(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("password").value = "";
  axios.post("http://localhost:3000/register", {
    name,
    email,
    phoneNumber,
    password
  })
  .then(res => alert(res.data.message))
  .catch(err => console.log(err));
}

function getDetail(e) {
  e.preventDefault();

  const email = document.getElementById("getEmail").value;
  document.getElementById("getEmail").value = "";

  axios.get("http://localhost:3000/getDetail", {
    params: { email }
  })
  .then(res =>{
    console.log(JSON.stringify(res.data));
    alert(res.data.message);
  })
  .catch(err => console.log(err));
}

function updateDetail(e) {
  e.preventDefault();

  const name = document.getElementById("uName").value;
  const email = document.getElementById("uEmail").value;
  document.getElementById("uName").value = "";
  document.getElementById("uEmail").value = "";

  axios.put("http://localhost:3000/updateDetail", { name, email })
  .then(res => alert(res.data.message))
  .catch(err => console.log(err));
}

function deleteData(e) {
  e.preventDefault();

  const email = document.getElementById("dEmail").value;
  document.getElementById("dEmail").value = "";

  axios.delete("http://localhost:3000/deleteUser", {
    data: { email }
  })
  .then(res => alert(res.data.message))
  .catch(err => console.log(err));
}
