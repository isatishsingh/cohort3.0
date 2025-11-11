async function calculateSum(e) {
  e.preventDefault();

  const a = document.getElementById("fieldA").value;
  const b = document.getElementById("fieldB").value;
  document.getElementById("fieldA").value = "";
  document.getElementById("fieldB").value = "";

  const response = await fetch("http://localhost:3000/sum", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ a, b }),
  });

  const data = await response.json();
  console.log("18=>",data);

  document.getElementById("answerDiv").innerHTML = "";
  let pElm = document.createElement("p");
  pElm.innerHTML = data.message;

  document.getElementById("answerDiv").appendChild(pElm);
}
