function posalji() {
    let ime = document.getElementById('ime').value;
    let prezime = document.getElementById('prezime').value
    let index = document.getElementById('index').value;
    let grupa = document.getElementById('grupa').value;

    if(ime.length === 0) 
        alert('Greska! Polje ime ne smije biti prazno');
    else if(prezime.length === 0) 
        alert('Greska! Polje prezime ne smije biti prazno');
    else if(index.length === 0) 
        alert('Greska! Polje indec ne smije biti prazno');
    else if(grupa.length === 0) 
        alert('Greska! Polje grupa ne smije biti prazno');
    else {
        let jsonStudent = { ime:ime, prezime:prezime, index:index, grupa:grupa }

        StudentAjax.dodajStudenta(jsonStudent, (err, data) => {
            if(err) {
                console.log(err)
                ajaxstatus.innerHTML = err;
            }
            else {
                console.log(data);
                ajaxstatus.innerHTML = data.status;
            }
        });
    }
}