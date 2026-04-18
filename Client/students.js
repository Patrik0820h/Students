fetch('/liststudents')
.then(function (res) {return res.json()})
.then(function (data) {
    let studentsBlock = document.getElementById('students');
    let studentClass = "";
    let studentTable;
  
    data.forEach(function (student){
        
        if (studentClass != student.osztaly){
            if (studentClass != ""){
                studentsBlock.appendChild(studentTable);
            };

            studentClass = student.osztaly;

            let title = document.createElement("h2");
            title.innerText = studentClass;
            studentsBlock.appendChild(title);

            studentTable = document.createElement("table");
            studentTable.id = studentClass;
        };
        let sor = document.createElement("tr");
        //let cella = document.createElement("td");
        //cella.innerHTML = student.id;
        let cella2 = document.createElement("td");
        cella2.innerHTML = student.nev;

        let gombbok = document.createElement("td");
        let szerkesztesGomb = document.createElement("button");
        szerkesztesGomb.innerText = "Szerkesztés";
        szerkesztesGomb.onclick = function () {
            let ujNev = prompt("Új név:", student.nev);
            if (ujNev) {
                let adat = {
                    nev: ujNev,
                    id: student.id
                };
                fetch(`/students/${student.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(adat)
                }).then(() => location.reload());
            }
        };
        let torlesGomb = document.createElement("button");
        torlesGomb.innerText = "Törlés";
        torlesGomb.onclick = function () {
            if (confirm("Biztos törlöd?")) {
                let adat = {
                    id: student.id
                };
                fetch(`/students/${student.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(adat)
                }).then(() => location.reload());
            }
        };

        gombbok.appendChild(szerkesztesGomb);
        gombbok.appendChild(torlesGomb);

        //sor.appendChild(cella);
        sor.appendChild(cella2);
        sor.appendChild(gombbok);

        studentTable.appendChild(sor);
    })
    studentsBlock.appendChild(studentTable);
})