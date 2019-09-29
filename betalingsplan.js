function lagBetalingsplan() {
    let payload = hentInputVerdier();
    //console.log("Payload: " + JSON.stringify(payload));
    if(payload){
        let response = hentBetalingsplan(payload);
    } else {
        console.log("Ugyldig input!");
    }
}
function skrivBetalingsplan(respons){
	//fjerner det som står fra før
    $('.singelBetaling').remove();
	
	let ytterDiv = document.createElement("div");
	
	
	let datoDiv = document.createElement("div");
	$(datoDiv).addClass("datoDiv");
	datoDiv.innerHTML = "Dato";
	ytterDiv.appendChild(datoDiv);

	let sumDiv = document.createElement("div");
	$(sumDiv).addClass("sumDiv");
	sumDiv.innerHTML = "Betale";
	ytterDiv.appendChild(sumDiv);
	
	let laanDiv = document.createElement("div");
	$(laanDiv).addClass("laanDiv");
	laanDiv.innerHTML = "Lån igjen";
	ytterDiv.appendChild(laanDiv);	
	
	$(ytterDiv).addClass("singelBetaling");
	document.getElementById("resultat").appendChild(ytterDiv);
	let nyttAr = 0;
    respons.nedbetalingsplan.innbetalinger.forEach(betaling => {
		ytterDiv = document.createElement("div");
		
		//Printer nytt år for å få oversikt
		if(parseInt(betaling.dato.substring(0, 4), 10) > nyttAr){
			nyttAr = betaling.dato.substring(0, 4);
			let ytterDiv2 = document.createElement("div");
			
			let nyttArDiv = document.createElement("div");
			$(nyttArDiv).addClass("nyttArDiv");
			nyttArDiv.innerHTML = betaling.dato.substring(0, 4);
			ytterDiv2.appendChild(nyttArDiv);
			
			$(ytterDiv).addClass("singelBetaling");
			document.getElementById("resultat").appendChild(ytterDiv2);
		}
		
        let datoDiv = document.createElement("div");
        $(datoDiv).addClass("datoDiv");
        datoDiv.innerHTML = betaling.dato;
        ytterDiv.appendChild(datoDiv);

        let sumDiv = document.createElement("div");
        $(sumDiv).addClass("sumDiv");
        sumDiv.innerHTML = betaling.total.toFixed(0);
        ytterDiv.appendChild(sumDiv);
		
		let laanDiv = document.createElement("div");
        $(laanDiv).addClass("laanDiv");
        laanDiv.innerHTML = betaling.restgjeld.toFixed(0); 
        ytterDiv.appendChild(laanDiv);
		
        $(ytterDiv).addClass("singelBetaling");
        document.getElementById("resultat").appendChild(ytterDiv);
    });

    //console.log(respons.nedbetalingsplan.innbetalinger[0]);
    //console.log(JSON.stringify(respons));
    return true;
}
function hentBetalingsplan(payload){
    let foresporsel = {
        "async": true,
        "crossDomain": true,
        "url": "https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        "processData": false,
        //"data": "{\r\n  \"laanebelop\": 2000000,\r\n  \"nominellRente\": 3,\r\n  \"terminGebyr\":30,\r\n  \"utlopsDato\":\"2045-01-01\",\r\n  \"saldoDato\":\"2020-01-01\",\r\n  \"datoForsteInnbetaling\":\"2020-02-01\",\r\n  \"ukjentVerdi\":\"TERMINBELOP\"\r\n}"
        "data": JSON.stringify(payload)
    }
    $.ajax(foresporsel).done(function (respons) {
        respons = respons;
        skrivBetalingsplan(respons)
        return respons;
    });
}


function hentInputVerdier(){
    let inputs = document.getElementById("inputVerdier").elements;
    let verdier = {
        laanebelop: inputs[0].value,
        nominellRente: inputs[1].value,
        terminGebyr: inputs[2].value,
        utlopsDato: inputs[3].value,
        saldoDato: inputs[4].value,
        datoForsteInnbetaling: inputs[5].value,
        ukjentVerdi: "TERMINBELOP"
    }
    //console.log(verdier)
    if(gyldigVerdier(verdier)){
        return verdier;
    } else {
        return false;
    }
}

function gyldigVerdier(verdier){
    //her skal eg bruke RegExp til å validere input.

    return true;
}
