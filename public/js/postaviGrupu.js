function postavi() {
    let index = document.getElementById('index').value;
    let grupa = document.getElementById('grupa').value;

    if(index.length === 0) 
        alert('Greska! Polje indec ne smije biti prazno');
    else if(grupa.length === 0) 
        alert('Greska! Polje grupa ne smije biti prazno');
    else {
        StudentAjax.postaviGrupu(index, grupa, (err, data) => {
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