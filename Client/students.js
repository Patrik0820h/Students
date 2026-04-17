fetch('/liststudents')
.then(function (res) {return res.json()})
.then(function (data) {
    let students = document.getElementById('students');
    let studentClass = "";
    data.foreach(function (student){
        if (studentClass != student.osztaly); 
        students.innerHTML += "<table id='"+studentClass+"'>"

    })
      
    .innerHTML = data;
})