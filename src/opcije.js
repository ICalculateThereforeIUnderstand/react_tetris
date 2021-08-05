import React from "react";
import ReactDOM from "react-dom";
import {Context} from "./aplikacija.js";
import "./opcije.css";

function OpcijskiGumb({tekst, onKlik}) {
	function filtrirajTekst(tet) {
		if (tet.substring(0,3) === "Key")  return tet.slice(3);
		return tet;
	}
	
	return (
	    <div onClick={onKlik} id="opcijskigumb">
	        <p id="opcijskigumb-tekst">{filtrirajTekst(tekst).toUpperCase()}</p>
	    </div>
	)
}

function OpcijskiElement({klik, tekst, gumbTekst}) {
	
	function saljiKey() {
		klik(tekst);
	}
	
	return (
	    <div className="opcije-el">
	        <p className="opcije-tekst">{tekst}</p>
	        <OpcijskiGumb onKlik={saljiKey} tekst={gumbTekst}/>
	    </div>
	)
}

function OpcijskiGumb1({sign, klik}) {
	return (
	    <div onClick={klik} id="opcijskigumb1">
	        <p id="opcijskigumb-tekst">{sign}</p>
	    </div>
	)
}

function OpcijskiElement1({tekst, jedinica, min=0, max=200, pocetnaVri=170, klik, dek=10}) {
	const [vri, setVri] = React.useState(pocetnaVri);
	const [minimum] = React.useState(min);
	const [maximum] = React.useState(max);
	
	const rr = React.useRef();
	
	//console.log("minimum je " + minimum + ", a max je " + maximum);
	
	function dekrement(ev) {
		ev.preventDefault();
		rr.current.focus();
		if (vri - dek >= minimum) {
			setVri(vri-dek);
			klik(tekst, vri-dek);
		}
	}
	
	function inkrement(ev) {
		ev.preventDefault();
		rr.current.focus();
		if (vri + dek <= maximum) {
			setVri(vri+dek);
			klik(tekst, vri+dek);
		}
	}

	return (
	    <div ref={rr} className="opcije-el">
	        <p className="opcije-tekst">{tekst}</p>
	        <div id="opcijskielement1-el">
	            <OpcijskiGumb1 sign="-" klik={dekrement}/>
	            <p id="opcijskielementi1-iznos">{vri}{jedinica}</p>
	            <OpcijskiGumb1 sign="+" klik={inkrement}/>
	        </div>
	    </div>
	)
}

function OpcijskiElement2({tekst, klik, stanje}) {
	const [sw, setSw] = React.useState(stanje);
	const r = React.useRef();
	const con = React.useContext(Context);
	
	function klik1() {
		if (sw) {
			//r.current.style.display = "none";
			con.promijeniCon("Ghost", false);
			setSw(false);
			klik(false);
		} else {
			//r.current.style.display = "block";
			con.promijeniCon("Ghost", true);
			setSw(true);
			klik(true);
		}
	}
	
	React.useEffect(() => {
	    if (sw) {
		    r.current.style.display = "block";
	    } else {
		    r.current.style.display = "none";
	    }
	});
	
	return (
	    <div className="opcije-el">
	        <p className="opcije-tekst">{tekst}</p>
	        <div id="opcijskielement2-el">
	            <div onClick={klik1} id="opcijskielement-kucica">
	                <div ref={r} id="opcijskielement2-kvacica">
	                    <div id="opcijskielement2-kvacica-el1">
	                    </div>
	                    <div id="opcijskielement2-kvacica-el2">
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	)
}

function Listener({objasnjenje, klik, klik1}) {
	
	React.useEffect(() => {
		document.addEventListener("keydown", pritisakGumba);
		console.log("Upravo si postavio event listener.");
		
		return (() => {
			document.removeEventListener("keydown", pritisakGumba);
		    console.log("Upravo si UKLONIO event listener.");
			});
	}, []);
	
	function pritisakGumba(ev) {
		ev.preventDefault();
		console.log("upravo si pritisnuo gumb " + ev.code);
		klik(objasnjenje, ev.code);
	}
	
	
	return (
	    <div id="opcije-okvir2">
	        <div id="opcije-okvir3">
	             <p id="opcije-naslov1">PRESS THE DESIRED KEY FOR</p>
	             <p id="opcija-objasnjenje">{objasnjenje}</p>
	             <Gumb1 tekst="CANCEL" klik={klik1}/>
	        </div>
	    </div>
	)
}

