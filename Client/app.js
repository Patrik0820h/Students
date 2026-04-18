var countries = ["9a","9b","9c","10a","10b","10c","11a","11b","11c","12a","12b","12c"];

const input = document.getElementById("osztaly");
const box = document.getElementById("kitoltes");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();

  box.innerHTML = "";

  if (value.length === 0) {
    box.style.display = "none";
    return;
  }

  const filtered = countries.filter(item =>
    item.toLowerCase().startsWith(value)
  );

  if (filtered.length === 0) {
    box.style.display = "none";
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;

    div.onclick = () => {
      input.value = item;
      box.style.display = "none";
    };

    box.appendChild(div);
  });

  box.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".autocomplete")) {
    box.style.display = "none";
  }
});

const form = document.getElementById('register_form');
form.addEventListener('submit', (event) => { 
    event.preventDefault();

    const nev = document.getElementById('nev').value;
    const osztaly = document.getElementById('osztaly').value;

    if (nev === "" || osztaly === "") {
        alert("Minden mező kitöltése kötelező");
        return;
    }

    if (!countries.includes(osztaly)) {
        alert("Hibás osztály!");
        return;
    }

    const adatok = { nev, osztaly };

    fetch('/submit', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
            }, 
        body: JSON.stringify(adatok) 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)) 


});