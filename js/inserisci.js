
window.onload = async function () {
    let busta = await fetch("http://localhost:63342/10-11_verificaRecupero_TESTA/server/eventi.php" )
    let response = await busta.json();
    console.log(response);
    let eventi = response.eventi;
    let nomi = response.nomi;
    console.log(nomi);

    for(let nome of nomi){
            console.log("nome:"+nome.descr);
            let select = document.getElementById("selMateria")
            select.innerHTML += '<option value="'+ nome.cod +'">' + nome.descr +'</option>'
    }

    document.getElementById("btnInserisci").addEventListener("click", function () {
        let data = document.getElementById("data").value.toString();
        let SlotOra = document.getElementById("selSlot")
        let ora = SlotOra.options[SlotOra.selectedIndex].text
        let SlotMateria = document.getElementById("selMateria")
        let materia = SlotMateria.options[SlotMateria.selectedIndex].text
        console.log("data:"+data);
        console.log("ora:"+ora);
        console.log("materia:"+materia);
    })
}

/**
    PER TUTTE LE PAGINE:
    1) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA
    5.1) In corrispondenza del bottone INSERISCI è necessario controllare i campi compilati
    5.2) Quando inserisco i dati devo controllare che non ci sia già lo slot di quel giorno 
        pieno, in tal caso lo aggiorno sostiendo le info precedenti con quelle nuove
 */