var classi = ["tpsit", "info", "reti", "inglese", "lettere", "religione", "mate", "gestione", "storia", "gin"];

window.onload = async function () {
    let busta = await fetch("http://localhost:63342/10-11_verificaRecupero_TESTA/server/eventi.php" )
    let response = await busta.json();
    console.log(response);
    let eventi = response.eventi;
    let nomi = response.nomi;
    console.log(nomi);

    for(let evento of eventi){
        if(evento.data.split("-")[1]== "10") {
            let giorno = evento.data.split("-")[2];
            let nome = nomi[evento.codDesc-1];
            console.log("nome:"+nome.descr);
            console.log("giorno:"+giorno);
            let td = document.getElementById("att" + giorno);
            td.innerHTML += '<div class ="' + nome.descr.toLowerCase() + '"></div>'
            td.addEventListener("click", function () {
                //window.location.href = "oggi.html?data=" + td.innerHTML.split('"'[1]);
                let tdSplit = td.innerHTML.split('"')
                //console.log(tdSplit)
                let materie = '';
                for(let i=0; i<tdSplit.length; i++){
                    if(i%2!=0){
                        materie+= "-" + tdSplit[i];
                    }
                }
                console.log(materie);
                window.location.href = "oggi.html?data=" + materie;
            })
        }
    }

}
/**
    PER TUTTE LE PAGINE:
    1) Mettere il proprio cognome e nome nel footer

    PER QUESTA PAGINA:
    2.1) Scaricare tutti gli eventi di ottobre
    2.2) Inserire dinamicamente gli eventi nel calendario in modo corretto
    
    3.1) Aprire al click su un qualunque evento la pagina 
        relativa all'ingrandimento del giorno (pagina oggi.html)
    3.2) Completare la pagina in modo dinamico con i dati del giorno scelto
    
    4) Aprire al click sul numero del giorno la pagina di inserimento
        completando in modo dinamico la data con quella selezionata 
        e la fascia oraria eventualmente non compilata di quel giorno
 */