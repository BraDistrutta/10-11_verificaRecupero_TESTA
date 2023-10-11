var classi = ["tpsit", "info", "reti", "inglese", "lettere", "religione", "mate", "gestione", "storia", "gin"];
const date = new Date();

window.onload = async function () {
    let header = document.getElementsByTagName("header")[0];
    header.innerHTML = "OGGI: " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();

    console.log(window.location.search.split("-"));
    let strings =window.location.search.split("-").filter(function (el) {
        return el != "?data=";
    })
    console.log(strings);
    if(strings[0]!="") {
        for (let materia of strings) {
            let section = document.getElementById("oggi")
            let mat = materia.split("%20")[2]
            console.log(mat);
            if (mat == undefined)
                section.innerHTML += '<div class ="' + materia + '"></div>'
            else
                section.innerHTML += '<div class ="' + mat + '"></div>'
        }
    }
    else{
        let busta = await fetch("http://localhost:63342/10-11_verificaRecupero_TESTA/server/eventi.php" )
        let response = await busta.json();
        console.log(response);
        let eventi = response.eventi;
        let nomi = response.nomi;
        console.log(nomi);

        for(let evento of eventi){
            if(evento.data.split("-")[2]== date.getDate().toString()) {
                let nome = nomi[evento.codDesc-1];
                console.log("nome:"+nome.descr);
                let section = document.getElementById("oggi")
                section.innerHTML += '<div class ="' + nome.descr.toLowerCase() + '"></div>'
            }
        }
    }
}

/**
    PER TUTTE LE PAGINE:
    1) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA:
    6.1) Mostro il giorno di oggi o quello selezionato
    6.2) Mostro gli eventi del giorno di oggi o quello eventualmente selezionato
    
    NOTA. E' possibile: 
        1) ritornare gli eventi da database, 
        2) salvare gli eventi nella memoria locale prima del cambio di pagina 
        3) o passare gli eventi come parametro
        
        RICORDO DI NON DIMENTICARE IL GIORNO DEL MESE!
 */