const form = document.getElementById('register_form');
form.addEventListener('submit', (event) => { 
    event.preventDefault();

    const nev = document.getElementById('nev').value;
    const osztaly = document.getElementById('osztalyok').value;

    if (nev === "") {
        alert("Név mező kitöltése kötelező");
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