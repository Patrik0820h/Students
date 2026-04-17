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
            }
            studentClass = student.osztaly;
            studentTable = document.createElement("table");
            studentTable.id = studentClass;
        };
        let sor = document.createElement("tr");
        let cella = document.createElement("td");
        cella.innerHTML = student.id;
        let cella2 = document.createElement("td");
        cella2.innerHTML = student.nev;
        sor.appendChild(cella);
        sor.appendChild(cella2);
        studentTable.appendChild(sor);
    })
    studentsBlock.appendChild(studentTable);
})