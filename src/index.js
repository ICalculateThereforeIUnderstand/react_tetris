import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function inicirajPolje(x, y, vr) { // inicira polje [x][y] sa vrijednostima vr
	var rez = [];
	for (let i = 0; i < x; i++) {
		var red = [];
		for (let j = 0; j < y; j++) {
			red.push(vr);
		}
		rez.push(red);
	}
	return rez;
}

function BrDisplay({naslov, broj}) {
	return (
	    <div id="brdisplay">
	        <p id="brdisplay-naslov">{naslov} {broj}</p>
	    </div>
	)
}

function Gumb() {
	return (
	    <div id="gumb">
	        <p id="gumb-p">Start Game</p>
	    </div>
	)
}

function NextDisplay({sljedeci}) {
// ova funkcija crta sljedece objekte koji ce pasti. sljedeci je polje sa imenima objekata. ako ima vise od
// cetiri objekta, ova funkcija prikazuje samo prva cetiri. Ako ne zelis prikazati ni jedan objekt, postavi
// property sljedeci na prazno polje, []
	const [next, setNext] = React.useState(sljedeci);
	var [polje, setPolje] = React.useState([]);
	
	React.useEffect(() => {
		var sl = sljedeci;
		if (sl.length > 4) sl = sl.slice(0,3);
		//setNext(sl);
		
		var pp = sl.map((el, i) => {return <NextObjekt key={i} objekt={el}/>});
		setPolje(pp);
		
	}, [sljedeci]);
	
	//React.useEffect(() => {
	//	var pp = next.map((el, i) => {return <NextObjekt key={i} objekt={el}/>});
	//	setPolje(pp);
	//}, [next]);
		
	return (
	    <div id="nextdisplay">
	        <p id="nextdisplay-naslov">Next</p>
	        {polje}
	    </div>
	)
}




function NextObjekt({objekt}) {

	const [r1, r2, r3, r4, r5, r6, r7, r8] = [React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef(), React.useRef()];
	
	function nacrtaj(polja, boja) {
		for (let el of polja) {
			switch (el) {
				case (1):
		            r1.current.style.backgroundColor = boja;
		            r1.current.style.borderWidth = "1px";
		            break;	
		        case (2):
		            r2.current.style.backgroundColor = boja;
		            r2.current.style.borderWidth = "1px";
		            break;
		        case (3):
		            r3.current.style.backgroundColor = boja;
		            r3.current.style.borderWidth = "1px";
		            break;
		        case (4):
		            r4.current.style.backgroundColor = boja;
		            r4.current.style.borderWidth = "1px";
		            break;
		        case (5):
		            r5.current.style.backgroundColor = boja;
		            r5.current.style.borderWidth = "1px";
		            break;
		        case (6):
		            r6.current.style.backgroundColor = boja;
		            r6.current.style.borderWidth = "1px";
		            break;
		        case (7):
		            r7.current.style.backgroundColor = boja;
		            r7.current.style.borderWidth = "1px";
		            break;
		        case (8):
		            r8.current.style.backgroundColor = boja;
		            r8.current.style.borderWidth = "1px";
		            break;
			}
		}
	}
	
	React.useEffect(() => {
		nacrtaj([1,2,3,4,5,6,7,8], "black");
		switch (objekt) {
			case "I-shape":
			    nacrtaj([1,2,3,4], "#d97d04");
			    break;
			case "kvadrat":
			    nacrtaj([2,3,6,7], "#db1107");
			    break;
			case "munja":
			    nacrtaj([5,6,2,3], "#09e2e6");
			    break;
			case "obrnuta_munja":
			    nacrtaj([1,2,6,7], "#29d91c");
			    break;
			case "L-shape":
			    nacrtaj([1,2,3,5], "#0422ba");
			    break;
			case "obrL-shape":
			    nacrtaj([1,2,3,7], "#cc0eb9");
			    break;
			case "T-shape":
			    nacrtaj([1,2,3,6], "#d4d124");
			    break;
			default:
			    alert("Greskica");
			
		}
	}, [objekt]);
	
	return (
	    <div id="display1">
	        <div ref={r1} className="polje1"></div>
	        <div ref={r2} className="polje1"></div>
	        <div ref={r3} className="polje1"></div>
	        <div ref={r4} className="polje1"></div>
	        <div ref={r5} className="polje1"></div>
	        <div ref={r6} className="polje1"></div>
	        <div ref={r7} className="polje1"></div>
	        <div ref={r8} className="polje1"></div>
	    </div>
	)
}

