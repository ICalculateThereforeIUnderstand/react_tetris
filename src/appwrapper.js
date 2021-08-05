import React from "react";
//import ReactDOM from "react-dom";
//import Opcije from "./opcije.js";
import {Aplikacija, Context} from "./aplikacija.js";
import Opcije from "./opcije.js";


export function AppWrapper() {
	
	const [defaultPod] = React.useState({"MOVE RIGHT": "ArrowRight", "MOVE LEFT": "ArrowLeft", "ROTATE RIGHT": "ArrowUp", "ROTATE LEFT": "KeyZ", 
		"SOFT DROP": "ArrowDown", "HARD DROP":"Space", "PAUSE": "KeyP", "AUTO-REPEAT DELAY": 170, "AUTO-REPEAT SPEED": 50, "SOUND VOLUME": 100, "NEXT PIECES SHOWED": 4,
		"Ghost": true});
	
	const [pod, setPod] = React.useState(defaultPod);
	
	const [sw, setSw] = React.useState(1);
	const [sw1, setSw1] = React.useState(false);  // ova opcija sluzi da kada zatvorimo opcijski prozor, da salje informaciju aplikaciji tako da ona moze odpauzirati igru
	

	
	function modificirajKontekst(key, value) {
		var noviPod = {...pod};
		noviPod[key] = value;
		//console.log("za key " + key + " novi val je " + noviPod[key] + "  -  " + (typeof key === "string"));
		setPod(noviPod);
	}
	
	function modificirajKontekstAll(noviPod) {
		var noviPod1 = {...pod};
		for (let pp in noviPod) {
			noviPod1[pp] = noviPod[pp];
			//console.log("prom. " + pp + " / " + noviPod[pp]);
		}
		//alert("ides");
		for (let pp in noviPod1) {
		    console.log("prom. " + pp + " / " + noviPod[pp]);
	    }
		setPod(noviPod1);
	}
	
	return (
	    <Context.Provider value={{"defaultPod": defaultPod, "pod": pod, promijeniCon: modificirajKontekst, promijeniConAll: modificirajKontekstAll, opcijeSw: setSw, opcijeSw1: setSw1, sww1: sw1}}>
	        
	            <Aplikacija/>
	        
	        {sw === 2 &&
				<Opcije/>
			}
	        
	    </Context.Provider>
	)
}


function Ispis() {
	const con = React.useContext(Context);
	console.log("Renderao sam Ispis");
	for (const pp in con.pod) {
		console.log(pp + " : " + con.pod[pp]);
	}
	
	return (
	    <div></div>
	)
}


