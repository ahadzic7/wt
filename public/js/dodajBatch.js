function posaljiBatch() {
    let csv = document.getElementById('csv_text').value;
    let niz_stringova = csv.toString('utf-8').split(/[\r\n,]/).filter(s => s.length > 0);
    console.log(csv);
    if(niz_stringova.length % 4 != 0) 
        alert('Greska u unesenom csv');
    else {
        let ajaxstatus = document.getElementById('ajaxstatus');
        StudentAjax.dodajBatch(csv, (err, data) => {
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