function Gumb1({tekst, klik}) {
	return (
	    <div onClick={klik} id="gumb1-okvir">
	        <div id="gumb1-okvir1">
	            <p id="gumb1-tekst">{tekst}</p>
	        </div>
	    </div>
	)
	
}

function Gumb2({tekst, klik}) {
	return (
	    <div onClick={klik} id="gumb2-okvir">
	        <div id="gumb2-okvir1">
	            <p id="gumb2-tekst">{tekst}</p>
	        </div>
	    </div>
	)
	
}

function PotvrdaReseta({klikReset, klikNoReset}) {
	return (
	    <div id="opcije-okvir2">
	        <div id="opcije-okvir3">
	            <p id="opcije-naslov2">RESET OPTIONS?</p>
	            <Gumb2 tekst="OK" klik={klikReset}/>
	            <Gumb2 tekst="CANCEL" klik={klikNoReset}/>
	        </div>
	    </div>
	)
}

function PotvrdaInputa({klikPostavi, klikOstavi}) {
	return (
	    <div id="opcije-okvir2">
	        <div id="opcije-okvir3">
	            <p id="opcije-naslov3">You have already chosen this key. Are you sure?</p>
	            <Gumb2 tekst="OK" klik={klikPostavi}/>
	            <Gumb2 tekst="CANCEL" klik={klikOstavi}/>
	        </div>
	    </div>
	)
}

