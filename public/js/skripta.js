const divIme = document.querySelector("input[name='ime']");
const divPrezime = document.querySelector("input[name='prezime']");
const divId = document.querySelector("input[name='id']");

document.getElementById("save").onclick = ev => save();
document.getElementById("delete").onclick = ev => brisi();
document.getElementById("update").onclick = ev => sacuvaj();

function vratiSve() {
  fetch("http://localhost:3000/vratisve")
    .then(response => {
      return response.json();
    })
    .then(res => {
      crtajTabelu(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function brisi() {
  fetchData = {
    method: "delete"
  };
  fetch("http://localhost:3000/brisi/" + divId.value, fetchData)
    .then(response => {
      return response.json();
    })
    .then(vratiSve())
    .catch(err => {
      console.log(err);
    });
}

function save(ev) {
  const formFetch = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      ime: divIme.value,
      prezime: divPrezime.value
    })
  };
  fetch("http://localhost:3000/novicovek", formFetch)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(vratiSve())
    .catch(error => console.log(error));
}

function sacuvaj() {
  const formFetch = {
    method: "put",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      ime: divIme.value,
      prezime: divPrezime.value
    })
  };
  fetch("http://localhost:3000/update/" + divId.value, formFetch)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(vratiSve())
    .catch(err => console.log(err));
}

function crtajTabelu(res) {
  let tabela = document.querySelector("table");
  let tabelaHTML =
    "<thead><tr><th>Ime</th><th>Prezime</th></tr></thead><tbody>";
  res.data.forEach(el => {
    tabelaHTML += "<tr><td>" + el.ime + "</td><td>" + el.prezime + "</td></tr>";
  });
  tabelaHTML += "</tbody>";
  tabela.innerHTML = tabelaHTML;
}