class Aplikacija extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			stanja: inicirajPolje(20, 12, 0),  // stanje displaya
			objekt: {tip: null, koordX: null, koordY: null, orijentacija: null},
			nextObjects: []    // sljedeci objekti koji ce se pojaviti
		}
		
		this.promijeniPolje = this.promijeniPolje.bind(this);
		this.inicirajObjekt = this.inicirajObjekt.bind(this);
		this.engine = this.engine.bind(this);
		this.nacrtajObjekt = this.nacrtajObjekt.bind(this);
		this.spustiObjekt = this.spustiObjekt.bind(this);
		this.provjeriDoljeObjekt = this.provjeriDoljeObjekt.bind(this);
		this.pritisakGumba = this.pritisakGumba.bind(this);
		this.pritisakGumbaUp = this.pritisakGumbaUp.bind(this);
		this.provjeriStranuObjekt = this.provjeriStranuObjekt.bind(this);
		this.pomakniUStranuObjekt = this.pomakniUStranuObjekt.bind(this);
		this.rotirajObjekt = this.rotirajObjekt.bind(this);
		this.provjeriRotacijuObjekt = this.provjeriRotacijuObjekt.bind(this);
		this.sljedeciRandomObjekt = this.sljedeciRandomObjekt.bind(this);
	}
	
	componentDidMount() {
		//this._div.style.backgroundColor = "red";
		for (let i = 0; i < 240; i++) {
			let el = document.createElement("div");
			el.classList.add("polje");
			//el.style.backgroundColor = "red";
			this._div.appendChild(el);
		}
		
		document.addEventListener("keydown", this.pritisakGumba);
        document.addEventListener("keyup", this.pritisakGumbaUp);
		
		this.engine();
		
		//this.promijeniPolje([[0, 5, 1], [1, 5, 2], [2, 5, 0], [3, 5, 3], [4, 5, 4], [5, 5, 5], [6, 5, 6], [7, 5, 7]]);
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log("funkcija componentDidUpdate je pokrenuta");
		for (let i = 0; i < 240; i++) {
			if (prevState.stanja[Math.floor(i/12)][i%12] != this.state.stanja[Math.floor(i/12)][i%12]) {
				//console.log("upravo mjenjamo " + (i%12) + " / " + Math.floor(i/12));
				switch (this.state.stanja[Math.floor(i/12)][i%12]) {
					case (0):
				        this._div.children[i].style.backgroundColor = "#000000"; // crna
				        break;
				    case (1):
				        this._div.children[i].style.backgroundColor = "#db1107"; // crvena, za kvadrat
				        break;
				    case (2):
				        this._div.children[i].style.backgroundColor = "#d97d04"; // smeda, za liniju
				        break;
				    case (3):
				        this._div.children[i].style.backgroundColor = "#09e2e6"; // svjetlo plava, za munju
				        break;
				    case (4):
				        this._div.children[i].style.backgroundColor = "#29d91c"; // zelena, za obrnutu munju
				        break;    
				    case (5):
				        this._div.children[i].style.backgroundColor = "#0422ba"; // tamno plava, za L-shape
				        break;
				    case (6):
				        this._div.children[i].style.backgroundColor = "#cc0eb9"; // roza, za obrnuti L-shape
				        break;
				    case (7):
				        this._div.children[i].style.backgroundColor = "#d4d124"; // zuta, za T-shape
				        break;
				    default:
				        alert("Error, krivi input");
				}
			}
		}
		//console.log("previous:" + prevState.stanja);
		
	}
	
	render() {
		return (
		    <div id="okvir">
		        <div id="el1">
		            <NextDisplay sljedeci={this.state.nextObjects}/>
		        </div>
		        <div ref={(e) => {this._div = e}} id="display">
		        </div>
		        <div id="el">
		            <BrDisplay naslov="Score:" broj="547567"/>
		            <BrDisplay naslov="Level:" broj="2"/>
		            <BrDisplay naslov="Lines:" broj="145"/>
		            <Gumb/>
		        </div>
		    </div>
		)
	}
	
	engine() {
		//this.inicirajObjekt("T-shape");  // I-shape, kvadrat, munja, obrnuta_munja, L-shape, obrL-shape, T-shape
		
		//this.nacrtajObjekt({tip: "I-shape", koordX: 1, koordY: 6, orijentacija: 1, sw: true});
		//this.nacrtajObjekt({tip: "I-shape", koordX: 6, koordY: 7, orijentacija: 1, sw: true});
		//this.nacrtajObjekt({tip: "I-shape", koordX: 6, koordY: 1, orijentacija: 1, sw: true});
		
		setInterval(() => {
		this.sljedeciRandomObjekt();
		console.log("STANJE: " + this.state.nextObjects);
		
	}, 2000);
	    
		
		if (false) {
		setTimeout(() => {
		//	this.spustiObjekt()
		this.nacrtajObjekt({tip: "I-shape", koordX: 2, koordY: 5, orijentacija: 1, sw: true});
		    this.nacrtajObjekt({tip: "munja", koordX: 2, koordY: 9, orijentacija: 2, sw: true});
		    this.nacrtajObjekt({tip: "kvadrat", koordX: 8, koordY: 15, orijentacija: 1, sw: true});
		    this.nacrtajObjekt({tip: "I-shape", koordX: 8, koordY: 16, orijentacija: 2, sw: true});
			}, 80);
        }			
	}
	
	sljedeciRandomObjekt() {
		var noviNext = [...this.state.nextObjects];
		noviNext.push(["I-shape", "kvadrat", "munja", "obrnuta_munja", "L-shape", "obrL-shape", "T-shape"][Math.floor(Math.random()*7)]);
		if (noviNext.length > 4)  noviNext.shift();
		console.log("noviNext je " + noviNext);
		this.setState({nextObjects: noviNext});
	}
	
	spustiObjekt() {
		console.log("spustam objekt");
		if (this.provjeriDoljeObjekt()) {
			console.log("MOZE");
		    var noviObjekt = {...this.state.objekt};
		    this.nacrtajObjekt({...noviObjekt, sw: false});
		    noviObjekt.koordY += 1;
		
		    this.nacrtajObjekt({...noviObjekt, sw: true});
		    this.setState({objekt: noviObjekt});
		} else {
			console.log("ne moze");
		}
		
		
	}
	
	rotirajObjekt() {
		if (this.provjeriRotacijuObjekt()) {
		    var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
		    var noviObjekt = {...this.state.objekt};
		    this.nacrtajObjekt({...noviObjekt, sw: false});  
		    switch (tip) {
				case "I-shape":
			    case "munja":  
			    case "obrnuta_munja":  
			        if (orijentacija == 1) {
			            noviObjekt.orijentacija = 2;	    
			        } else {
					    noviObjekt.orijentacija = 1;
				    }
		            break;
		        case "L-shape":
		        case "obrL-shape":  
		        case "T-shape":  
		            if (orijentacija < 4) {
						orijentacija += 1;
					} else {
						orijentacija = 1;
					}
					noviObjekt.orijentacija = orijentacija;
		            break;
		        case "kvadrat":  // nikada se ne javlja zato sto provjeriRotacijuObjekt za njega vraca false
		            break;
		        default:
		            alert("Kod rotacije imas zadan pogresan tip");
		    }
		    
		    this.nacrtajObjekt({...noviObjekt, sw: true});
		    this.setState({objekt: noviObjekt});
		}
	}
	
	pomakniUStranuObjekt(sww) {  // za sw='l' pomice na lijevo objekt, za 'd' na desno
		if (this.provjeriStranuObjekt(sww)) {
			var noviObjekt = {...this.state.objekt};
		    this.nacrtajObjekt({...noviObjekt, sw: false});
		    if (sww == 'l') { 
				noviObjekt.koordX -= 1;
			} else {
				noviObjekt.koordX += 1;
			}
		    this.nacrtajObjekt({...noviObjekt, sw: true});
		    this.setState({objekt: noviObjekt});
		} 
	}
	
	provjeriRotacijuObjekt() {
		var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
		switch (tip) {
			case ("I-shape"):
			    if (orijentacija == 1) {
					if (koordY <= 17 && (koordY == 0  ||  this.state.stanja[koordY-1][koordX] == 0) && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+2][koordX] == 0) return true;
					return false;
				} else {
					if (koordX == 0 || koordX >= 10) return false;
					if (this.state.stanja[koordY][koordX-1] != 0 || this.state.stanja[koordY][koordX+1] != 0 || this.state.stanja[koordY][koordX+2] != 0) return false;
					return true;
				}
			    break;
			case ("kvadrat"):
			    return false;
			case ("munja"):
			    if (orijentacija == 1) {
					if ( (koordY == 0  ||  this.state.stanja[koordY-1][koordX] == 0) && this.state.stanja[koordY+1][koordX+1] == 0) return true;
					return false;
				} else {
					if (koordX == 0) return false;
					if (this.state.stanja[koordY+1][koordX-1] != 0 || this.state.stanja[koordY+1][koordX] != 0) return false;
					return true;
				}
			    break;
			case ("obrnuta_munja"):
			    if (orijentacija == 1) {
					if ( (koordY == 0  ||  this.state.stanja[koordY-1][koordX] == 0) && this.state.stanja[koordY+1][koordX-1] == 0) return true;
					return false;
				} else {
					if (koordX >= 11) return false;
					if (this.state.stanja[koordY+1][koordX+1] != 0 || this.state.stanja[koordY+1][koordX] != 0) return false;
					return true;
				}
			    break;
			case ("L-shape"):
			    switch (orijentacija) {
					case (1):
					    if (  (koordY == 0  ||  (this.state.stanja[koordY-1][koordX-1] == 0 && this.state.stanja[koordY-1][koordX] == 0 )  )  && this.state.stanja[koordY+1][koordX] == 0) return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0)  && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY][koordX-1] == 0) return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && (koordY == 0 || this.state.stanja[koordY-1][koordX] == 0)  && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY][koordX+1] == 0) return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			case ("obrL-shape"):
			    switch (orijentacija) {
					case (1):
					    if (  (koordY == 0 || this.state.stanja[koordY-1][koordX] == 0)  && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0)  && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY][koordX+1] == 0) return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && (koordY == 0 || (this.state.stanja[koordY-1][koordX] == 0 && this.state.stanja[koordY-1][koordX+1] == 0) ) && this.state.stanja[koordY+1][koordX] == 0) return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;
			case ("T-shape"):
			    switch (orijentacija) {
					case (1):
					    if (koordY == 0 || this.state.stanja[koordY-1][koordX] == 0)  return true;
					    return false;
					    break;
					case (2):
					    if (koordX <= 10 && this.state.stanja[koordY][koordX+1] == 0)  return true;
					    return false;
					    break;
					case (3):
					    if (koordY <= 18 && this.state.stanja[koordY+1][koordX] == 0)  return true;
					    return false;
					    break;
					case (4):
					    if (koordX >= 1 && this.state.stanja[koordY][koordX-1] == 0)  return true;
					    return false;
					    break;
					default:
					    alert("pogresna orijentacija L-shapea");
				}
			    break;    
			default:
			    alert("cini se da imas los tip");
		}
	}
	
	provjeriStranuObjekt(sw) { // za sw='l' provjerava da li se objekt moze pomaknuti na lijevo, za 'd' na desno
	    var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
	    if (sw == 'l') {
			switch (tip) {
			    case ('I-shape'):
			        if (orijentacija == 1) {
						if (koordX > 1 && this.state.stanja[koordY][koordX-2] == 0) return true;
						return false;
					} else {
						if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0) && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+2][koordX-1] == 0) return true;
						return false;
					}
			        break;
			    case ('kvadrat'):
			        if (koordX > 0 && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
					return false;
			        break;
			    case ('munja'):
			        if (orijentacija == 1) {
						if (koordX > 1 && this.state.stanja[koordY+1][koordX-2] == 0 && this.state.stanja[koordY][koordX-1] == 0) return true;
						return false;
					} else {
						if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0) && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0) return true;
						return false;
					}
			        break;
			    case ('obrnuta_munja'):
			        if (orijentacija == 1) {
						if (koordX > 1 && this.state.stanja[koordY][koordX-2] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
						return false;
					} else {
						if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0) && this.state.stanja[koordY][koordX-2] == 0 && this.state.stanja[koordY+1][koordX-2] == 0) return true;
						return false;
					}
			        break;
			    case ('L-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX > 1 && this.state.stanja[koordY][koordX-2] == 0 && this.state.stanja[koordY+1][koordX-2] == 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX > 1 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX-2] == 0)  && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX] == 0) && this.state.stanja[koordY][koordX-2] == 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0)  && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('obrL-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX > 1 && this.state.stanja[koordY][koordX-2] == 0 && this.state.stanja[koordY+1][koordX] == 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX > 1 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0)  && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX-2] == 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX-2] == 0) && this.state.stanja[koordY][koordX-2] == 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0)  && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('T-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX > 1 && this.state.stanja[koordY][koordX-2] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX > 1 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0)  && this.state.stanja[koordY][koordX-2] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX > 1 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0) && this.state.stanja[koordY][koordX-2] == 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX > 0 && (koordY == 0 || this.state.stanja[koordY-1][koordX-1] == 0)  && this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+1][koordX-1] == 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    default:
			        alert('Pogreska, ne postoji tip');	
			}
		} else {  // provjeravamo za desni pomak
			switch (tip) {
			    case ('I-shape'):
			        if (orijentacija == 1) {
						if (koordX < 9 && this.state.stanja[koordY][koordX+3] == 0) return true;
						return false;
					} else {
						if (koordX < 11 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0) && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+1] == 0 && this.state.stanja[koordY+2][koordX+1] == 0) return true;
						return false;
					}
			        break;
			    case ('kvadrat'):
			        if (koordX < 10 && this.state.stanja[koordY][koordX+2] == 0 && this.state.stanja[koordY+1][koordX+2] == 0) return true;
					return false;
			        break;
			    case ('munja'):
			        if (orijentacija == 1) {
						if (koordX < 10 && this.state.stanja[koordY][koordX+2] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
						return false;
					} else {
						if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0) && this.state.stanja[koordY][koordX+2] == 0 && this.state.stanja[koordY+1][koordX+2] == 0) return true;
						return false;
					}
			        break;
			    case ('obrnuta_munja'):
			        if (orijentacija == 1) {
						if (koordX < 10 && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+2] == 0) return true;
						return false;
					} else {
						if (koordX < 11 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0) && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX] == 0) return true;
						return false;
					}
			        break;
			    case ('L-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX < 10 && this.state.stanja[koordY][koordX+2] == 0 && this.state.stanja[koordY+1][koordX] == 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX < 11 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0)  && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+2] == 0) && this.state.stanja[koordY][koordX+2] == 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX < 10 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0)  && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+2] == 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('obrL-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX < 10 && this.state.stanja[koordY][koordX+2] == 0 && this.state.stanja[koordY+1][koordX+2] == 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX < 11 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0)  && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX] == 0) && this.state.stanja[koordY][koordX+2] == 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX < 10 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+2] == 0)  && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    case ('T-shape'):
			        switch (orijentacija) {
					    case (1):
					        if (koordX < 10 && this.state.stanja[koordY][koordX+2] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
						    return false;
					        break;	
					    case (2):
					        if (koordX < 11 &&  (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0)  && this.state.stanja[koordY][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
						    return false;
					        break;
					    case (3):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0) && this.state.stanja[koordY][koordX+2] == 0) return true;
					        return false;
					        break;
					    case (4):
					        if (koordX < 10 && (koordY == 0 || this.state.stanja[koordY-1][koordX+1] == 0)  && this.state.stanja[koordY][koordX+2] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
						    return false;
					        break;
					    default:
					        alert("nesto1 je krivo sa orijentacijom");
					}
			        break;
			    default:
			        alert('Pogreska, ne postoji tip');	
			}
		}	
	}
	
	provjeriDoljeObjekt() {  // vraca true ako se moze objekt pomaknuti prema dolje
		var {koordX, koordY, tip, orijentacija} = {...this.state.objekt};
		switch (tip) {
			case "I-shape":
                if (koordY >= 19) return false;
                if (orijentacija == 1) {
			        if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0 && this.state.stanja[koordY+1][koordX+2] == 0) return true;
			        return false;
		        } else {
			        if (koordY >= 17) return false;
			        if (this.state.stanja[koordY+3][koordX] == 0) return true;
			        return false;
		        }
		        break;
		    case "kvadrat":
		        if (koordY >= 18) return false;
		        if (this.state.stanja[koordY+2][koordX] == 0 && this.state.stanja[koordY+2][koordX+1] == 0) return true;
		        return false;
		    case "munja":
		        if (koordY >= 18) return false;
		        if (orijentacija == 1) {
			        if (this.state.stanja[koordY+2][koordX-1] == 0 && this.state.stanja[koordY+2][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
			        return false;
		        } else { 
			        if (this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+2][koordX+1] == 0) return true;
			        return false;
		        }
		        break;
		    case "obrnuta_munja":
		        if (koordY >= 18) return false;
		        if (orijentacija == 1) {
			        if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+2][koordX] == 0 && this.state.stanja[koordY+2][koordX+1] == 0) return true;
			        return false;
		        } else { 
			        if (this.state.stanja[koordY+2][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0) return true;
			        return false;
		        }
		        break;
		    case "L-shape":
		        switch (orijentacija) {
					case 1:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
			            return false;
					    break;
					case 2:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY][koordX-1] == 0 && this.state.stanja[koordY+2][koordX] == 0) return true;
					    break;
					case 3:
					    if (koordY >= 19) return false;
					    if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
					    break;
					case 4:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX] == 0 && this.state.stanja[koordY+2][koordX+1] == 0) return true;
					    break;
					default:
					    alert("pogresna orijentacija");
				}
		        break;
		    case "obrL-shape":
		        switch (orijentacija) {
					case 1:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+2][koordX+1] == 0) return true;
			            return false;
					    break;
					case 2:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX-1] == 0 && this.state.stanja[koordY+2][koordX] == 0) return true;
					    break;
					case 3:
					    if (koordY >= 19) return false;
					    if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
					    break;
					case 4:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX] == 0 && this.state.stanja[koordY][koordX+1] == 0) return true;
					    break;
					default:
					    alert("pogresna orijentacija");
				}
		        break;
		    case "T-shape":
		        switch (orijentacija) {
					case 1:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+2][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
			            return false;
					    break;
					case 2:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+2][koordX] == 0) return true;
					    break;
					case 3:
					    if (koordY >= 19) return false;
					    if (this.state.stanja[koordY+1][koordX-1] == 0 && this.state.stanja[koordY+1][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
					    break;
					case 4:
					    if (koordY >= 18) return false;
					    if (this.state.stanja[koordY+2][koordX] == 0 && this.state.stanja[koordY+1][koordX+1] == 0) return true;
					    break;
					default:
					    alert("pogresna orijentacija");
				}
		        break;
		    default:
		        alert("cini se da imas pogresan tip u provjeri");
		}
	}

	
	nacrtajObjekt({tip, koordX, koordY, orijentacija, sw}) {
		//ova funkcija za sw true crta objekt dane orijentacije i danog tipa i koordinata, za false brise
		var vr = 0;
		console.log("ucitane vrijednosti: "+ tip + " / " + koordX  + " / " + koordY + " / " + orijentacija  + " / " +sw);
		switch (tip) {
			case "I-shape":
			    if (sw) vr = 2;
		   	    if (orijentacija == 1) {
					this.promijeniPolje([[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+2, koordY, vr]]);
				} else {
					    this.promijeniPolje([[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX, koordY+2, vr]]);
				}
				break;
			case "kvadrat":
			    if (sw) vr = 1;
			    this.promijeniPolje([[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY+1, vr]]);
			    break;
			case "munja":
			    if (sw) vr = 3;
		   	    if (orijentacija == 1) {
					this.promijeniPolje([[koordX-1, koordY+1, vr],[koordX, koordY+1, vr],[koordX, koordY, vr],[koordX+1, koordY, vr]]);
				} else {
					    this.promijeniPolje([[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+1, koordY+1, vr]]);
				}
				break;
			case "obrnuta_munja":
			    if (sw) vr = 4;
		   	    if (orijentacija == 1) {
					this.promijeniPolje([[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY+1, vr]]);
				} else {
					    this.promijeniPolje([[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX-1, koordY, vr],[koordX-1, koordY+1, vr]]);
				}
				break;
		    case "L-shape":
		        if (sw) vr = 5;
		        switch (orijentacija) {
					case 1:
					    this.promijeniPolje([[koordX-1, koordY+1, vr],[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr]]);
					    break;
					case 2:
					    this.promijeniPolje([[koordX-1, koordY-1, vr],[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr]]);
					    break;
					case 3:
					    this.promijeniPolje([[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+1, koordY-1, vr]]);
					    break;
					case 4:
					    this.promijeniPolje([[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY+1, vr]]);
					    break;
					default:
					    alert("pogreska u tipu kod crtanja");    
				}
				break;
			case "obrL-shape":
		        if (sw) vr = 6;
		        switch (orijentacija) {
					case 1:
					    this.promijeniPolje([[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX+1, koordY+1, vr]]);
					    break;
					case 2:
					    this.promijeniPolje([[koordX-1, koordY+1, vr],[koordX, koordY+1, vr],[koordX, koordY, vr],[koordX, koordY-1, vr]]);
					    break;
					case 3:
					    this.promijeniPolje([[koordX-1, koordY-1, vr],[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr]]);
					    break;
					case 4:
					    this.promijeniPolje([[koordX, koordY+1, vr],[koordX, koordY, vr],[koordX, koordY-1, vr],[koordX+1, koordY-1, vr]]);
					    break;
					default:
					    alert("pogreska u tipu kod crtanja");    
				}
				break;
		    case "T-shape":
		        if (sw) vr = 7;
		        switch (orijentacija) {
					case 1:
					    this.promijeniPolje([[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX, koordY+1, vr]]);
					    break;
					case 2:
					    this.promijeniPolje([[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX, koordY-1, vr],[koordX, koordY+1, vr]]);
					    break;
					case 3:
					    this.promijeniPolje([[koordX-1, koordY, vr],[koordX, koordY, vr],[koordX+1, koordY, vr],[koordX, koordY-1, vr]]);
					    break;
					case 4:
					    this.promijeniPolje([[koordX, koordY-1, vr],[koordX, koordY, vr],[koordX, koordY+1, vr],[koordX+1, koordY, vr]]);
					    break;
					default:
					    alert("pogreska u tipu kod crtanja");    
				}
				break;
			default:
			    alert("cini se da imas pogresan tip za crtanje " + tip);
		}
	}
	
	inicirajObjekt(tip) {
		switch (tip) {
			case "I-shape":
		        var noviObjekt = {tip: "I-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,2],[5,0,2],[6,0,2],[7,0,2]]);
		        this.setState({objekt: noviObjekt});
		        break;
		    case "kvadrat":
		        var noviObjekt = {tip: "kvadrat", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[5,0,1],[6,0,1],[5,1,1],[6,1,1]]);
		        this.setState({objekt: noviObjekt});
		        break;    
		    case "munja":
		        var noviObjekt = {tip: "munja", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[5,0,3],[6,0,3],[5,1,3],[4,1,3]]);
		        this.setState({objekt: noviObjekt});
		        break;    
		    case "obrnuta_munja":
		        var noviObjekt = {tip: "obrnuta_munja", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,4],[5,0,4],[5,1,4],[6,1,4]]);
		        this.setState({objekt: noviObjekt});
		        break;   
		    case "L-shape":
		        var noviObjekt = {tip: "L-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,1,5],[4,0,5],[5,0,5],[6,0,5]]);
		        this.setState({objekt: noviObjekt});
		        break;   
		    case "obrL-shape":
		        var noviObjekt = {tip: "obrL-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,6],[5,0,6],[6,0,6],[6,1,6]]);
		        this.setState({objekt: noviObjekt});
		        break;    
		    case "T-shape":
		        var noviObjekt = {tip: "T-shape", koordX: 5, koordY: 0, orijentacija: 1};
		        this.promijeniPolje([[4,0,7],[5,0,7],[6,0,7],[5,1,7]]);
		        this.setState({objekt: noviObjekt});
		        break;        
		    default:
		        alert("pogreska sa unosom tipa");
		}
	}
	
	promijeniPolje(podaci) {
		// ova funkcija uzima polje elemenata i mjenja stanje aplikacije. svaki element je polje 3 integera, 
		//[x, y, vr], pri cemu su x, y, koordinate, a vr je vrijednost boje.
		var rez = JSON.parse(JSON.stringify(this.state.stanja));
		for (let el of podaci) {
			if (el[1] >= 0 && el[1] <= 19 && el[0] >= 0 && el[0] <= 11) {
		        rez[el[1]][el[0]] = el[2];
		        //console.log("zamijena " + el[0] + ", " + el[1] + " - " + el[2]);
		    }
		}
		this.setState({stanja: rez});
	}
	
	pritisakGumba(ev) {
		ev.preventDefault();
		console.log("upravo si pritisnuo gumb " + ev.code);
		switch (ev.code) {
			case "ArrowDown":
			    this.spustiObjekt();
			    break;
			case "ArrowLeft":
			    this.pomakniUStranuObjekt("l");
			    break;
			case "ArrowRight":
			    this.pomakniUStranuObjekt("r");    
			    break;
			case "ArrowUp":
			    this.rotirajObjekt();    
			    break;
			    
		}
	}
	
	pritisakGumbaUp(ev) {
		//console.log("upravo si otpustio gumb " + ev.code);
		//switch (ev.code) {
		//	case "ArrowDown":
			    //this.spustiObjekt();
			    
		//}
	}
}


ReactDOM.render(
    <Aplikacija/>,
    document.querySelector("#root")
)


