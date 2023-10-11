<?php
$jObj = null;
$conn = mysqli_connect("localhost", "root", "", "calendario");
if($conn->connect_errno>0){
    $jObj = preparaRisp(-1, "Connessione rifiutata");
}else{
    $jObj = preparaRisp(0, "Connessione ok");
}

$query = "SELECT * FROM eventi";
$ris = $conn->query($query);
if($ris){
    $jObj->eventi = array();
    if($ris->num_rows > 0){
        while($vet = $ris->fetch_assoc()){
            array_push($jObj->eventi, $vet);
        }
    }else{
        $jObj = preparaRisp(-1, "Non ho trovato eventi");
    }
}else{
    $jObj = preparaRisp(-1, "Errore nella query: ".$conn->error);
}

$query = "SELECT * FROM nomi";
$ris = $conn->query($query);
if($ris){
    $jObj->nomi = array();
    if($ris->num_rows > 0){
        while($vet = $ris->fetch_assoc()){
            array_push($jObj->nomi, $vet);
        }
    }else{
        $jObj = preparaRisp(-1, "Non ho trovato nomi");
    }
}else{
    $jObj = preparaRisp(-1, "Errore nella query: ".$conn->error);
}

echo json_encode($jObj);

function preparaRisp($cod, $desc, $jObj = null){
    if(is_null($jObj)){
        $jObj = new stdClass();
    }
    $jObj->cod = $cod;
    $jObj->desc = $desc;
    return $jObj;
}