function Opcije() {
	const con = React.useContext(Context);
	const [defaultParametri] = React.useState({"MOVE RIGHT": con.defaultPod["MOVE RIGHT"], "MOVE LEFT": con.defaultPod["MOVE LEFT"], "ROTATE RIGHT": con.defaultPod["ROTATE RIGHT"], "ROTATE LEFT": con.defaultPod["ROTATE LEFT"], "SOFT DROP": con.defaultPod["SOFT DROP"], "HARD DROP":con.defaultPod["HARD DROP"], "PAUSE":con.defaultPod["PAUSE"]});
	const [defaultParametri1] = React.useState({"AUTO-REPEAT DELAY": con.defaultPod["AUTO-REPEAT DELAY"], "AUTO-REPEAT SPEED": con.defaultPod["AUTO-REPEAT SPEED"], "SOUND VOLUME": con.defaultPod["SOUND VOLUME"], "NEXT PIECES SHOWED": con.defaultPod["NEXT PIECES SHOWED"]});
	const [parametri, setParametri] = React.useState({"MOVE RIGHT": con.pod["MOVE RIGHT"], "MOVE LEFT": con.pod["MOVE LEFT"], "ROTATE RIGHT": con.pod["ROTATE RIGHT"], "ROTATE LEFT": con.pod["ROTATE LEFT"], "SOFT DROP": con.pod["SOFT DROP"], "HARD DROP":con.pod["HARD DROP"], "PAUSE":con.pod["PAUSE"]});
	const [parametri1, setParametri1] = React.useState({"AUTO-REPEAT DELAY": con.pod["AUTO-REPEAT DELAY"], "AUTO-REPEAT SPEED": con.pod["AUTO-REPEAT SPEED"], "SOUND VOLUME": con.pod["SOUND VOLUME"], "NEXT PIECES SHOWED": con.pod["NEXT PIECES SHOWED"]});
	const [defaultGhost] = React.useState(con.pod["Ghost"]);
	const [ghost, setGhost] = React.useState(defaultGhost);
	
	const [sw, setSw] = React.useState(1);
	const [key, setKey] = React.useState();
	const [key1, setKey1] = React.useState();
	
	//console.log("renderao si Opcije");
	
	React.useEffect(() => {
	  if (false) {	
		console.log("upravo si updejtao parametre " + Math.random());
		for (const pr in parametri) {
			console.log(pr + " : " + parametri[pr]);
		}
		for (const pr in parametri1) {
			console.log(pr + " : " + parametri1[pr]);
		}
		console.log("Ghost piece: " + ghost);
	  }	
	}, [parametri, parametri1, ghost]);
	
	function Resetiraj() {
		setParametri(defaultParametri);
		setParametri1(defaultParametri1);
		setGhost(defaultGhost);
	    
	    con.promijeniConAll({...defaultParametri, ...defaultParametri1, "Ghost": true});
	    //con.promijeniConAll(defaultParametri1);
		
		setSw(1);
	}
	
	
	function promijeniOpciju(key, val) {
		
		if (!Object.values(parametri).includes(val) || parametri[key] === val) {
			var novi = {...parametri};
		    novi[key] = val;
		    setParametri(novi);
		    con.promijeniCon(key, val);
		    setSw(1);
		} else {
			//alert("ides");
			var ky1 = getKeyByValue(parametri, val);
			console.log("treba zamijeniti sljedece keyeve: " + key + " / " + key1);
			setKey(key);
			setKey1(ky1);
			setSw(3);
		}
		
		function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
		
		
	}
	
	function zamijeniVrijednostiOpcija() {
		var novi = {...parametri};
		var tp = novi[key];
		novi[key] = novi[key1];
		novi[key1] = tp;
		setParametri(novi);
		con.promijeniConAll(novi);
		setSw(1);
	}

	function promijeniOpciju1(key, val) {
		
	    var novi = {...parametri1};
		novi[key] = val;
		setParametri1(novi);
		con.promijeniCon(key, val);
	}
	
	function mijenjajOpciju(key) {
		console.log("kliknuo si na " + key);
		setKey(key);
		setSw(0);
	}
	
	var polje = [];
	var i = 0;
	for (const pr in parametri) {
		polje.push(<OpcijskiElement klik={mijenjajOpciju} key={i} tekst={pr} gumbTekst={parametri[pr]}/>);
		i++;
	}
		
	return (
	  <div id="opcije-background">
	  <>
	  {sw === 1 &&
	    <div id="opcije-okvir">
	        <div id="opcije-okvir1">
	             <p id="opcije-naslov">OPTIONS</p>
	             {polje}
	             <OpcijskiElement1 klik={promijeniOpciju1} tekst="AUTO-REPEAT DELAY" jedinica="ms" min={20} pocetnaVri={parametri1["AUTO-REPEAT DELAY"]} max={500}/>
	             <OpcijskiElement1 klik={promijeniOpciju1} tekst="AUTO-REPEAT SPEED" jedinica="ms" min={20} pocetnaVri={parametri1["AUTO-REPEAT SPEED"]} max={500}/>
	             <OpcijskiElement1 klik={promijeniOpciju1} tekst="SOUND VOLUME" jedinica="%" min={0} pocetnaVri={parametri1["SOUND VOLUME"]} max={100}/>
	             <OpcijskiElement1 klik={promijeniOpciju1} tekst="NEXT PIECES SHOWED" jedinica="" min={0} pocetnaVri={parametri1["NEXT PIECES SHOWED"]} max={4} dek={1}/>
	             <OpcijskiElement2 tekst="SHOW GHOST PIECE" klik={setGhost} stanje={ghost}/>
	             <div id="opcije-el">
	                 <Gumb1 klik={()=>{setSw(2)}} tekst="RESET"/>
	                 <Gumb1 klik={()=>{con.opcijeSw(1); con.opcijeSw1(true)}} tekst="DONE"/>
	             </div>
	        </div>
	    </div>
	  }  
	  {sw === 0  &&
		  <Listener objasnjenje={key} klik={promijeniOpciju} klik1={()=>{setSw(1)}}/>
	  }
	  {sw === 2 &&
		  <PotvrdaReseta klikNoReset={()=>{setSw(1)}} klikReset={Resetiraj}/>
	  }
	  {sw === 3 &&
		  <PotvrdaInputa klikOstavi={()=>{setSw(1)}} klikPostavi={zamijeniVrijednostiOpcija}/>
	  }
	  </>
	  </div>
	)
}

export default Opcije;


