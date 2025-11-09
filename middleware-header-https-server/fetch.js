// async function updateDocument() {
//         const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//         const dataArray = await response.json();
//         const h1 = document.createElement("h1");
//         const h2 = document.createElement("h2");
//         const p = document.createElement("p");
//         const divEl = document.createElement("div");

//         h1.innerText = dataArray.userId;
//         h2.innerText = dataArray.title;
//         p.innerText = dataArray.body;

//         divEl.appendChild(h1);
//         divEl.appendChild(h2);
//         divEl.appendChild(p);

//         document.getElementById("parentDiv").appendChild(divEl);
//       }

async function updateDocument() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
  console.log(response.data);
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const divEl = document.createElement("div");

  h1.innerText = response.data.userId;
  h2.innerText = response.data.title;
  p.innerText = response.data.body;

  divEl.appendChild(h1);
  divEl.appendChild(h2);
  divEl.appendChild(p);

  document.getElementById("parentDiv").appendChild(divEl);
}

updateDocument();
