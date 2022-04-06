function dodajInput() {
    const brojVjezbi = document.getElementById('bv').value;
    if(brojVjezbi > 0 && brojVjezbi <= 15) {
        VjezbeAjax.dodajInputPolja(document.getElementById('forma_brojZadataka'), brojVjezbi);
        const DOM = document.getElementById('btn');
        DOM.style.display = 'block';
    }
    else {
        document.getElementById('forma_brojZadataka').innerHTML = '';
        alert(`Greska! Broj vjezbi mora biti izmedju 1 i 15.`);
    }
}

function posaljiInput() {
    const brojVjezbi = document.getElementById('bv').value;
    if(!(brojVjezbi >= 1 && brojVjezbi <= 15)) {
        alert(`Greska! Broj vjezbi mora biti izmedju 1 i 15.`);
        return;
    }
    let brojZadataka = [];
    for(let i = 0; i < brojVjezbi; i++) {
        const br = document.getElementById(`z${i}`);
        if(br == null)
            break;
        if(!(br.value >= 0 && br.value <= 10)) {
            alert(`Greska! Broj zadataka vjezbe z${i} nije korektan. Treba biti izmedju 0 i 10.`);
            return;
        }
        brojZadataka.push(br.value);
    }

    const json = {
        brojVjezbi:brojVjezbi,
        brojZadataka:brojZadataka
    }

    VjezbeAjax.posaljiPodatke(json,(err, data) => {
        if(err) {
            console.log(err)
            ajaxstatus.innerHTML = err;
        }
        else {
            console.log(data);
            ajaxstatus.innerHTML = "Uspjesno dodano";
        }
    });
}
